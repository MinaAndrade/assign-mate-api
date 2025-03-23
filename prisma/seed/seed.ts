import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Criando um usuário (Admin)
  const userAdmin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: await hash('adminpassword', 10), // Senha criptografada
      isAdmin: true,
      dateOfBirth: new Date('1990-01-01'),
      image: 'https://example.com/admin-image.png',
      emailVerified: new Date(),
    },
  })

  // Criando um usuário (Aluno)
  const userStudent = await prisma.user.create({
    data: {
      name: 'Student User',
      email: 'student@example.com',
      password: await hash('studentpassword', 10), // Senha criptografada
      dateOfBirth: new Date('2000-01-01'),
    },
  })

  // Criando um curso
  const course = await prisma.course.create({
    data: {
      name: 'Curso de Tecnologia',
      description: 'Curso focado em tecnologia e programação.',
    },
  })

  // Criando uma disciplina (subject)
  const subject = await prisma.subject.create({
    data: {
      name: 'Desenvolvimento Web',
      courseId: course.id,
    },
  })

  // Criando uma turma
  const classData = await prisma.class.create({
    data: {
      classCode: 'T1-2025',
      year: 2025,
      semester: 1,
      period: 'Manhã',
      shift: 'Diurno',
      courseId: course.id,
      enrollmentDate: new Date(),
    },
  })

  // Atribuindo o aluno à turma
  await prisma.student.create({
    data: {
      userId: userStudent.id,
      status: 'APPROVED',
      classes: {
        connect: { id: classData.id },
      },
    },
  })

  // Criando uma atividade para a disciplina
  const activity = await prisma.activity.create({
    data: {
      name: 'Prova N1',
      type: 'N1',
      maximumGrade: 10,
      deadline: new Date('2025-06-01'),
      subjectId: subject.id,
    },
  })

  // Criando uma nota para o aluno
  await prisma.grade.create({
    data: {
      studentId: userStudent.id,
      subjectId: subject.id,
      value: 8.5,
    },
  })

  console.log('Seed data successfully added')
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
