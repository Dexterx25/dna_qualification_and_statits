
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ImportWaff } from './lib/constructs/import_waf';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import elbv2 = require('aws-cdk-lib/aws-elasticloadbalancingv2');
import { CustomVpc } from './lib/constructs/vpc_construct';
import { getString } from './utils';
import { CustomEKS } from './lib/constructs/eksConstruct';
import { CustomBastionPolicy } from './lib/constructs/bastionPolicyContruct';
import * as ECR from 'aws-cdk-lib/aws-ecr'
import * as codeCommit from 'aws-cdk-lib/aws-codecommit';
import * as codeBuild from 'aws-cdk-lib/aws-codebuild';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import path = require('path');
import * as iam from 'aws-cdk-lib/aws-iam'
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';

export class WafRegionalStack extends cdk.Stack {

  constructor(scope: Construct, id: string, projectProps: cdk.StackProps | any, props?: cdk.StackProps | any) {
    super(scope, id, props);
     /**
     * @CustomVpc is a class to implement VPC and VPC subnets in avaliability zones
     * for a security groups EC2 or Fargate
     *  
     */
    const vpc: CustomVpc = new CustomVpc(
          this,
          `${getString(projectProps, 'project_name')}/${getString(projectProps, 'environment')}/VPC`,
          projectProps,
      );
      console.log('pass vpc')
      const securityGroup: ec2.SecurityGroup = new ec2.SecurityGroup(
        this, 
        `${getString(projectProps, 'project_name')}/${getString(projectProps, 'environment')}/sg`, 
        {
         ...projectProps,
          vpc: vpc.vpc,
          allowAllOutbound: false,
        }
     );
    const asg =  new autoscaling.AutoScalingGroup(this, 'ASG',  {
      keyName: 'keypemToConnect',
      securityGroup,
      machineImage: ec2.MachineImage.latestAmazonLinux2(),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      autoScalingGroupName: `${getString(projectProps, 'project_name')}/${getString(projectProps, 'environment')}/AutoScalingGroup`,
      allowAllOutbound: false,
      healthCheck: autoscaling.HealthCheck.ec2(),
      minCapacity: 2,
      maxCapacity: 4,
      vpc: vpc.vpc,
      vpcSubnets: vpc.vpc.selectSubnets({
        subnets: vpc.subn,
        onePerAz: true,
      }),
    });
    this.addUserData(asg);
  
    const repository = new codeCommit.Repository(this, 'CodeCommitRepo', {
      repositoryName: `${this.stackName}-repo`,
      description: 'codeComitRepository',
      code: codeCommit.Code.fromDirectory(path.join(__dirname, 'lib/APP'))
    });
    console.log('pass repository')

  
    const lb = new elbv2.ApplicationLoadBalancer(
      this, 
      `${getString(projectProps, 'project_name')}/${getString(projectProps, 'environment')}/ALB`, 
      {
      vpc: vpc.vpc,
      internetFacing: true,
      securityGroup: securityGroup,
      vpcSubnets: vpc.vpc.selectSubnets({
        subnets: vpc.subn,
        onePerAz: true,
      }),
    });
    
    const listener = lb.addListener(
      `${getString(projectProps, 'project_name')}/${getString(projectProps, 'environment')}/Listener`, 
    {
      port: props.InstancePort,
      protocol: elbv2.ApplicationProtocol.HTTP,
    });

    listener.connections.allowDefaultPortFromAnyIpv4('Open to the world');
    listener.connections.allowDefaultPortFromAnyIpv4(`${ec2.Port.tcp(22)}`)
    
    listener.addTargets(
      `${getString(projectProps, 'project_name')}/${getString(projectProps, 'environment')}/TargetGroup`, 
      {
      port: props.InstancePort,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targets: [asg], 
      healthCheck: {
        path: props.HealthCheckPath,
        port: props.HealthCheckPort,
        healthyHttpCodes: props.HealthCheckHttpCodes
      }
    })
    console.log('pass addTargets')

    asg.scaleOnRequestCount(
      `${getString(projectProps, 'project_name')}/${getString(projectProps, 'environment')}/AModestLoad`, 
    {
      targetRequestsPerMinute: 60,
    });

    new ImportWaff(
      this,
      `${getString(projectProps, 'project_name')}/${getString(projectProps, 'environment')}/WAF`,
      projectProps,
      lb.loadBalancerArn
    );

  }

  public addUserData(asg: cdk.aws_autoscaling.AutoScalingGroup){
    asg.addUserData('yum update -y')
    asg.addUserData('yum install httpd -y')
    asg.addUserData('sudo service httpd start')
    asg.addUserData('sudo chkconfig httpd on')
    asg.addUserData('sudo cd /var/www/html')
    asg.addUserData('echo "<html><h1>Hello Wolrd</h1></html>" > /var/www/html/index.html')

  }

} 
