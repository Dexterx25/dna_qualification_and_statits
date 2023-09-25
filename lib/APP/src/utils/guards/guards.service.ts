import { ForbiddenException, Injectable } from "@nestjs/common";
import { RedisService } from "../../configurations/redis/redis.service";


@Injectable()
export class GuardsService {
    
  constructor(
    private readonly redis: RedisService,
  ) {}

  validateAccess = async (token: string, user: string): Promise<Boolean> => {
    const storedToken = await this.redis.getSessionValue('access', user);
    if (storedToken !== token)
      throw new ForbiddenException('This access token is not longer valid');
    return true;
  };

  validateRefresh = async (token: string, user: string): Promise<Boolean> => {
    const storedToken = await this.redis.getSessionValue('refresh', user);
    if (storedToken !== token)
      throw new ForbiddenException('This refresh token is not longer valid');
    return true;
  };

  validateSignToken = async (token: string, member: string) => {
    const storedToken = await this.redis.getSessionValue('sign', member);
    if (storedToken !== token)
      throw new ForbiddenException('This sign token is not longer valid');
    return true;
  };


}
