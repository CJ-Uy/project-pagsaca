import Link from "next/link"; // Import the Link component
import { Button } from "./ui/button";

const mainNavItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "My Plant Cells", path: "/plant-cells"}
];

export default function MainNav() {
  return (
    <div className="mr-4 hidden gap-2 md:flex">
      {mainNavItems.map((item, index) => (
        <Link key={index} href={item.path}>
          <Button key={index} variant="link">
            {item.label}
          </Button>
        </Link>
      ))}
    </div>
  );
}
