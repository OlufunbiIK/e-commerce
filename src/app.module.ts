import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'; //step 1 for env variables
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import database from './config/database.config';
import { MailModule } from './mail/mail.module';
import { PaginationModule } from './common/pagination/pagination.module';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './review/review.module';
import { PaystackModule } from './paystack/paystack-module.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response/data-response';
import { ReceiptModule } from './reciept/reciept.module';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CustomCacheModule } from './config/cache.config';
// import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production'],
      load: [database],
    }), //5.
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('db').host,
        port: configService.get('db').port,
        username: configService.get('db').username,
        password: configService.get('db').password,
        database: configService.get('db').database,
        url: configService.get('db').url,
        // process.env.NODE_ENV === 'production'
        //   ? configService.get('db').url
        //   : undefined,
        // synchronize: process.env.NODE_ENV !== 'production', // Use sync (true) in dev, false in prod
        synchronize: true, // fixme - revert to line above
        autoLoadEntities: true,

        // entities: [User, Product, Order, OrderItem],
      }),

      inject: [ConfigService],
      imports: undefined,
    }),
    CategoryModule,
    UserModule,
    ProductModule,
    OrderModule,
    OrderItemModule,
    CartModule,
    MailModule,
    PaginationModule,
    AuthModule,
    ReviewModule,
    PaystackModule,
    ReceiptModule,
    CustomCacheModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
