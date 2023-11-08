export type CalendarEvent = {
  id: string;
  name: string;
  startTime: string; // Date string
  endTime: string; // Date string
  location: string;
  description: string;
};

const TestEventNames = [
  "GDYO Holiday Magic",
  "Viola is the Greatest",
  "Highest Human Note",
  "Promised Neverland",
];

const TestLocations = [
  "Meyerson Symphony Center",
  "Moody Performance Hall",
  "Tomorrow Land",
  "Disney Land",
];

export const generateEventsInSameColumnWithToday = (): CalendarEvent[] => {
  const id = "test";
  const today = new Date();
  const events: CalendarEvent[] = [];

  let startDate = today.getDate();
  while (startDate >= 0) {
    startDate -= 7;
  }
  startDate += 7;

  const lastDateOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  while (startDate < lastDateOfMonth) {
    events.push({
      id: id.toString(),
      name: TestEventNames[Math.floor(Math.random() * TestEventNames.length)],
      startTime: new Date(
        today.getFullYear(),
        today.getMonth(),
        startDate,
        12,
        0
      ).toString(),
      endTime: new Date(
        today.getFullYear(),
        today.getMonth(),
        startDate,
        13,
        0
      ).toString(),
      location: TestLocations[Math.floor(Math.random() * TestLocations.length)],
      description: "",
    });

    events.push({
      id: id.toString(),
      name: TestEventNames[Math.floor(Math.random() * TestEventNames.length)],
      startTime: new Date(
        today.getFullYear(),
        today.getMonth(),
        startDate,
        14,
        0
      ).toString(),
      endTime: new Date(
        today.getFullYear(),
        today.getMonth(),
        startDate,
        15,
        0
      ).toString(),
      location: TestLocations[Math.floor(Math.random() * TestLocations.length)],
      description: "",
    });

    events.push({
      id: id.toString(),
      name: TestEventNames[Math.floor(Math.random() * TestEventNames.length)],
      startTime: new Date(
        today.getFullYear(),
        today.getMonth(),
        startDate,
        15,
        0
      ).toString(),
      endTime: new Date(
        today.getFullYear(),
        today.getMonth(),
        startDate,
        16,
        0
      ).toString(),
      location: TestLocations[Math.floor(Math.random() * TestLocations.length)],
      description: "",
    });

    startDate += 7;
  }

  return events;
};

export const fetchCalendarEvents = (): Promise<CalendarEvent[]> => {
  return new Promise((resolve) => {
    resolve(generateEventsInSameColumnWithToday());
  });
};
