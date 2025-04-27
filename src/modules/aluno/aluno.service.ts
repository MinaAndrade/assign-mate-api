import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { PaginationParams } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AlunoService {
  constructor(private prisma: PrismaService) {}

  async create(adminId: string, createAlunoDto: CreateAlunoDto) {
    await this.checkUniqueConstraints(createAlunoDto);
    
    const hashedPassword = await bcrypt.hash(createAlunoDto.password, 10);

    return this.prisma.aluno.create({
      data: {
        ...createAlunoDto,
        password: hashedPassword,
        dataNascimento: new Date(createAlunoDto.dataNascimento),
        adminId: adminId
      }
    });
  }

  async findAll(adminId: string, paginationParams: PaginationParams): Promise<PaginatedResponseDto<any>> {
    const { page = 1, perPage = 15, sort = 'createdAt', sortDir = 'desc' } = paginationParams;
  
    const [total, data] = await this.prisma.$transaction([
      this.prisma.aluno.count({
        where: { adminId },
      }),
      this.prisma.aluno.findMany({
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

  async findOne(adminId: string, id: string) {
    const aluno = await this.prisma.aluno.findFirst({
      where: { id, adminId }
    });

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }
    return aluno;
  }

  async update(adminId: string, id: string, updateAlunoDto: UpdateAlunoDto) {
    await this.findOne(adminId, id);
    await this.checkUniqueConstraints(updateAlunoDto, id);

    const data: any = { ...updateAlunoDto };

    if (updateAlunoDto.password) {
      data.password = await bcrypt.hash(updateAlunoDto.password, 10);
    }

    if (updateAlunoDto.dataNascimento) {
      data.dataNascimento = new Date(updateAlunoDto.dataNascimento);
    }

    return this.prisma.aluno.update({
      where: { id },
      data
    });
  }

  async remove(adminId: string, id: string) {
    await this.findOne(adminId, id);
    return this.prisma.aluno.delete({ where: { id } });
  }

  private async checkUniqueConstraints(dto: CreateAlunoDto | UpdateAlunoDto, id?: string) {
    if (dto.matricula) {
      const existingMatricula = await this.prisma.aluno.findFirst({
        where: { matricula: dto.matricula, NOT: { id } }
      });
      if (existingMatricula) {
        throw new ConflictException('Matrícula já está em uso');
      }
    }

    if (dto.email) {
      const existingEmail = await this.prisma.aluno.findFirst({
        where: { email: dto.email, NOT: { id } }
      });
      if (existingEmail) {
        throw new ConflictException('Email já está em uso');
      }
    }
  }
}