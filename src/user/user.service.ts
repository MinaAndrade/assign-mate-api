import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    if (dto.password !== dto.passwordconf) throw new BadRequestException('Passwords do not match');
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    try {
      return await this.prisma.user.create({
        data: { ...dto, password: hashedPassword, isAdmin: dto.isAdmin || false },
        select: { id: true, name: true, email: true, isAdmin: true, createdAt: true },
      });
    } catch (error) {
      throw new InternalServerErrorException('Server error');
    }
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, name: true, email: true, isAdmin: true, createdAt: true },
    });
  }

  async findOne(id: string, user: User) {
    if (id !== user.id && !user.isAdmin) throw new UnauthorizedException('Unauthorized');
    console.log('User:', user); // Log para verificar se user está sendo recebido
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, isAdmin: true, createdAt: true },
    });
  }

  async update(id: string, dto: UpdateUserDto, user: User) {
    if (id !== user.id && !user.isAdmin) throw new UnauthorizedException('Unauthorized');
    if (dto.password && dto.password !== dto.passwordconf) throw new BadRequestException('Passwords do not match');
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.update({ where: { id }, data: dto });
  }

  async remove(id: string, user: User) {
    if (id !== user.id && !user.isAdmin) throw new UnauthorizedException('Unauthorized');
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully' };
  }
}
