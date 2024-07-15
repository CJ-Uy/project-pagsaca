"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu as MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainNavItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "My Plant Cells", path: "/plant-cells" },
];
export default function MobileNav() {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* This button will trigger open the mobile sheet menu */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <div className="flex flex-col items-start">
          {mainNavItems.map((item, index) => (
            <Link key={index} href={item.path}>
              <Button
                key={index}
                variant="link"
                className={
                  isActive(item.path)
                    ? "text-green-500 font-bold text-2xl pt-10"
                    : "font-bold text-2xl pt-10"
                }
                onClick={() => {
                  setOpen(false);
                }}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
