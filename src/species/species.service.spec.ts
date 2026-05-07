import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesService } from './species.service';
import { PrismaService } from '../prisma/prisma.service';
import { WeatherService } from '../weather/weather.service';

describe('SpeciesService', () => {
  let service: SpeciesService;

  const mockPrismaService = {
    species: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },

    category: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },

    climateData: {
      create: jest.fn(),
      deleteMany: jest.fn(),
    },
  };

  const mockWeatherService = {
    getWeather: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpeciesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: WeatherService,
          useValue: mockWeatherService,
        },
      ],
    }).compile();

    service = module.get<SpeciesService>(SpeciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});