import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { CreateCursoDto } from './dto/create-curso.dto';


@Injectable()
export class CursoService {
  constructor(private prisma: PrismaService) {}

  async create(adminId: number, createCursoDto: CreateCursoDto) {
    await this.checkUniqueCodigo(createCursoDto.codigo);
    
    return this.prisma.curso.create({
      data: {
        ...createCursoDto,
        adminId: adminId
      }
    });
  }

  async findAll(adminId: number) {
    return this.prisma.curso.findMany({
      where: { adminId }
    });
  }

  async findOne(adminId: number, id: number) {
    const curso = await this.prisma.curso.findUnique({
      where: { id, adminId }
    });

    if (!curso) {
      throw new NotFoundException('Curso não encontrado');
    }
    return curso;
  }

  async update(adminId: number, id: number, updateCursoDto: UpdateCursoDto) {
    await this.findOne(adminId, id);
    
    if (updateCursoDto.codigo) {
      await this.checkUniqueCodigo(updateCursoDto.codigo, id);
    }

    return this.prisma.curso.update({
      where: { id },
      data: updateCursoDto
    });
  }

  async remove(adminId: number, id: number) {
    await this.findOne(adminId, id);
    return this.prisma.curso.delete({ where: { id } });
  }

  private async checkUniqueCodigo(codigo: string, excludeId?: number) {
    const existingCurso = await this.prisma.curso.findFirst({
      where: { 
        codigo,
        NOT: { id: excludeId } 
      }
    });

    if (existingCurso) {
      throw new ConflictException('Código do curso já está em uso');
    }
  }
}