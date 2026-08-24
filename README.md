# LearnFiesta

LearnFiesta is a collaborative mobile learning marketplace built with Expo and React Native. It brings student course discovery, enrollment, lesson progress, offline access, and instructor course-authoring workflows into one application backed by Firebase.

> **Team project:** The repository includes contributions from [shady-stu](https://github.com/shady-stu), [Qusai-Nazzal](https://github.com/Qusai-Nazzal), [salehowes12](https://github.com/salehowes12), and [MohammadAbulibdeh2](https://github.com/MohammadAbulibdeh2). Features below describe the shared project, not sole authorship.

## The Product

LearnFiesta supports two connected experiences:

- **Students** discover courses, bookmark and add them to a cart, complete a demo checkout/enrollment flow, follow lessons, and keep enrolled-course data available offline.
- **Instructors** view their courses and performance summary, create course foundations, build curricula with sections and lessons, attach resources and Q&A content, and publish courses.

## Features

- Email/password authentication with student and instructor roles
- Course discovery by recommendation, category, search, and filters
- Course details, curriculum, lessons, resources, and progress tracking
- Bookmarks and a Firebase-backed shopping cart
- Demo checkout that creates enrollments without a real payment gateway
- SQLite-backed offline enrollment/course cache
- Profile editing and avatar upload
- Instructor dashboard, course list, and multi-step course/curriculum builder
- Query caching and mutation state through TanStack Query
- Form validation with React Hook Form and Zod

Social-login and payment options visible in the interface are prototype UI only; Google, Apple, Facebook, card, and PayPal integrations are not implemented.

## Tech Stack

| Area | Technology |
| --- | --- |
| Mobile runtime | Expo 54, React Native 0.81, React 19 |
| Language | TypeScript with strict checking |
| Navigation | Expo Router |
| Backend services | Firebase Authentication, Firestore |
| Server-state management | TanStack Query |
| Forms and validation | React Hook Form, Zod |
| Offline/local data | Expo SQLite, AsyncStorage, SecureStore |
| Media | Expo Image Picker, Image Manipulator, Cloudinary upload |
| Testing | Jest, React Native Testing Library |

## Architecture and Project Structure

The runnable Expo project lives in the nested `LearnFiesta/` directory.

```text
LearnFiesta/
  app/                    File-based routes for auth, learning, and instructor flows
  components/             Shared UI and feature components
  hooks/                  Feature state and data-access hooks
  api/services/           Firebase-backed service modules
  domain/                 Curriculum schemas and validators
  db/                     SQLite offline-course cache
  lib/                    Shared query client
  types/                  Domain types
  utils/                  Validation, formatting, and navigation helpers
  assets/                 Icons and application images
```

The route layer composes feature components and hooks. Hooks coordinate TanStack Query and the service modules, while Firebase stores online application data and SQLite retains the offline course snapshot.

## My Contributions

Shady's repository history includes work on:

- Initial course-creation UI and its refactor into focused hooks and components
- Cloudinary image upload support
- Lesson pages and learning navigation
- Cart and instructor-flow improvements
- Real-time recommended-course fetching
- Project-structure cleanup and separation of feature responsibilities

## Getting Started

### Prerequisites

- Node.js and npm
- Expo-compatible Android/iOS tooling or Expo Go
- A Firebase project with Authentication and Firestore configured

### Install

```bash
git clone https://github.com/shady-stu/learnFiesta-moblie-app.git
cd learnFiesta-moblie-app/LearnFiesta
npm ci
```

### Environment

The repository does not currently include an `.env.example`. Create `LearnFiesta/.env` locally and do not commit it:

```dotenv
EXPO_PUBLIC_FIREBASE_API_KEY=<firebase_api_key>
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=<firebase_auth_domain>
EXPO_PUBLIC_FIREBASE_PROJECT_ID=<firebase_project_id>
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=<firebase_storage_bucket>
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<firebase_sender_id>
EXPO_PUBLIC_FIREBASE_APP_ID=<firebase_app_id>
```

Firebase rules and seed data must match the collections expected by the service modules. Cloudinary configuration is currently defined in the upload code rather than documented environment variables.

### Run

```bash
# Start Expo and choose a target
npm start

# Native development builds
npm run android
npm run ios

# Web development target
npm run web
```

Native iOS builds require macOS and Xcode.

`npm run start:offline` uses Windows `set` syntax and is intended for a Windows shell.

## Verification

```bash
npm run lint
npm test -- --runInBand
```

The current automated suite contains one React Native Testing Library component test for `StatsCard`. It verifies completed-course and learned-hours output; it is not comprehensive feature coverage.

## Current Limitations and Next Steps

- A configured Firebase project, compatible rules, and expected seed data are required.
- Checkout records an enrollment but does not process real payments.
- Social-login buttons are interface prototypes only.
- Automated coverage currently consists of one component test; add service, hook, integration, and E2E coverage.
- Move Cloudinary settings into documented application configuration.
- Review and resolve the current dependency audit findings before treating the app as production-ready.
- Add a sanitized environment template and emulator-backed local development workflow.

