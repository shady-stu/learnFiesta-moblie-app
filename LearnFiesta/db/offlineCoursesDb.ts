import * as SQLite from "expo-sqlite";
import type { Enrollment } from "@/components/CourseCard";

const DB_NAME = "my_courses_offline.db";

async function getDb() {
  return SQLite.openDatabaseAsync(DB_NAME);
}

export async function initCoursesDb() {
  const db = await getDb();

  await db.runAsync(`
    CREATE TABLE IF NOT EXISTS enrollments (
      id TEXT PRIMARY KEY NOT NULL,
      data TEXT NOT NULL
    );
  `);

  return db;
}

export async function saveEnrollmentsOffline(enrollments: Enrollment[]) {
  const db = await initCoursesDb();

  await db.runAsync("DELETE FROM enrollments;");

  for (const item of enrollments) {
    await db.runAsync(
      `
      INSERT OR REPLACE INTO enrollments (id, data)
      VALUES (?, ?);
      `,
      [String(item.id), JSON.stringify(item)]
    );
  }
}

export async function getOfflineEnrollments(): Promise<Enrollment[]> {
  const db = await initCoursesDb();

  const rows = await db.getAllAsync<{
    id: string;
    data: string;
  }>("SELECT * FROM enrollments;");

  return rows.map((row) => JSON.parse(row.data));
}

export async function clearOfflineEnrollments() {
  const db = await initCoursesDb();

  await db.runAsync("DELETE FROM enrollments;");
}