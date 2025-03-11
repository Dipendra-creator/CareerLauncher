import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "./card";

interface LoadingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
}

export function LoadingCard({ className, lines = 3, ...props }: LoadingCardProps) {
  return (
    <Card
      className={cn("p-6 overflow-hidden", className)}
      {...props}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-xl bg-secondary animate-shimmer" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded-full bg-secondary animate-shimmer" />
          <div className="h-3 w-1/2 rounded-full bg-secondary animate-shimmer" />
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-3 rounded-full bg-secondary animate-shimmer"
            style={{
              width: `${Math.random() * 40 + 60}%`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    </Card>
  );
}