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
  const { id, position, company, createdAt, mode, location, status } = job;

  // Formatting the date
  const date = new Date(createdAt).toLocaleDateString();

  // Returned JSX
  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{position}</CardTitle>
        <CardDescription>{company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="grid grid-cols-2 gap-4">
        <JobInfo icon={<Briefcase />} text={mode} />
        <JobInfo icon={<MapPin />} text={location} />
        <JobInfo icon={<CalendarDays />} text={date} />
        <Badge className="w-32 justify-center text-white">
          <JobInfo icon={<RadioTower className="w-4 h-4" />} text={status} />
        </Badge>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button size="sm" asChild>
          <Link href={`/jobs/${id}`}>edit</Link>
        </Button>
        <DeleteJobBtn id={id} />
      </CardFooter>
    </Card>
  );
}

export default JobCard;
