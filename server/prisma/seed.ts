import { PrismaClient, Prisma } from "@prisma/client";

import events from "./Event-data.json";

const prisma = new PrismaClient();
const data_size = 50;

async function main() {
  for (let i = 0; i < data_size; i++) {
    const eventInput: Prisma.EventCreateInput = {
      name: events[i].eventName,
      startTime: new Date(`${events[i].dob} ${events[i].startTime}`),
      endTime: new Date(`${events[i].dob} ${events[i].endTime}`),
      location: `${events[i].location.street} ${events[i].location.town} ${events[i].location.postcode}}`,
      description: events[i].description,
    };
    await prisma.event.create({ data: eventInput });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
