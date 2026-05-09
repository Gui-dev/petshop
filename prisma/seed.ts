import 'dotenv/config'
import { faker } from '@faker-js/faker'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { PrismaClient } from '../src/generated/prisma'

const connectionString =
  process.env.DATABASE_URL || 'postgresql://root:root@localhost:5432/petshop?schema=public'

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Clearing existing appointments...')
  await prisma.appointment.deleteMany()

  console.log('Seeding 60 appointments...')

  const appointments = []

  for (let i = 0; i < 60; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i + 1)
    date.setHours(faker.number.int({ min: 8, max: 18 }), 0, 0, 0)

    appointments.push({
      tutorName: faker.person.fullName(),
      petName: faker.helpers.arrayElement([
        'Dog',
        'Cat',
        'Bird',
        'Rabbit',
        'Hamster',
        'Fish',
        'Turtle',
        'Guinea Pig',
      ]),
      phone: faker.phone.number({ style: 'national' }),
      description: faker.lorem.sentence({ min: 3, max: 10 }),
      scheduledAt: date,
    })
  }

  await prisma.appointment.createMany({
    data: appointments,
  })

  console.log('Seeded 60 appointments successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

