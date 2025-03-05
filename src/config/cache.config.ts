import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => ({
        store: redisStore,
        host: 'localhost', // Update as necessary
        port: 6379,
        max: 50,
        ttl: 5000, // Time-to-live in seconds
      }),
    }),
  ],
  exports: [CacheModule],
})
export class CustomCacheModule {}
