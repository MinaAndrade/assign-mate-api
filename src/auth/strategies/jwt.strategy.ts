import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Ensure token expiration is checked
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id: id }, // No need to parse to integer, as Prisma handles string IDs
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
          createdAt: true,
          dateOfBirth: true,
          updatedAt: true,
          creationDate: true,
        },
      });

      // Ensure the ID is returned as a string for consistency
      return { ...user, id: user.id.toString() };
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (error.name === 'NotFoundError') {
      throw new UnauthorizedException('User not found');
    }
    throw new UnauthorizedException('Invalid token');
  }
}