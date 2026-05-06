// weather/weather.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getWeather(lat: number, lon: number) {
    const apiKey = this.configService.get<string>('WEATHER_API_KEY');

    const url = `https://api.hgbrasil.com/weather?lat=${lat}&lon=${lon}&key=${apiKey}`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(url),
      );

      const data = response.data.results;

      return {
        temperature: data.temp,
        humidity: data.humidity,
        description: data.description,
      };
    } catch (error) {
      throw new Error('Erro ao buscar clima');
    }
  }
}