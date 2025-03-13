import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

// Response DTO for the server status check
class ServerStatusResponse {
  @ApiProperty({
    example: true,
    description: 'Indicates if the server is running',
    format: 'boolean',
  })
  ok: boolean;

  @ApiProperty({
    example: 'API is working',
    description: 'Status message',
    format: 'string',
  })
  message: string;
}

@ApiTags('API Server Status') // Swagger tag
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Check Server Status',
    description: 'Check if the server is up and running',
  })
  @ApiResponse({
    status: 200,
    description: 'Server is running',
    type: ServerStatusResponse,
  }) // Swagger response
  getServerStatus(): ServerStatusResponse {
    this.logger.log('GET: Server status check - API is working');
    return { ok: true, message: 'API is working' };
  }
}