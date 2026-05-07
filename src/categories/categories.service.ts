import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  // 🔥 Criar categoria vinculada ao usuário logado
  async create(userId: string, createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
        userId: userId,
      },
    });
  }

  // 🌿 Listar categorias do usuário
  async findByUser(userId: string) {
    return this.prisma.category.findMany({
      where: { userId },
    });
  }

  // 🔍 Buscar categoria (com validação de ownership)
  async findOne(id: string, userId: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    if (category.userId !== userId) {
      throw new ForbiddenException('Acesso negado');
    }

    return category;
  }

  // ✏️ Atualizar (com validação de ownership)
  async update(id: string, userId: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id, userId); // 🔥 reaproveita validação

    return this.prisma.category.update({
      where: { id },
      data: { ...updateCategoryDto },
    });
  }

  // ❌ Remover (com validação de ownership)
  async remove(id: string, userId: string) {
    await this.findOne(id, userId); // 🔥 garante que pertence ao usuário

    return this.prisma.category.delete({
      where: { id },
    });
  }
}