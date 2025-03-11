import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputWithAnimation = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    React.useEffect(() => {
      setHasValue(Boolean(props.value || props.defaultValue));
    }, [props.value, props.defaultValue]);

    return (
      <div className="relative">
        {label && (
          <label
            className={cn(
              "absolute left-3 transition-all duration-200 pointer-events-none",
              isFocused || hasValue
                ? "-translate-y-6 scale-75 text-primary"
                : "translate-y-2 text-muted-foreground"
            )}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-xl border bg-background px-3 py-2 text-sm transition-all duration-200",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            label && "pt-4",
            error && "border-error-500 focus-visible:ring-error-500",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(Boolean(e.target.value));
          }}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error-500 animate-slideDown">{error}</p>
        )}
      </div>
    );
  }
);

InputWithAnimation.displayName = "InputWithAnimation";

export { InputWithAnimation };