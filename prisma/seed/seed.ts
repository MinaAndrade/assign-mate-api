import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Hash the default password
    const hashedPassword = await bcrypt.hash('123456', 10);

    // Delete all existing users (cleanup)
    await prisma.user.deleteMany();

    // Create new users
    const newUsers = await prisma.user.createMany({
        data: [
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: hashedPassword,
                role: Role.admin,
                dateOfBirth: new Date('1990-01-01'), // Add a valid date of birth
            },
            {
                name: 'Regular User',
                email: 'user@example.com',
                password: hashedPassword,
                role: Role.user,
                dateOfBirth: new Date('1995-01-01'), // Add a valid date of birth
            },
            {
                name: 'Professor User',
                email: 'professor@example.com',
                password: hashedPassword,
                role: Role.professor,
                dateOfBirth: new Date('1985-01-01'), // Add a valid date of birth
            },
            {
                name: 'Student User',
                email: 'student@example.com',
                password: hashedPassword,
                role: Role.student,
                dateOfBirth: new Date('2000-01-01'), // Add a valid date of birth
            },
        ],
    });

    console.log('Seeded users:', newUsers);
}

main()
    .catch((e) => {
        console.error('Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        // Close Prisma Client at the end
        await prisma.$disconnect();
    });