export type CalendarEvent = {
  id: string;
  startTime: Date;
  endTime: Date;
  name: string;
  location: string;
  description: string;
};

const CalendarEventsMock: CalendarEvent[] = [
  {
    id: "1",
    startTime: new Date(2023, 9, 3, 17, 0),
    endTime: new Date(2023, 9, 3, 18, 0),
    name: "GDYO Holiday Magic",
    location: "Meyerson Symphony Center",
    description: "",
  },
  {
    id: "2",
    startTime: new Date(2023, 9, 3, 19, 0),
    endTime: new Date(2023, 9, 3, 20, 0),
    name: "Viola is the Greatest",
    location: "Moody Performance Hall",
    description: "",
  },
  {
    id: "3",
    startTime: new Date(2023, 9, 3, 12, 0),
    endTime: new Date(2023, 9, 3, 13, 0),
    name: "GDYO Holiday Magic",
    location: "Meyerson Symphony Center",
    description: "",
  },
  {
    id: "4",
    startTime: new Date(2023, 9, 4, 14, 0),
    endTime: new Date(2023, 9, 4, 15, 0),
    name: "Viola is the Greatest",
    location: "Moody Performance Hall",
    description: "",
  },
  {
    id: "5",
    startTime: new Date(2023, 9, 4, 16, 0),
    endTime: new Date(2023, 9, 4, 17, 0),
    name: "GDYO Holiday Magic",
    location: "Meyerson Symphony Center",
    description: "",
  },
];

export const fetchCalendarEvents = (): Promise<CalendarEvent[]> => {
  return new Promise((resolve) => {
    resolve(CalendarEventsMock);
  });
};
