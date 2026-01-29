import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('SGAS API - Sistema de Gestão de Agendamentos')
    .setDescription(
      'Documentação completa da API para o Sistema de Gestão de Agendamentos de Serviços (SGAS).\n\n' +
      'Esta API permite gerenciar usuários, serviços e agendamentos.\n\n' +
      '**Autenticação**:\n' +
      'A maioria dos endpoints requer autenticação via token JWT (Bearer Token). Use os endpoints de Auth para obter o token.'
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Insira seu token JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
