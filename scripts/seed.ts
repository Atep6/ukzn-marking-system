import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Seed users
    const users = await prisma.user.createMany({
        data: [
            { username: 'student1', password: 'password1', role: 'student' },
            { username: 'tutor1', password: 'password1', role: 'tutor' },
        ],
    });

    console.log(`Seeded ${users.count} users`);

    // Seed scripts
    const scripts = await prisma.script.createMany({
        data: [
            { title: 'Script 1', content: 'Content of script 1', userId: 1 },
            { title: 'Script 2', content: 'Content of script 2', userId: 1 },
        ],
    });

    console.log(`Seeded ${scripts.count} scripts`);

    // Seed grades
    const grades = await prisma.grade.createMany({
        data: [
            { scriptId: 1, score: 85 },
            { scriptId: 2, score: 90 },
        ],
    });

    console.log(`Seeded ${grades.count} grades`);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });