import * as SQLite from "expo-sqlite";
import type { Enrollment } from "@/types/Enrollment";
import { getAuth } from "firebase/auth";

const DB_NAME = "my_courses_offline_v2.db";

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export function getDb() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync(DB_NAME);
  }

  return dbPromise;
}

export async function initCoursesDb() {
  const db = await getDb();

  await db.runAsync(`
    CREATE TABLE IF NOT EXISTS enrollments (
      courseId TEXT NOT NULL,
      userId TEXT NOT NULL,
      data TEXT NOT NULL,
      PRIMARY KEY (courseId, userId)
    );
  `);


  return db;
}
export async function saveEnrollmentsOffline(enrollments: Enrollment[]) {
  const db = await initCoursesDb();
  const user = getAuth().currentUser;

  if (!user) return;

  const uniqueEnrollments = Array.from(
    new Map(enrollments.map((item) => [item.courseId, item])).values()
  );

  for (const item of uniqueEnrollments) {
    await db.runAsync(
      `
      INSERT OR REPLACE INTO enrollments (courseId, userId, data)
      VALUES (?, ?, ?);
      `,
      [item.courseId, user.uid, JSON.stringify(item)]
    );
  }

  const rows = await db.getAllAsync(
    "SELECT * FROM enrollments WHERE userId = ?;",
    [user.uid]
  );

  console.log("SQLITE SAVED ROWS:", rows.length);
}

export async function getOfflineEnrollments(): Promise<Enrollment[]> {
  const db = await initCoursesDb();
  const user = getAuth().currentUser;

  if (!user) return [];

  const rows = await db.getAllAsync<{
    courseId: string;
    userId: string;
    data: string;
  }>("SELECT * FROM enrollments WHERE userId = ?;", [user.uid]);

  return rows.map((row) => JSON.parse(row.data));
}

export async function clearOfflineEnrollments() {
  const db = await getDb();
  const user = getAuth().currentUser;

  if (!user) return;

  await db.runAsync("DELETE FROM enrollments WHERE userId = ?;", [user.uid]);
}
