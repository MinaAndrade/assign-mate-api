import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Injectable()
export class AlunoService {
  constructor(private prisma: PrismaService) {}

  async create(adminId: number, createAlunoDto: CreateAlunoDto) {
    await this.checkUniqueConstraints(createAlunoDto);
    
    return this.prisma.aluno.create({
      data: {
        ...createAlunoDto,
        dataNascimento: new Date(createAlunoDto.dataNascimento),
        adminId: adminId
      }
    });
  }

  async findAll(adminId: number) {
    return this.prisma.aluno.findMany({
      where: { adminId }
    });
  }

  async findOne(adminId: number, id: number) {
    const aluno = await this.prisma.aluno.findUnique({
      where: { id, adminId }
    });

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }
    return aluno;
  }

  async update(adminId: number, id: number, updateAlunoDto: UpdateAlunoDto) {
    await this.findOne(adminId, id);
    await this.checkUniqueConstraints(updateAlunoDto, id);

    return this.prisma.aluno.update({
      where: { id },
      data: {
        ...updateAlunoDto,
        dataNascimento: updateAlunoDto.dataNascimento ? 
          new Date(updateAlunoDto.dataNascimento) : undefined
      }
    });
  }

  async remove(adminId: number, id: number) {
    await this.findOne(adminId, id);
    return this.prisma.aluno.delete({ where: { id } });
  }

  private async checkUniqueConstraints(dto: CreateAlunoDto | UpdateAlunoDto, id?: number) {
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