import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentActivity() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 22q-3.425 0-5.712-2.35T4 13.8q0-1.55.7-3.1t1.75-2.975T8.725 5.05T11 2.875q.2-.2.463-.287T12 2.5t.538.088t.462.287q1.05.925 2.275 2.175t2.275 2.675T19.3 10.7t.7 3.1q0 3.5-2.287 5.85T12 22m0-2q2.6 0 4.3-1.763T18 13.8q0-1.825-1.513-4.125T12 4.65Q9.025 7.375 7.513 9.675T6 13.8q0 2.675 1.7 4.438T12 20m.275-1q.3-.025.513-.238T13 18.25q0-.35-.225-.562T12.2 17.5q-1.025.075-2.175-.562t-1.45-2.313q-.05-.275-.262-.45T7.825 14q-.35 0-.575.263t-.15.612q.425 2.275 2 3.25t3.175.875"
            ></path>
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M255.62 51.65a12 12 0 0 0-11.27-11.27c-53.27-3.13-96.2 13.36-114.84 44.14c-12.14 20-12.56 44.17-1.46 67.3a75.1 75.1 0 0 0-12.28 23l-12.66-12.66c7.19-16.77 6.43-34.11-2.4-48.69C86.73 90.36 54.89 78 15.55 80.27A12 12 0 0 0 4.28 91.55C2 130.89 14.36 162.73 37.45 176.71a49.76 49.76 0 0 0 26 7.27a57.5 57.5 0 0 0 22.7-4.87L112 205v23a12 12 0 0 0 24 0v-29.49a51.63 51.63 0 0 1 9.49-29.95a76.8 76.8 0 0 0 32.1 7.39a64.9 64.9 0 0 0 33.89-9.46c30.77-18.64 47.28-61.57 44.14-114.84M49.88 156.18c-13.19-8-21.18-27.46-21.83-52.13c24.67.65 44.14 8.64 52.13 21.83a26 26 0 0 1 3.63 17l-11.33-11.37a12 12 0 0 0-17 17l11.34 11.34a26.27 26.27 0 0 1-16.94-3.67M199.05 146c-10.66 6.45-23 7.67-35.81 3.76l37.25-37.24a12 12 0 0 0-17-17l-37.25 37.24C142.37 120 143.59 107.61 150 97c12.7-21 42.65-33 81.32-33h.68c.14 39-11.86 69.18-32.95 82"
            ></path>
          </svg>
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
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor">
              <path d="M5.636 5.636a1 1 0 0 0-1.414-1.414c-4.296 4.296-4.296 11.26 0 15.556a1 1 0 0 0 1.414-1.414a9 9 0 0 1 0-12.728zm14.142-1.414a1 1 0 1 0-1.414 1.414a9 9 0 0 1 0 12.728a1 1 0 1 0 1.414 1.414c4.296-4.296 4.296-11.26 0-15.556zM8.464 8.464A1 1 0 0 0 7.05 7.05a7 7 0 0 0 0 9.9a1 1 0 0 0 1.414-1.414a5 5 0 0 1 0-7.072zM16.95 7.05a1 1 0 1 0-1.414 1.414a5 5 0 0 1 0 7.072a1 1 0 0 0 1.414 1.414a7 7 0 0 0 0-9.9zM11 12a1 1 0 1 1 2 0a1 1 0 0 1-2 0zm1-3a3 3 0 1 0 0 6a3 3 0 0 0 0-6z"></path>
            </g>
          </svg>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            Attached New Module 3
          </p>
          <p className="text-sm text-muted-foreground">
            June 04, 2024 at 8:00 AM
          </p>
        </div>
        <div className="ml-auto font-medium">New Module Online</div>
      </div>
    </div>
  );
}
