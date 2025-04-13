import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';

@Injectable()
export class TurmaService {
  constructor(private prisma: PrismaService) {}

  async create(adminId: number, createTurmaDto: CreateTurmaDto) {
    await this.validateCurso(createTurmaDto.cursoId);
    await this.checkUniqueCodigo(createTurmaDto.codigo);

    return this.prisma.turma.create({
      data: {
        ...createTurmaDto,
        adminId: adminId
      }
    });
  }

  async findAll(adminId: number) {
    return this.prisma.turma.findMany({
      where: { adminId },
      include: { curso: true }
    });
  }

  async findOne(adminId: number, id: number) {
    const turma = await this.prisma.turma.findUnique({
      where: { id, adminId },
      include: { curso: true }
    });

    if (!turma) {
      throw new NotFoundException('Turma não encontrada');
    }
    return turma;
  }

  async update(adminId: number, id: number, updateTurmaDto: UpdateTurmaDto) {
    await this.findOne(adminId, id);
    
    if (updateTurmaDto.codigo) {
      await this.checkUniqueCodigo(updateTurmaDto.codigo, id);
    }

    if (updateTurmaDto.cursoId) {
      await this.validateCurso(updateTurmaDto.cursoId);
    }

    return this.prisma.turma.update({
      where: { id },
      data: updateTurmaDto
    });
  }

  async remove(adminId: number, id: number) {
    await this.findOne(adminId, id);
    return this.prisma.turma.delete({ where: { id } });
  }

  private async checkUniqueCodigo(codigo: string, excludeId?: number) {
    const existing = await this.prisma.turma.findFirst({
      where: { codigo, NOT: { id: excludeId } }
    });

    if (existing) {
      throw new ConflictException('Código da turma já está em uso');
    }
  }

  private async validateCurso(cursoId: number) {
    const curso = await this.prisma.curso.findUnique({
      where: { id: cursoId }
    });

    if (!curso) {
      throw new NotFoundException('Curso não encontrado');
    }
  }
}