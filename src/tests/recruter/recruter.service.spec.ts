import { Test, TestingModule } from '@nestjs/testing';
import { RecluterService } from 'src/routes/recluter/recluter.service';
import { getModelToken } from '@nestjs/mongoose';;
import { Model } from 'mongoose';
import { DNASequenceMongo, DNASequenceDocument  } from 'src/database/mongo/schemas/DNA.schema';
import { DNASequenceMongoRepository } from 'src/database/repositoriesMongoDB';

describe('BookService', () => {
  let bookService: RecluterService;
  let model: Model<DNASequenceMongo>;
  let document: DNASequenceDocument;

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

    bookService = module.get<RecluterService>(RecluterService);
    model = module.get<Model<DNASequenceMongo>>(getModelToken(DNASequenceMongo.name));
  });

  describe('create', () => {
    it('should create ', async () => {
      const dnaSequence = {
        dna:['asd']
      };

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockDNA));

      const result = await bookService.postSequence(dnaSequence)
      console.log('xd-->', result)
      expect(result).toEqual(mockDNA);
    });
  });

  describe('find', () => {
    it('should find ', async () => {
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

      const result: DNASequenceMongo | null = await bookService.getSequenceBySequenceSTR(dnaSequence)
      console.log('xd-->', result)
      expect(result).toEqual(mockDNA);
    });
  });
});