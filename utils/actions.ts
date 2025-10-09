"use server";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import dayjs from "dayjs";

import prisma from "./db";
import { JobType } from "./types";
import { CreateAndEditJobType, createAndEditJobSchema } from "./schemas";

// Validate the user id
function authenticateAndRedirect(): string {
  const { userId } = auth();
  // Guard clause
  if (!userId) {
    redirect("/");
  }
  return userId;
}

// Adding a job action function
export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const userId = authenticateAndRedirect();
  try {
    // Validate the values
    createAndEditJobSchema.parse(values);

    // Add the data to DB
    const job: JobType = await prisma.job.create({
      data: {
        ...values,
        clerkId: userId,
      },
    });
    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Type for getting all of the jobs
type GetAllJobsActionProps = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

// Getting all user's jobs
export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsActionProps): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  // Get the user ID
  const userId = authenticateAndRedirect();

  try {
    // Set up the where: clause
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };

    // If there's a search value, update the where: clause
    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          { position: { contains: search } },
          { company: { contains: search } },
        ],
      };
    }

    // Update where: clause if there's different job status filter
    if (jobStatus && jobStatus !== "all") {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }
    // Fetch the jobs from Prisma
    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Return the object
    return { jobs, count: 0, page: 1, totalPages: 0 };
  } catch (err) {
    console.error(err);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
}

// Deleting a job action function
export async function deleteJobAction(id: string): Promise<JobType | null> {
  // Get the user ID
  const userId = authenticateAndRedirect();

  try {
    // Delete the job based on IDs
    const job: JobType = await prisma.job.delete({
      where: {
        id,
        clerkId: userId,
      },
    });

    // Return the deleted job
    return job;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Edit a job action function
export async function getSingleJobAction(id: string): Promise<JobType | null> {
  // Initiate the job and get the user ID
  let job: JobType | null = null;
  const userId = authenticateAndRedirect();

  try {
    // Find the job
    job = await prisma.job.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });
  } catch (err) {
    job = null;
    console.log(err);
  }
  // Redirect if no job
  if (!job) {
    redirect("/jobs");
  }
  return job;
}

// Update job action function
export async function updateJobAction(
  id: string,
  values: CreateAndEditJobType
): Promise<JobType | null> {
  // Get the user ID
  const userId = authenticateAndRedirect();

  try {
    // Update the job
    const job: JobType = await prisma.job.update({
      where: {
        id,
        clerkId: userId,
      },
      data: {
        ...values,
      },
    });

    // Return the updated job
    return job;
  } catch (err) {
    console.log(err);
    return null;
  }
}
