import express from "express";
import { report } from "@/utils/error";
import context from "@/context";
const router = express.Router();

router.post("/add-single-event", async (req, res) => {
  const { prisma } = context
  try {
    const eventData = req.body as {
      name: string;
      startTime: string;
      endTime: string;
      location: string;
      description: string;
    };
    const createdEvent = await prisma.event.create({
      data: {
        name: eventData.name,
        startTime: eventData.startTime,
        endTime: eventData.endTime,
        location: eventData.location,
        description: eventData.description
      }
    });
    res.json({ message: "Event added", event: createdEvent });
  } catch (error) {
    report(error);
    res.status(500).json({ error: "internal Server error" });
  }
});


router.get("/fetch-time-specific-events", async (req, res) => {
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
        AND: [
          { startTime: { gte: startDate } },
          { endTime: { lte: endDate } }
        ]
      }
    })
  } catch (error) {
    report(error);
    res.status(500).json({ error: "internal Server error" });
  }
});

export default router;
