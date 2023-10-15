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



router.get("/fetch-month-events", async (req, res) => {
  try {
    const { dateTime } = req.query;
    var date = dateTime.toString().split(' ');

    const events = await prisma.event.findMany({
      where: {
        startTime: 
      }


    })
  })

export default router;
