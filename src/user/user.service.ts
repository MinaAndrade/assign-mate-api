import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');

  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    this.logger.log(`POST: user/register: Register user started`);

    // Check if password and password confirmation match
    if (dto.password !== dto.passwordconf) {
      throw new BadRequestException('Passwords do not match');
    }

    // Validate role
    if (dto.role && !Role[dto.role]) {
      throw new BadRequestException('Invalid role');
    }

    // Normalize email
    dto.email = dto.email.toLowerCase().trim();

    // Hash the password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    try {
      const { passwordconf, ...newUserData } = dto;
      newUserData.password = hashedPassword;

      const newUser = await this.prisma.user.create({
        data: newUserData,
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          createdAt: true,
        },
      });

      return newUser;
    } catch (error) {
      this.prismaErrorHandler(error, 'POST', dto.email);
      this.logger.error(`POST: error: ${error}`);
      throw new InternalServerErrorException('Server error');
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return users;
    } catch (error) {
      this.logger.error(`GET: error: ${error}`);
      throw new InternalServerErrorException('Server error');
    }
  }

  async findOne(field: string, value: string, user: User) {
    // Check if the user is authorized to access this data
    if (value !== user[field] && user.role !== Role.admin) {
      throw new UnauthorizedException('Unauthorized');
    }

    const whereData = field === 'id' ? { id: value } : { email: value };

    try {
      const foundUser = await this.prisma.user.findUniqueOrThrow({
        where: whereData,
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return foundUser;
    } catch (error) {
      this.prismaErrorHandler(error, 'GET', value);
      this.logger.error(`GET/{id}: error: ${error}`);
      throw new InternalServerErrorException('Server error');
    }
  }

  async update(field: string, value: string, dto: UpdateUserDto, user: User) {
    // Check if the user is authorized to update this data
    if (value !== user[field] && user.role !== Role.admin) {
      throw new UnauthorizedException('Unauthorized');
    }

    const whereData = field === 'id' ? { id: value } : { email: value };

    // Only admins can update the role
    if (user.role !== Role.admin) {
      delete dto.role;
    }

    const { passwordconf, ...newUserData } = dto;

    // Check if password and password confirmation match
    if (dto.password) {
      if (dto.password !== passwordconf) {
        throw new BadRequestException('Passwords do not match');
      }
      // Hash the new password
      newUserData.password = await bcrypt.hash(dto.password, 10);
    }

    try {
      const updatedUser = await this.prisma.user.update({
        where: whereData,
        data: newUserData,
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return updatedUser;
    } catch (error) {
      this.prismaErrorHandler(error, 'PATCH', value);
      this.logger.error(`PATCH: error: ${error}`);
      throw new InternalServerErrorException('Server error');
    }
  }

  async remove(field: string, value: string, user: User) {
    // Check if the user is authorized to delete this data
    if (value !== user[field] && user.role !== Role.admin) {
      throw new UnauthorizedException('Unauthorized');
    }

    const whereData = field === 'id' ? { id: value } : { email: value };

    try {
      const deletedUser = await this.prisma.user.delete({
        where: whereData,
        select: {
          id: true,
          email: true,
          name: true,
        },
      });

      this.logger.warn(`DELETE: ${JSON.stringify(deletedUser)}`);
      return { message: 'User deleted' };
    } catch (error) {
      this.prismaErrorHandler(error, 'DELETE', value);
      this.logger.error(`DELETE: error: ${error}`);
      throw new InternalServerErrorException('Server error');
    }
  }

  prismaErrorHandler = (error: any, method: string, value: string = null) => {
    if (error.code === 'P2002') {
      this.logger.warn(`${method}: User already exists: ${value}`);
      throw new BadRequestException('User already exists');
    }
    if (error.code === 'P2025') {
      this.logger.warn(`${method}: User not found: ${value}`);
      throw new BadRequestException('User not found');
    }
  };
}