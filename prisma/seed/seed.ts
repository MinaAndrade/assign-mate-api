import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Criação do Admin
  const defaultAdminEmail = process.env.DEFAULT_ADMIN_EMAIL;
  const defaultAdminPassword = process.env.DEFAULT_ADMIN_PASSWORD;

  if (!defaultAdminEmail || !defaultAdminPassword) {
    throw new Error('Variáveis de ambiente do admin padrão não configuradas');
  }

  let admin = await prisma.admin.findUnique({
    where: { email: defaultAdminEmail },
  });

  if (!admin) {
    const hashedPassword = await bcrypt.hash(defaultAdminPassword, 10);
    admin = await prisma.admin.create({
      data: {
        email: defaultAdminEmail,
        password: hashedPassword,
      },
    });
    console.log('Admin padrão criado com sucesso');
  }

  // Criação de Cursos
  const cursos = await prisma.curso.createMany({
    data: [
      {
        codigo: 'MAT101',
        nome: 'Matemática Básica',
        descricao: 'Introdução à matemática elementar',
        adminId: admin.id,
      },
      {
        codigo: 'FIS201',
        nome: 'Física Geral',
        descricao: 'Conceitos básicos de física',
        adminId: admin.id,
      },
      {
        codigo: 'PROG301',
        nome: 'Programação I',
        descricao: 'Introdução à programação',
        adminId: admin.id,
      },
    ],
    skipDuplicates: true,
  });
  console.log(`${cursos.count} cursos criados`);

  // Criação de Professores
  const professores = await prisma.professor.createMany({
    data: [
      {
        matricula: '25P0001',
        nomeCompleto: 'Ana Silva',
        dataNascimento: new Date('1980-05-15'),
        especialidade: 'Matemática',
        email: 'ana.silva@escola.com',
        adminId: admin.id,
      },
      {
        matricula: '25P0002',
        nomeCompleto: 'Carlos Oliveira',
        dataNascimento: new Date('1975-11-22'),
        especialidade: 'Física',
        email: 'carlos.oliveira@escola.com',
        adminId: admin.id,
      },
    ],
    skipDuplicates: true,
  });
  console.log(`${professores.count} professores criados`);

  // Criação de Alunos
  const alunos = await prisma.aluno.createMany({
    data: [
      {
        matricula: '25A0001',
        nomeCompleto: 'João Pereira',
        dataNascimento: new Date('2005-03-20'),
        curso: 'Matemática Básica',
        email: 'joao.pereira@escola.com',
        adminId: admin.id,
      },
      {
        matricula: '25A0002',
        nomeCompleto: 'Maria Santos',
        dataNascimento: new Date('2006-07-12'),
        curso: 'Programação I',
        email: 'maria.santos@escola.com',
        adminId: admin.id,
      },
    ],
    skipDuplicates: true,
  });
  console.log(`${alunos.count} alunos criados`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });