import express from "express";

import context from "@/context";
import { report } from "@/utils/error";

const router = express.Router();

router.post("/add-single-event", express.json(), async (req, res) => {
  const { prisma } = context;
  try {
    const eventData = req.body as {
      name: string;
      startTime: string;
      endTime: string;
      location: string;
      description: string;
    };

    const startDate = new Date(eventData.startTime);
    const endDate = new Date(eventData.endTime);

    if (endDate <= startDate) {
      return res.status(400).json({ error: "Bad Time Range" });
    }

    const createdEvent = await prisma.event.create({
      data: {
        name: eventData.name,
        startTime: eventData.startTime,
        endTime: eventData.endTime,
        location: eventData.location,
        description: eventData.description,
      },
    });
    res.json({ message: "Event added", event: createdEvent });
  } catch (error) {
    report(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/fetch-events-within-time-range", async (req, res) => {
  const { prisma } = context;
  try {
    const { startTime, endTime } = req.query as {
      startTime: string;
      endTime: string;
    };

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    if (endDate <= startDate) {
      return res.status(400).json({ error: "Bad Time Range" });
    }

    const events = await prisma.event.findMany({
      where: {
        AND: [{ startTime: { gte: startDate } }, { endTime: { lte: endDate } }],
      },
    });

    res.json({ events });
  } catch (error) {
    report(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
