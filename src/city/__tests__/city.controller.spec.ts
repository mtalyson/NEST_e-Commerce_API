import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from '../city.controller';
import { CityService } from '../city.service';
import { cityMock } from '../__mocks__/city.mock';
import { stateMock } from '../../state/__mocks__/state.mock';

describe('CityController', () => {
  let controller: CityController;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CityService,
          useValue: {
            getAllCitiesByState: jest.fn().mockResolvedValue([cityMock]),
          },
        },
      ],
      controllers: [CityController],
    }).compile();

    controller = module.get<CityController>(CityController);
    cityService = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(cityService).toBeDefined();
  });

  it('should return city Entity in getAllCitiesByState', async () => {
    expect(await controller.getAllCitiesByState(stateMock.id)).toEqual([
      cityMock,
    ]);
  });
});
