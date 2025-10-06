import { AreaChart, Layers, AppWindow } from "lucide-react";

type NavLinks = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLinks[] = [
  { href: "/add-job", label: "Add job", icon: <Layers /> },
  { href: "/jobs", label: "All jobs", icon: <AppWindow /> },
  { href: "/stats", label: "Stats", icon: <AreaChart /> },
];

export default links;
