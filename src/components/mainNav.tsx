"use client";

import Link from "next/link"; // Import the Link component
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const mainNavItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "My Plant Cells", path: "/plant-cells" },
];

export default function MainNav() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  return (
    <div className="mr-4 hidden gap-2 md:flex">
      {mainNavItems.map((item, index) => (
        <Link key={index} href={item.path}>
          <Button
            key={index}
            variant="link"
            className={isActive(item.path) ? "text-green-500" : ""}
          >
            {item.label}
          </Button>
        </Link>
      ))}
    </div>
  );
}
