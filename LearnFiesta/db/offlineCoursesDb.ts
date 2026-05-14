import * as SQLite from "expo-sqlite";
import type { Enrollment } from "@/components/CourseCard";
import { getAuth } from "firebase/auth";
const DB_NAME = "my_courses_offline.db";


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
      id TEXT NOT NULL,
      userId TEXT NOT NULL,
      data TEXT NOT NULL,
      PRIMARY KEY (id, userId)
    );
  `);


  return db;
}
export async function saveEnrollmentsOffline(enrollments: Enrollment[]) {
  const db = await getDb();
  const user = getAuth().currentUser;
  if (!user) return;
  for (const item of enrollments) {
    await db.runAsync(
        `
      INSERT OR REPLACE INTO enrollments (id, userId, data)
      VALUES (?, ?, ?);
      `,
        [item.id, user.uid, JSON.stringify(item)]
    );
  }

  const rows = await db.getAllAsync("SELECT * FROM enrollments;");
  console.log("SQLITE SAVED ROWS:", rows.length);
}


export async function getOfflineEnrollments(): Promise<Enrollment[]> {
  const db = await getDb();
  const user = getAuth().currentUser;
  if (!user) return [];

  const rows = await db.getAllAsync<{
    id: string;
    userId: string;
    data: string;
  }>("SELECT * FROM enrollments WHERE userId = ?", [user.uid]);

  return rows.map((row) => JSON.parse(row.data));
}


export async function clearOfflineEnrollments() {
  const db = await getDb();
  await db.runAsync("DELETE FROM enrollments;");
}