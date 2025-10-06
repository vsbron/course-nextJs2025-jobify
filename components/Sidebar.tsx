"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Button } from "./ui/button";

import links from "@/utils/links";
import Logo from "@/assets/logo.svg";

function Sidebar() {
  // Get the current path
  const pathname = usePathname();

  // Returned JSX
  return (
    <aside className="h-full py-4 px-8 bg-muted">
      <Image src={Logo} alt="Jobify" className="mx-auto" />
      <div className="flex flex-col mt-20 gap-y-4">
        {links.map(({ href, label, icon }) => (
          <Button
            key={href}
            variant={pathname === href ? "default" : "link"}
            asChild
          >
            <Link href={href} className="flex items-center gap-x-2">
              {icon}
              <span className="capitalize">{label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
