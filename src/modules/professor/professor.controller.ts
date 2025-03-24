import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { 
  ApiBearerAuth, 
  ApiOperation, 
  ApiResponse, 
  ApiTags 
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { ProfessorService } from './professor.service';
import { ProfessorResponseDto } from './dto/response-professor.dto';

@ApiTags('Professores')
@Controller('professores')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar novo professor',
    description: 'Cria um novo professor vinculado ao administrador autenticado. Valida matrícula e email únicos.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Professor criado com sucesso',
    type: ProfessorResponseDto
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflito - Matrícula ou Email já cadastrado'
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos'
  })
  create(@Req() req, @Body() createProfessorDto: CreateProfessorDto) {
    const adminId = req.user.id; // Alteração importante aqui
    return this.professorService.create(adminId, createProfessorDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos professores',
    description: 'Retorna todos professores cadastrados pelo administrador autenticado. Ordenado por data de criação.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de professores encontrada',
    type: [ProfessorResponseDto]
  })
  findAll(@Req() req) {
    return this.professorService.findAll(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar professor por ID',
    description: 'Retorna os detalhes de um professor específico. Verifica permissão do administrador.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Professor encontrado',
    type: ProfessorResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Professor não encontrado'
  })
  findOne(@Req() req, @Param('id', ParseIntPipe) id: number) {
    return this.professorService.findOne(req.user.sub, id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Atualizar professor',
    description: 'Atualiza dados de um professor existente. Mantém validação de dados únicos.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Professor atualizado com sucesso',
    type: ProfessorResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Professor não encontrado'
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflito - Nova matrícula ou Email já existe'
  })
  update(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfessorDto: UpdateProfessorDto
  ) {
    return this.professorService.update(req.user.sub, id, updateProfessorDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Excluir professor',
    description: 'Remove permanentemente um professor do sistema. Operação irreversível.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Professor excluído com sucesso',
    type: ProfessorResponseDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Professor não encontrado'
  })
  remove(@Req() req, @Param('id', ParseIntPipe) id: number) {
    return this.professorService.remove(req.user.sub, id);
  }
}