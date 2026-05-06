import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { FilterSpeciesDto } from './dto/filter-species.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';


@Controller('species')
@UseGuards(JwtAuthGuard) 
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  //  CREATE
  @Post()
  create(
    @Body() createSpeciesDto: CreateSpeciesDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.speciesService.create(user.id, createSpeciesDto);
  }

  // LISTAR + FILTROS 
  @Get()
findAll(
  @Query() filters: FilterSpeciesDto, 
  @CurrentUser() user: { id: string },
) {
  return this.speciesService.findAll(user.id, filters);
}

  // STATS
  @Get('stats/categories')
  getCategoryStats(@CurrentUser() user: { id: string }) {
    return this.speciesService.getCategoryStats(user.id);
  }

  // FIND ONE
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: { id: string },
  ) {
    return this.speciesService.findOne(id, user.id);
  }

  // UPDATE
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpeciesDto: UpdateSpeciesDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.speciesService.update(id, user.id, updateSpeciesDto);
  }

  // DELETE
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id') id: string,
    @CurrentUser() user: { id: string },
  ) {
    return this.speciesService.remove(id, user.id);
  }
}