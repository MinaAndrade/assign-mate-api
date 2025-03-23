import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const defaultAdminEmail = process.env.DEFAULT_ADMIN_EMAIL;
  const defaultAdminPassword = process.env.DEFAULT_ADMIN_PASSWORD;

  if (!defaultAdminEmail || !defaultAdminPassword) {
    throw new Error('Variáveis de ambiente do admin padrão não configuradas');
  }

  // Verifica se o admin já existe
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: defaultAdminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(defaultAdminPassword, 10);
    
    await prisma.admin.create({
      data: {
        email: defaultAdminEmail,
        password: hashedPassword,
      },
    });
    console.log('Admin padrão criado com sucesso');
  } else {
    console.log('Admin padrão já existe');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });