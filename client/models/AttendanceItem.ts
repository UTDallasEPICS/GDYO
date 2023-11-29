import { faker } from "@faker-js/faker";

export type AttendanceItem = {
  studentId: string;
  studentName: string;
  startTime: string; // Date string
  endTime: string; // Date string
  location: string;
  status: AttendanceStatus;
};

export enum AttendanceStatus {
  ATTENDED = "attended",
  TARDY = "tardy",
  MISSED = "missed",
}

export const generateAttendanceItems = (): AttendanceItem[] => {
  const items: AttendanceItem[] = [];
  for (let i = 0; i < 100; i++) {
    items.push(generateAttendanceItem());
  }
  return items.sort((a, b) => {
    if (a.studentName < b.studentName) {
      return -1;
    }

    if (a.studentName === b.studentName) {
      return 0;
    }

    return 1;
  });
};

export const generateAttendanceItem = (): AttendanceItem => {
  const statuses = [
    AttendanceStatus.ATTENDED,
    AttendanceStatus.TARDY,
    AttendanceStatus.MISSED,
  ];

  return {
    studentId: faker.number.int().toString(),
    studentName: faker.person.fullName(),
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    location: `${faker.location.streetAddress()}, ${faker.location.city()}, ${
      faker.location.state
    } ${faker.location.zipCode()}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  };
};
