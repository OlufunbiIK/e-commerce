/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'; //step 1 for env variables
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserModule } from './user/user.module';
// import { ProductModule } from './product/product.module';
// import { OrderModule } from './order/order.module';
// import { OrderItemModule } from './order-item/order-item.module';
// import { AdminModule } from './admin/admin.module';
// import { CartModule } from './cart/cart.module';
// import { CheckoutModule } from './checkout/checkout.module';
import { CategoryModule } from './category/category.module';
import database from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'],
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
        url:
          process.env.NODE_ENV === 'production'
            ? configService.get('db').url
            : undefined,
        // synchronize: process.env.NODE_ENV !== 'production', // Use sync (true) in dev, false in prod
        synchronize: true, // fixme - revert to line above
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    CategoryModule,
    // UserModule,
    // ProductModule,
    // OrderModule,
    // OrderItemModule,
    // AdminModule,
    // CartModule,
    // CheckoutModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
