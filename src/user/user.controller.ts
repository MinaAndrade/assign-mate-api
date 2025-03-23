import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from './entities/user.entity';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'CREATE USER', description: 'Cria um novo usuário.' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.', type: User })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @Auth()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'GET ALL USERS', description: 'Lista todos os usuários.' })
  @ApiResponse({ status: 200, description: 'Lista de usuários.', type: [User] })
  @Auth()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'GET USER BY ID', description: 'Obtém os dados de um usuário pelo ID.' })
  @ApiResponse({ status: 200, description: 'Detalhes do usuário.', type: User })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @Auth()
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.userService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'UPDATE USER', description: 'Atualiza os dados de um usuário.' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.', type: User })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @Auth()
  update(@Param('id') id: string, @Body() dto: UpdateUserDto, @GetUser() user: User) {
    return this.userService.update(id, dto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'DELETE USER', description: 'Deleta um usuário pelo ID.' })
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @Auth()
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.userService.remove(id, user);
  }
}
  