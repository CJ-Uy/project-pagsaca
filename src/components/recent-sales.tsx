import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>W</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            Watering of Module 1
          </p>
          <p className="text-sm text-muted-foreground">
            June 05, 2024 at 3:00 PM
          </p>
        </div>
        <div className="ml-auto font-medium">No Issues</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>F</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            Fertilized Module 2
          </p>
          <p className="text-sm text-muted-foreground">
            June 04, 2024 at 1:00 PM
          </p>
        </div>
        <div className="ml-auto font-medium">1 Warning</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Attached New Module 3</p>
          <p className="text-sm text-muted-foreground">
            June 04, 2024 at 8:00 AM
          </p>
        </div>
        <div className="ml-auto font-medium">New Module Online</div>
      </div>
    </div>
  );
}
