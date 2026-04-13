// import { useState, useEffect } from 'react';
// import firestore from '@react-native-firebase/firestore';

// const useEnrollmentWithInstructor = () => {
//   const [enrollments, setEnrollments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const enrollmentSnapshot = await firestore()
//           .collection('Enrollment')
//           .get();

//         const enriched = await Promise.all(
//         //   enrollmentSnapshot.docs.map(async (doc) => {
//             const enrollment = { id: doc.id, ...doc.data() };

//             let instructor = null;

//             if (enrollment.instructorId) {
//               const instructorDoc = await firestore()
//                 .collection('Instructor')
//                 .doc(enrollment.instructorId)
//                 .get();

//               instructor = instructorDoc.exists
//                 ? instructorDoc.data()
//                 : null;
//             }

//             return {
//               ...enrollment,
//               instructor,
//               author: instructor?.title || "Unknown", // الربط هون
//             };
//           })
//         );

//         setEnrollments(enriched);
//       } catch (error) {
//         console.error('Error:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return { enrollments, loading };
// };

// export default useEnrollmentWithInstructor;