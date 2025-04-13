import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { Turno, Modalidade } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TurmaService {
  constructor(private prisma: PrismaService) {}

  async create(adminId: number, createTurmaDto: CreateTurmaDto) {
    await this.validateRelations(createTurmaDto, adminId);
    
    return this.prisma.turma.create({
      data: {
        codigo: createTurmaDto.codigo,
        semestre: createTurmaDto.semestre,
        nome: createTurmaDto.nome,
        turno: createTurmaDto.turno as Turno,
        modalidade: createTurmaDto.modalidade as Modalidade,
        curso: {
          connect: { id: createTurmaDto.cursoId }
        },
        admin: {
          connect: { id: adminId }
        }
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
    await this.validateRelations(updateTurmaDto, adminId, id);

    const data: any = {
      ...updateTurmaDto,
      turno: updateTurmaDto.turno as Turno,
      modalidade: updateTurmaDto.modalidade as Modalidade,
    };

    if (updateTurmaDto.cursoId) {
      data.curso = { connect: { id: updateTurmaDto.cursoId } };
      delete data.cursoId;
    }

    return this.prisma.turma.update({
      where: { id },
      data
    });
  }

  async remove(adminId: number, id: number) {
    await this.findOne(adminId, id);
    return this.prisma.turma.delete({ where: { id } });
  }

  private async validateRelations(
    dto: CreateTurmaDto | UpdateTurmaDto, 
    adminId: number, 
    turmaId?: number
  ) {
    // Verifica código único
    if (dto.codigo) {
      const existing = await this.prisma.turma.findFirst({
        where: { 
          codigo: dto.codigo,
          NOT: { id: turmaId }
        }
      });
      if (existing) throw new ConflictException('Código da turma já existe');
    }

    // Verifica se o curso existe e pertence ao admin
    if (dto.cursoId) {
      const curso = await this.prisma.curso.findUnique({
        where: { id: dto.cursoId, adminId }
      });
      if (!curso) throw new NotFoundException('Curso não encontrado');
    }
  }
}