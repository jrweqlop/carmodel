// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()

// async function main() {
//     // ... you will write your Prisma Client queries here
//     const find = await prisma.modelGroup.findMany()
//     console.log({ find })
// }

// main()
//     .then(async () => {
//         await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })


import { PrismaClient } from '@prisma/client';
// import jsonData from './jsonData.json'; // สมมุติว่าไฟล์ JSON เก็บไว้ที่ prisma/data.json
import { readFileSync } from 'fs'
const prisma = new PrismaClient();

async function main() {

    const value = readFileSync('./src/jsonData.json', 'utf-8') as string
    const jsonData = JSON.parse(value)

    for (const brand of jsonData.data) {
        const createdBrand = await prisma.brand.create({
            data: {
                name: brand.brand,
            },
        });

        for (const modelGroup of brand.model) {
            const [groupCode, carModels] = Object.entries(modelGroup)[0];

            const createdGroup = await prisma.modelGroup.create({
                data: {
                    code: groupCode,
                    brandId: createdBrand.id,
                },
            });

            for (const car of carModels as any[]) {
                await prisma.carModel.create({
                    data: {
                        name: car.name,
                        imagePath: car.path,
                        modelGroupId: createdGroup.id,
                    },
                });
            }
        }
    }
}

main()
    .then(() => {
        console.log('✅ Seed completed!');
        prisma.$disconnect();
    })
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });