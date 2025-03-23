import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from '@prisma/client';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(dto: RegisterUserDto): Promise<any> {
    this.logger.log(`POST /auth/register: Registering user with email ${dto.email}`);

    // Verificar se as senhas coincidem
    if (dto.password !== dto.passwordconf) {
        this.logger.warn(`Passwords do not match for email: ${dto.email}`);
        throw new BadRequestException('Passwords do not match');
    }

    // Normalizar email
    dto.email = dto.email.toLowerCase().trim();

    // Hash da senha
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    try {
        const { passwordconf, ...newUserData } = dto;
        newUserData.password = hashedPassword;

        const newUser = await this.prisma.user.create({
            data: {
                ...newUserData,
                dateOfBirth: new Date(dto.dateOfBirth), // Garantir que a data seja salva corretamente
                image: dto.image || null, // Salvar a imagem se fornecida
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                isAdmin: true,
                createdAt: true,
                dateOfBirth: true, // Incluir a data de nascimento na resposta
            },
        });

        this.logger.log(`User registered successfully: ${newUser.email}`);
        return {
            user: newUser,
            token: this.getJwtToken({ id: newUser.id }),
        };
    } catch (error) {
        if (error.code === 'P2002') {
            this.logger.warn(`User already exists: ${dto.email}`);
            throw new BadRequestException('User already exists');
        }
        this.logger.error(`Error registering user: ${error.message}`, error.stack);
        throw new InternalServerErrorException('Server error');
    }
}

  async loginUser(email: string, password: string): Promise<any> {
    this.logger.log(`POST /auth/login: Attempting login for email ${email}`);

    let user: User;
    try {
      user = await this.prisma.user.findUniqueOrThrow({
        where: { email },
      });
    } catch (error) {
      this.logger.error(`Login failed: ${error.message}`, error.stack);
      throw new BadRequestException('Wrong credentials');
    }

    // Comparar a senha fornecida com a senha com hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      this.logger.warn(`Password mismatch for user: ${user.email}`);
      throw new BadRequestException('Wrong credentials');
    }

    delete user.password;
    this.logger.log(`Login successful for user: ${user.email}`);
    return {
      user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async refreshToken(user: User) {
    this.logger.log(`Refreshing token for user: ${user.email}`);
    return {
      user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}