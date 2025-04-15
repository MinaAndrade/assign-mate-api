import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { PaginationParams } from 'src/common/dto/pagination.dto';


@Injectable()
export class DisciplinaService {
  constructor(private prisma: PrismaService) {}

  async create(adminId: number, createDisciplinaDto: CreateDisciplinaDto) {
    await this.validateRelations(createDisciplinaDto, adminId);
    
    return this.prisma.disciplina.create({
      data: {
        codigo: createDisciplinaDto.codigo,
        nome: createDisciplinaDto.nome,
        descricao: createDisciplinaDto.descricao,
        cargaHoraria: createDisciplinaDto.cargaHoraria,
        periodo: createDisciplinaDto.periodo,
        curso: {
          connect: {
            id: createDisciplinaDto.cursoId
          }
        },
        admin: {
          connect: {
            id: adminId
          }
        }
      }
    });
  }

  async findAll(adminId: number, paginationParams: PaginationParams) {
    const { page = 1, perPage = 15, sort = 'createdAt', sortDir = 'desc' } = paginationParams;
  
    const [total, data] = await this.prisma.$transaction([
      this.prisma.disciplina.count({
        where: { adminId },
      }),
      this.prisma.disciplina.findMany({
        where: { adminId },
        orderBy: sort ? { [sort]: sortDir } : undefined,
        skip: (page - 1) * perPage,
        take: perPage,
      }),
    ]);
  
    const totalPages = Math.ceil(total / perPage);
  
    return {
      total,
      totalPages,
      currentPage: page,
      perPage,
      data,
    };
  }

  async findOne(adminId: number, id: number) {
    const disciplina = await this.prisma.disciplina.findUnique({
      where: { id, adminId },
      include: { curso: true }
    });

    if (!disciplina) {
      throw new NotFoundException('Disciplina não encontrada');
    }
    return disciplina;
  }

  async update(adminId: number, id: number, updateDisciplinaDto: UpdateDisciplinaDto) {
    await this.findOne(adminId, id);
    await this.validateRelations(updateDisciplinaDto, adminId, id);

    return this.prisma.disciplina.update({
      where: { id },
      data: updateDisciplinaDto
    });
  }

  async remove(adminId: number, id: number) {
    await this.findOne(adminId, id);
    return this.prisma.disciplina.delete({ where: { id } });
  }

  private async validateRelations(dto: CreateDisciplinaDto | UpdateDisciplinaDto, adminId: number, disciplinaId?: number) {
    // Verifica código único
    if (dto.codigo) {
      const existing = await this.prisma.disciplina.findFirst({
        where: { 
          codigo: dto.codigo,
          NOT: { id: disciplinaId }
        }
      });
      if (existing) throw new ConflictException('Código da disciplina já existe');
    }

    // Verifica se o curso existe
    if (dto.cursoId) {
      const curso = await this.prisma.curso.findUnique({
        where: { id: dto.cursoId, adminId }
      });
      if (!curso) throw new NotFoundException('Curso não encontrado');
    }
  }

}