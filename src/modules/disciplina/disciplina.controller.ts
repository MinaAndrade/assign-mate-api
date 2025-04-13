import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
import { DisciplinaResponseDto } from './dto/disciplina-response.dto';
import { DisciplinaService } from './disciplina.service';
import { PaginationParams } from 'src/common/dto/pagination.dto';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';

@ApiTags('Disciplinas')
@Controller('disciplinas')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DisciplinaController {
  constructor(private readonly disciplinaService: DisciplinaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova disciplina', description: 'Vincula a um curso existente' })
  @ApiResponse({ status: 201, description: 'Disciplina criada', type: DisciplinaResponseDto })
  create(@Req() req, @Body() createDisciplinaDto: CreateDisciplinaDto) {
    return this.disciplinaService.create(req.user.id, createDisciplinaDto);
  }

  // @Get()
  // @ApiQuery({ name: 'cursoId', required: false })
  // @ApiQuery({ type: PaginationParams })
  // @ApiOperation({ summary: 'Listar disciplinas (paginado)' })
  // @ApiResponse({ 
  //   status: 200, 
  //   description: 'Lista de disciplinas',
  //   type: PaginatedResponseDto<DisciplinaResponseDto>
  // })
  // findAll(
  //   @Req() req,
  //   @Query() paginationParams: PaginationParams,
  //   @Query('cursoId') cursoId?: string
  // ) {
  //   return this.disciplinaService.findAllPaginated(
  //     req.user.sub,
  //     paginationParams,
  //     cursoId ? Number(cursoId) : undefined
  //   );
  // }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar disciplina por ID' })
  @ApiResponse({ status: 200, description: 'Disciplina encontrada', type: DisciplinaResponseDto })
  findOne(@Req() req, @Param('id', ParseIntPipe) id: number) {
    return this.disciplinaService.findOne(req.user.sub, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar disciplina' })
  @ApiResponse({ status: 200, description: 'Disciplina atualizada', type: DisciplinaResponseDto })
  update(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDisciplinaDto: UpdateDisciplinaDto
  ) {
    return this.disciplinaService.update(req.user.sub, id, updateDisciplinaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir disciplina' })
  @ApiResponse({ status: 200, description: 'Disciplina excluída', type: DisciplinaResponseDto })
  remove(@Req() req, @Param('id', ParseIntPipe) id: number) {
    return this.disciplinaService.remove(req.user.sub, id);
  }
}