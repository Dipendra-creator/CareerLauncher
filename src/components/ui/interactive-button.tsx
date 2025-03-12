import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-600 active:bg-primary-700",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-secondary hover:text-secondary-foreground",
        ghost: "hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  ripple?: boolean;
}

const InteractiveButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ripple = true, children, ...props }, ref) => {
    const [rippleStyle, setRippleStyle] = React.useState<React.CSSProperties>({});
    const [isRippling, setIsRippling] = React.useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ripple) return;

      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      setRippleStyle({
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}px`,
        top: `${y}px`,
      });

      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 500);
    };

    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          "overflow-hidden transform hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
        )}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
        {ripple && isRippling && (
          <span
            className="absolute rounded-full bg-white/20 animate-ripple pointer-events-none"
            style={rippleStyle}
          />
        )}
      </button>
    );
  }
);

InteractiveButton.displayName = "InteractiveButton";

export { InteractiveButton, buttonVariants };