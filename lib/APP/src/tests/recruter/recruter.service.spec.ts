import { Test, TestingModule } from '@nestjs/testing';
import { RecluterService } from 'src/routes/recluter/recluter.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DNASequenceMongo  } from 'src/database/mongo/schemas/DNA.schema';
import { DNASequenceMongoRepository } from 'src/database/repositoriesMongoDB';

describe('recruterService', () => {
  let recruterService: RecluterService;
  let model: Model<DNASequenceMongo>;
  let dnaSequenceMongoRepository: DNASequenceMongoRepository;

  const mockDNA = {
    "_id": "65119b8893351ef818dca309",
    "dna": "[\"ATGCGA\",\"CAGTGC\",\"TTATGT\",\"AGAAGG\",\"CCCCTA\",\"CGTCGT\"]",
    "createdAt": "2023-09-25T14:39:04.995Z",
    "updatedAt": "2023-09-25T14:39:04.995Z"
  };

  const recluterMockService = {
    find: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecluterService,
        DNASequenceMongoRepository,
        {
          provide: getModelToken(DNASequenceMongo.name),
          useValue: recluterMockService,
        },
      ],
    }).compile();

    recruterService = module.get<RecluterService>(RecluterService);
    model = module.get<Model<DNASequenceMongo>>(getModelToken(DNASequenceMongo.name));
    dnaSequenceMongoRepository = module.get<DNASequenceMongoRepository>(DNASequenceMongoRepository)
  });

  describe('create', () => {
    it('should create ', async () => {
      const dnaSequence = {
        dna:[
          "ATGCGA",
          "CAGTGC",
          "TTATGT",
          "AGAAGG",
          "CCCCTA",
          "TCACTG"
        ]
      };

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockDNA));

      jest.spyOn(dnaSequenceMongoRepository, 'create')

      const result = await recruterService.postSequence(dnaSequence)
      expect(dnaSequenceMongoRepository.create).toHaveBeenCalledWith({dna: JSON.stringify(dnaSequence.dna)})
      expect(result).toEqual(mockDNA);
    });
  });

  describe('findOneByDNA', () => {
    it('should find it ', async () => {
      const dnaSequence = {
        dna:[
          "ATGCGA",
          "CAGTGC",
          "TTATGT",
          "AGAAGG",
          "CCCCTA",
          "CGTCGT"
        ]
      };

      jest
        .spyOn(model, 'findOne')
        .mockResolvedValue(mockDNA);

        
      jest
      .spyOn(dnaSequenceMongoRepository, 'findOneByDNA')

      const result: DNASequenceMongo | null = await recruterService.getSequenceBySequenceSTR(dnaSequence)
      expect(dnaSequenceMongoRepository.findOneByDNA).toHaveBeenCalledWith({dna: JSON.stringify(dnaSequence.dna)})
      expect(result).toEqual(mockDNA);
      
    });
  });
});