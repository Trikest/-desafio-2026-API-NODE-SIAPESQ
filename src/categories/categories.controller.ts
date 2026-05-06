import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('categories')
@UseGuards(JwtAuthGuard) 
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // 🔥 Criar categoria (vinculada ao usuário logado)
  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser() user: { id: string; email: string } // Pega do JWT
  ) {
    return this.categoriesService.create(user.id, createCategoryDto);
  }

  // 🌿 Listar categorias do usuário logado
  @Get()
  findMyCategories(@CurrentUser() user: { id: string }) {
    return this.categoriesService.findByUser(user.id);
  }

  // 🔍 Buscar categoria específica (somente se for do usuário)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: { id: string }
  ) {
    return this.categoriesService.findOne(id, user.id);
  }

  // ✏️ Atualizar categoria (com validação de ownership)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @CurrentUser() user: { id: string }
  ) {
    return this.categoriesService.update(id, user.id, updateCategoryDto);
  }

  // ❌ Deletar categoria (com validação de ownership)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser() user: { id: string }
  ) {
    return this.categoriesService.remove(id, user.id);
  }
}