import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { PaginationParams } from 'src/common/dto/pagination.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfessorService {
  constructor(private prisma: PrismaService) {}

  async create(adminId: string, createProfessorDto: CreateProfessorDto) {
    await this.checkUniqueConstraints(createProfessorDto);

    const hashedPassword = await bcrypt.hash(createProfessorDto.password, 10);
    
    return this.prisma.professor.create({
      data: {
        ...createProfessorDto,
        password: hashedPassword,
        dataNascimento: new Date(createProfessorDto.dataNascimento),
        adminId: adminId
      }
    });
  }

  async findAll(adminId: string, paginationParams: PaginationParams) {
    const { page = 1, perPage = 15, sort = 'createdAt', sortDir = 'desc' } = paginationParams;
  
    const [total, data] = await this.prisma.$transaction([
      this.prisma.professor.count({
        where: { adminId },
      }),
      this.prisma.professor.findMany({
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
    const professor = await this.prisma.professor.findUnique({
      where: { id, adminId }
    });

    if (!professor) {
      throw new NotFoundException('Professor não encontrado');
    }
    return professor;
  }

  async update(adminId: string, id: string, updateProfessorDto: UpdateProfessorDto) {
    await this.findOne(adminId, id); // Verifica se existe
    await this.checkUniqueConstraints(updateProfessorDto, id);

    const data: any = { ...updateProfessorDto };

    if (updateProfessorDto.password) {
      data.password = await bcrypt.hash(updateProfessorDto.password, 10);
    }

    if (updateProfessorDto.dataNascimento) {
      data.dataNascimento = new Date(updateProfessorDto.dataNascimento);
    }

    return this.prisma.professor.update({
      where: { id },
      data: {
        ...updateProfessorDto,
        dataNascimento: updateProfessorDto.dataNascimento ? 
          new Date(updateProfessorDto.dataNascimento) : undefined
      }
    });
  }

  async remove(adminId: string, id: string) {
    await this.findOne(adminId, id);
    return this.prisma.professor.delete({ where: { id } });
  }

  private async checkUniqueConstraints(dto: CreateProfessorDto | UpdateProfessorDto, id?: string) {
    if (dto.matricula) {
      const existingMatricula = await this.prisma.professor.findFirst({
        where: { matricula: dto.matricula, NOT: { id } }
      });
      if (existingMatricula) {
        throw new ConflictException('Matrícula já está em uso');
      }
    }

    if (dto.email) {
      const existingEmail = await this.prisma.professor.findFirst({
        where: { email: dto.email, NOT: { id } }
      });
      if (existingEmail) {
        throw new ConflictException('Email já está em uso');
      }
    }
  }
}