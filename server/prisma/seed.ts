import { PrismaClient, Prisma } from "@prisma/client";

import events from "./Event-data.json";

const prisma = new PrismaClient();
// const data_size = 50;

const main = async () => {
  await Promise.all(
    events.map(async (ev) => {
      const eventInput: Prisma.EventCreateInput = {
        name: ev.eventName,
        startTime: new Date(`${ev.date} ${ev.startTime}`),
        endTime: new Date(`${ev.date} ${ev.endTime}`),
        location: `${ev.location.street}, ${ev.location.town}, ${ev.location.postcode}`,
        description: ev.description,
      };
      await prisma.event.create({ data: eventInput });
    })
  );
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
