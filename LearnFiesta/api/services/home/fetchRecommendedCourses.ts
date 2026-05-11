
import { collection, getDocs, onSnapshot, query, limit } from 'firebase/firestore';
import type { Course } from '@/types/course';
import { auth,db} from '@/api/services/firebase';


export async function fetchRecommendedCourses(limitCount = 10): Promise<Course[]> {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not authenticated');
  }

  const q = query(collection(db, 'courses'), limit(limitCount));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return [];

  const courses: Course[] = snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...(data as Omit<Course, 'id'>),
    } as Course;
  });

  return courses;
}


export function subscribeToCourses(callback: (courses: Course[]) => void) {
  const q = collection(db, 'courses'); // يمكن إضافة orderBy, limit إلخ

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const courses: Course[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Course, 'id'>),
    })) as Course[];

    callback(courses);
  });

  return unsubscribe;
}
