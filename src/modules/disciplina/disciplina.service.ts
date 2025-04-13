import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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

  // async findAll(adminId: number, cursoId?: number) {
  //   return this.prisma.disciplina.findMany({
  //     where: { 
  //       adminId,
  //       cursoId: cursoId ? Number(cursoId) : undefined
  //     },
  //     include: { curso: true }
  //   });
  // }

  // async findAllPaginated(
  //   adminId: number,
  //   paginationParams: PaginationParams,
  //   cursoId?: number
  // ) {
  //   const { page, limit, orderBy, orderDirection } = paginationParams;
  //   const where = { 
  //     adminId,
  //     cursoId: cursoId ? Number(cursoId) : undefined
  //   };
  
  //   const [total, data] = await Promise.all([
  //     this.prisma.disciplina.count({ where }),
  //     this.prisma.disciplina.findMany({
  //       where,
  //       skip: (page - 1) * limit,
  //       take: limit,
  //       orderBy: orderBy ? { [orderBy]: orderDirection || 'asc' } : undefined,
  //       include: { curso: true }
  //     })
  //   ]);
  
  //   return {
  //     total,
  //     totalPages: Math.ceil(total / limit),
  //     currentPage: page,
  //     perPage: limit,
  //     data
  //   };
  // }

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