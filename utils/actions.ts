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

    // Set the skip step
    const skip = (page - 1) * limit;

    // Fetch the jobs from Prisma
    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Get the total jobs number
    const count: number = await prisma.job.count({
      where: whereClause,
    });
    const totalPages = Math.ceil(count / limit);

    // Return the object
    return { jobs, count: 0, page: 1, totalPages };
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

// Get stats action function
export async function getStatsAction(): Promise<{
  pending: number;
  interview: number;
  declined: number;
}> {
  // Get the user ID
  const userId = authenticateAndRedirect();

  try {
    // Get the stats from Prisma
    const stats = await prisma.job.groupBy({
      by: ["status"],
      _count: { status: true },
      where: { clerkId: userId },
    });

    // Reduce all into object
    const statsObject = stats.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {} as Record<string, number>);

    // Merge with default values
    const defaultStats = {
      pending: 0,
      declined: 0,
      interview: 0,
      ...statsObject,
    };
    // Return the stats
    return defaultStats;
  } catch (err) {
    console.log(err);
    redirect("/jobs");
  }
}

// Get the charts action function
export async function getChartsDataAction(): Promise<
  Array<{ date: string; count: number }>
> {
  // Get the user ID
  const userId = authenticateAndRedirect();

  // Set the date T minus 30 months
  const sixMonthsAgo = dayjs().subtract(30, "month").toDate();

  try {
    // Find all jobs withing the timeframe
    const jobs = await prisma.job.findMany({
      where: { clerkId: userId, createdAt: { gte: sixMonthsAgo } },
      orderBy: { createdAt: "asc" },
    });

    // Reduce all the jobs into one object
    const applicationsPerMonth = jobs.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format("MMM YY");
      const existingEntry = acc.find((entry) => entry.date === date);
      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({ date, count: 1 });
      }
      return acc;
    }, [] as Array<{ date: string; count: number }>);

    // Return the jobs
    return applicationsPerMonth;
  } catch (err) {
    console.log(err);
    redirect("/jobs");
  }
}
