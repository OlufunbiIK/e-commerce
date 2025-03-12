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
      useFactory: (configService: ConfigService) => {
        // Get database URL from config
        const dbUrl = configService.get('db').url;

        return {
          type: 'postgres',
          url: dbUrl, // Use URL as primary connection method
          ssl: true, // Enable SSL
          extra: {
            // Add extra SSL options
            ssl: {
              rejectUnauthorized: true,
            },
          },
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
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
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: DataResponseInterceptor,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
