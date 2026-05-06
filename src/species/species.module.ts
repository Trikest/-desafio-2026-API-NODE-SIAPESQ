import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { WeatherService } from '../weather/weather.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PrismaModule,
    HttpModule, 
  ],
  controllers: [SpeciesController],
  providers: [
    SpeciesService,
    WeatherService, 
  ],
})
export class SpeciesModule {}