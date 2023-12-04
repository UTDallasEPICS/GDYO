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

router.get("/fetch-next-events", async (req, res) => {
  const { prisma } = context;
  try {
    // Use the current date and time as the reference for fetching the next events
    const currentDate = new Date();
    const limit = req.query.limit
      ? parseInt(req.query.limit as string, 15)
      : 10;

    const events = await prisma.event.findMany({
      where: {
        startTime: { gt: currentDate }, // Get events that start after the current date and time
      },
      take: limit, // Limit the number of events returned
      orderBy: {
        startTime: "asc", // Order by the start time in ascending order
      },
    });

    res.json({ events });
  } catch (error) {
    report(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/fetch-next-events", async (req, res) => {
  const { prisma } = context;
  try {
    // Parse the 'limit' from the query string, with a default of 10 if not provided
    const limit = req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : 10;

    // Extract 'cursor' from the query string, and ensure it's a string before parsing
    const cursor =
      typeof req.query.cursor === "string" ? req.query.cursor : null;

    // Construct the query for Prisma, with pagination if a 'cursor' is provided
    const events = await prisma.event.findMany({
      where: {
        startTime: { gt: new Date() }, // Get events that start after the current date and time
        ...(cursor ? { id: { gt: parseInt(cursor) } } : {}), // Use cursor if provided and valid
      },
      take: limit,
      orderBy: {
        startTime: "asc",
      },
      ...(cursor ? { skip: 1 } : {}), // Skip the cursor event if cursor is provided
    });

    // Send the retrieved events back in the response
    res.json({ events });
  } catch (error) {
    // Error handling
    report(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
