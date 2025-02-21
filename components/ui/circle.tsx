import type React from "react";
import { cn } from "@/lib/utils";

interface CircleProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Circle({ className, children, ...props }: CircleProps) {
  return (
    <div
      className={cn("rounded-full flex items-center justify-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}
