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
