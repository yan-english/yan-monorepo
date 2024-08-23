// // packages/yan-api/src/services/redis.service.ts
// import {Inject, Injectable} from '@nestjs/common';
// import Redis from "ioredis";
// import {CACHE_MANAGER} from "@nestjs/cache-manager";
// import {RedisClient} from "ioredis/built/connectors/SentinelConnector/types";
// import {RedisCache} from "./redis.cache";
//
// @Injectable()
// export class RedisService {
//
//     private redis: RedisClient;
//   constructor(
//       @Inject(CACHE_MANAGER) private readonly cacheManager: RedisCache) {
//       this.redis = cacheManager.store.getClient();
//   }
//
//   async set(key: string, value: string): Promise<void> {
//     await this.cacheManager.
//   }
//
//   async get(key: string): Promise<string | null> {
//     return await this.redis.get(key);
//   }
//
//   async hset(key: string, field: string, value: string): Promise<void> {
//     await this.redis.hset(key, field, value);
//   }
// }