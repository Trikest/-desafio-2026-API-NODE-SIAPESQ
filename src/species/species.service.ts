import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { FilterSpeciesDto } from './dto/filter-species.dto';
import { PrismaService } from '../prisma/prisma.service';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class SpeciesService {
  constructor(
    private prisma: PrismaService,
    private weatherService: WeatherService,
  ) {}

  // 🔥 CREATE
  async create(userId: string, dto: CreateSpeciesDto) {
    const category = await this.prisma.category.findFirst({
      where: { id: dto.categoryId, userId },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    // ✅ NÃO usar spread (evita salvar fetchClimate no banco)
    const species = await this.prisma.species.create({
      data: {
        commonName: dto.commonName,
        scientificName: dto.scientificName,
        latitude: dto.latitude,
        longitude: dto.longitude,
        categoryId: dto.categoryId,
        userId,
      },
      include: {
        category: true,
      },
    });

    // 🌍 Integração externa
    if (dto.fetchClimate) {
      try {
        const climate = await this.weatherService.getWeather(
          dto.latitude,
          dto.longitude,
        );

        // ✅ evita duplicação (speciesId é unique)
        await this.prisma.climateData.upsert({
          where: { speciesId: species.id },
          update: {
            temperature: climate.temperature,
            humidity: climate.humidity,
            description: climate.description,
          },
          create: {
            temperature: climate.temperature,
            humidity: climate.humidity,
            description: climate.description,
            speciesId: species.id,
          },
        });
      } catch (error) {
        console.error('Erro ao buscar clima:', error);
      }
    }

    return species;
  }

  // LISTAR + FILTRO
  async findAll(userId: string, filters?: FilterSpeciesDto) {
    const { search, categoryId, latitude, longitude, radius } = filters || {};

    
    if (latitude !== undefined && longitude !== undefined) {
      return this.findNearby(userId, latitude, longitude, radius || 10);
    }

    return this.prisma.species.findMany({
      where: {
        userId,
        ...(search && {
          OR: [
            { commonName: { contains: search, mode: 'insensitive' } },
            { scientificName: { contains: search, mode: 'insensitive' } },
          ],
        }),
        ...(categoryId && {
          categoryId,
        }),
      },
      include: {
        category: true,
        climate: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // FIND ONE
  async findOne(id: string, userId: string) {
    const species = await this.prisma.species.findFirst({
      where: { id, userId },
      include: {
        category: true,
        climate: true,
      },
    });

    if (!species) {
      throw new NotFoundException('Espécie não encontrada');
    }

    return species;
  }

  // UPDATE
  async update(id: string, userId: string, dto: UpdateSpeciesDto) {
    await this.findOne(id, userId);

    if (dto.categoryId) {
      const category = await this.prisma.category.findFirst({
        where: { id: dto.categoryId, userId },
      });

      if (!category) {
        throw new NotFoundException('Categoria não encontrada');
      }
    }

    return this.prisma.species.update({
      where: { id },
      data: dto, 
      include: {
        category: true,
        climate: true,
      },
    });
  }

  // REMOVE
  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    await this.prisma.climateData.deleteMany({
      where: { speciesId: id },
    });

    return this.prisma.species.delete({
      where: { id },
    });
  }

  // STATS
  async getCategoryStats(userId: string) {
    const categories = await this.prisma.category.findMany({
      where: { userId },
      include: {
        _count: { select: { species: true } },
      },
    });

    const total = categories.reduce(
      (acc, c) => acc + c._count.species,
      0,
    );

    return {
      total,
      categories: categories.map((c) => ({
        id: c.id,
        name: c.name,
        count: c._count.species,
      })),
    };
  }

  //  NEARBY
  async findNearby(
    userId: string,
    latitude: number,
    longitude: number,
    radiusKm = 10,
  ) {
    const degreeRadius = radiusKm / 111;

    return this.prisma.species.findMany({
      where: {
        userId,
        latitude: {
          gte: latitude - degreeRadius,
          lte: latitude + degreeRadius,
        },
        longitude: {
          gte: longitude - degreeRadius,
          lte: longitude + degreeRadius,
        },
      },
      include: {
        category: true,
        climate: true,
      },
    });
  }
}