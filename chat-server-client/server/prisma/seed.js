import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const user1 = await prisma.user.upsert({
        where: { email: 'user1@gmail.com' },
        update: {},
        create: {
            email: 'user1@gmail.com',
            name: 'user1',
            pass: '1324',
        },
    })

    const user2 = await prisma.user.upsert({
        where: { email: 'user2@gmail.com' },
        update: {},
        create: {
            email: 'user2@gmail.com',
            name: 'user2',
            pass: '1324',
        },
    })

    console.log({ user1, user2 })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })