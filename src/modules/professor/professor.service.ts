import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ProfessorService {
  constructor(private prisma: PrismaService) {}

  async create(adminId: number, createProfessorDto: CreateProfessorDto) {
    await this.checkUniqueConstraints(createProfessorDto);
    
    return this.prisma.professor.create({
      data: {
        ...createProfessorDto,
        dataNascimento: new Date(createProfessorDto.dataNascimento),
        adminId: adminId
      }
    });
  }

  async findAll(adminId: number) {
    return this.prisma.professor.findMany({
      where: { adminId }
    });
  }

  async findOne(adminId: number, id: number) {
    const professor = await this.prisma.professor.findUnique({
      where: { id, adminId }
    });

    if (!professor) {
      throw new NotFoundException('Professor não encontrado');
    }
    return professor;
  }

  async update(adminId: number, id: number, updateProfessorDto: UpdateProfessorDto) {
    await this.findOne(adminId, id); // Verifica se existe
    await this.checkUniqueConstraints(updateProfessorDto, id);

    return this.prisma.professor.update({
      where: { id },
      data: {
        ...updateProfessorDto,
        dataNascimento: updateProfessorDto.dataNascimento ? 
          new Date(updateProfessorDto.dataNascimento) : undefined
      }
    });
  }

  async remove(adminId: number, id: number) {
    await this.findOne(adminId, id);
    return this.prisma.professor.delete({ where: { id } });
  }

  private async checkUniqueConstraints(dto: CreateProfessorDto | UpdateProfessorDto, id?: number) {
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