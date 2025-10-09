# Jobify

Jobify is a job application tracking system built with modern technologies, providing a platform for managing and tracking job applications. Users can add, edit, search, and delete jobs, track status and mode, and get a clear overview of their applications.

---

## Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Page Descriptions](#page-descriptions)
   - [Index / Jobs Page](#index--jobs-page)
   - [Add Job Page](#add-job-page)
   - [Edit Job Page](#edit-job-page)
4. [Technical Details](#technical-details)
5. [Live Version](#live-version)

---

## Project Overview

Jobify helps job hunters keep track of their applications efficiently. It includes:

- **Core Components**: Responsive layout with sidebar navigation, header with theme toggle and user account management.
- **Job Management**: Users can add new jobs, edit existing jobs, and delete completed or irrelevant applications.
- **Search & Filters**: Quickly filter jobs by status, mode, or search terms.
- **Modern UI/UX**: Clean, responsive design using Tailwind CSS and ShadCN components.
- **Data Handling**: Efficient data fetching and caching using React Query.
- **Authentication**: Secure user authentication with Clerk.

---

## Features

- **Add / Edit Jobs**: Create or update job applications with status and mode.
- **Delete Jobs**: Remove jobs that are no longer relevant.
- **Search & Filters**: Filter jobs by search terms, and job mode (full-time, remote, etc.).
- **React Query Caching**: Optimized client-side data fetching with automatic cache updates.
- **User Authentication**: Each user’s data is isolated via Clerk authentication.
- **Theme Toggle**: Switch between light, dark, or system themes.
- **Responsive Design**: Works on mobile, tablet, and desktop devices.

---

## Page Descriptions

### **Index / Jobs Page**

- Displays all jobs for the logged-in user.
- Supports search and status/mode filters.
- Includes buttons for editing or deleting jobs.
- Responsive layout with sidebar navigation and header.

### **Add Job Page**

- Form for creating a new job application.
- Validates fields using React Hook Form + Zod.
- Status and mode selectors for each job.

### **Edit Job Page**

- Form pre-filled with existing job data.
- Update job information including position, company, location, status, and mode.
- Save changes or navigate back to the jobs list.

---

## Technical Details

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + ShadCN UI components
- **Database**: Render.com + Prisma ORM
- **Authentication**: Clerk
- **Form Handling & Validation**: React Hook Form + Zod
- **Data Fetching & Caching**: React Query
- **Routing**: Next.js App Router (server + client components)

---

## Live Version

https://course-next-js2025-jobify.vercel.app/
