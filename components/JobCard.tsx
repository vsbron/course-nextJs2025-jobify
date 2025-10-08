import Link from "next/link";
import { MapPin, Briefcase, CalendarDays, RadioTower } from "lucide-react";

import { JobType } from "@/utils/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import DeleteJobBtn from "./DeleteJobBtn";
import JobInfo from "./JobInfo";

function JobCard({ job }: { job: JobType }) {
  // Destructure the props
  const { id, position, company } = job;

  // Returned JSX
  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{position}</CardTitle>
        <CardDescription>{company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent></CardContent>
      <CardFooter className="flex gap-4">
        <Button size="sm" asChild>
          <Link href={`/jobs/${id}`}>edit</Link>
        </Button>
        <DeleteJobBtn />
      </CardFooter>
    </Card>
  );
}

export default JobCard;
