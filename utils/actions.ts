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
