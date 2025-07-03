import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandModule } from './brand/brand.module';
import { ModelGroupModule } from './model-group/model-group.module';
import { CarModelModule } from './car-model/car-model.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PublicApiModule } from './public-api/public-api.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BrandModule, ModelGroupModule, CarModelModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/assets/images/'
    }),
    PublicApiModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
