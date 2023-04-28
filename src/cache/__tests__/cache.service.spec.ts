import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheService } from '../cache.service';
import { Cache } from 'cache-manager';
import { userEntityMock } from '../../user/__mocks__/user.mock';

describe('CacheService', () => {
  let service: CacheService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => userEntityMock,
            set: () => jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cacheManager).toBeDefined();
  });

  it('should return data in cache', async () => {
    expect(await service.getCache('key', () => null)).toEqual(userEntityMock);
  });

  it('should return data in function', async () => {
    const result = { test: 'test' };

    jest.spyOn(cacheManager, 'get').mockResolvedValue(undefined);

    expect(
      await service.getCache('key', () => Promise.resolve(result)),
    ).toEqual(result);
  });
});
