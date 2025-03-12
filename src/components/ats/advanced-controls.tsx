"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Settings2, RefreshCw, HelpCircle, ChevronDown } from "lucide-react";
import { DEPARTMENT_PRESETS, DEFAULT_WEIGHTS, type CategoryWeights, type DepartmentPreset } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface AdvancedControlsProps {
  onWeightsChange: (weights: CategoryWeights) => void;
  className?: string;
}

export function AdvancedControls({ onWeightsChange, className }: AdvancedControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [weights, setWeights] = useState<CategoryWeights>(DEFAULT_WEIGHTS);
  const [selectedPreset, setSelectedPreset] = useState<DepartmentPreset | "">("");
  const [animatingCategory, setAnimatingCategory] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const animationFrameRef = useRef<number>(0);

  // Smooth transition helper function
  const smoothTransition = (
    startValues: CategoryWeights,
    endValues: CategoryWeights,
    duration: number = 600
  ) => {
    setIsTransitioning(true);
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const currentValues = { ...startValues };
      let hasChanged = false;

      Object.keys(startValues).forEach((key) => {
        const start = startValues[key as keyof CategoryWeights];
        const end = endValues[key as keyof CategoryWeights];
        const current = Math.round(start + (end - start) * easeOutQuart);

        if (currentValues[key as keyof CategoryWeights] !== current) {
          currentValues[key as keyof CategoryWeights] = current;
          hasChanged = true;
        }
      });

      if (hasChanged) {
        setWeights(currentValues);
        onWeightsChange(currentValues);
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setWeights(endValues);
        onWeightsChange(endValues);
        setIsTransitioning(false);
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleWeightChange = (category: keyof CategoryWeights, value: number) => {
    if (isTransitioning) return;

    const newWeights = { ...weights, [category]: value };
    setWeights(newWeights);
    onWeightsChange(newWeights);
    
    setAnimatingCategory(category);
    setTimeout(() => setAnimatingCategory(null), 500);
  };

  const handlePresetChange = (preset: DepartmentPreset) => {
    setSelectedPreset(preset);
    const newWeights = DEPARTMENT_PRESETS[preset];
    smoothTransition(weights, newWeights);
  };

  const resetToDefaults = () => {
    setSelectedPreset("");
    smoothTransition(weights, DEFAULT_WEIGHTS);
  };

  return (
    <Card 
      className={cn(
        "p-6 transition-all duration-300 hover:shadow-lg",
        isExpanded && "ring-1 ring-primary/20",
        className
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Settings2 className={cn(
              "h-5 w-5 text-primary transition-transform duration-300",
              isExpanded && "animate-spin-once"
            )} />
            <div className={cn(
              "absolute inset-0 bg-primary/20 rounded-full scale-110 opacity-0 transition-opacity duration-300",
              isExpanded && "animate-ping-once"
            )} />
          </div>
          <h2 className="text-xl font-semibold">Advanced Controls</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Adjust category weightings to customize how your ATS score is calculated</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "transition-transform duration-300 hover:bg-primary/10",
            isExpanded && "rotate-180"
          )}
        >
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-4 mb-6 animate-fade-in-up">
            <div className="flex-1 min-w-[200px]">
              <Select
                value={selectedPreset}
                onValueChange={(value) => handlePresetChange(value as DepartmentPreset)}
                disabled={isTransitioning}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a department preset" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(DEPARTMENT_PRESETS).map((preset) => (
                    <SelectItem key={preset} value={preset}>
                      {preset}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetToDefaults}
              className="shrink-0 group"
              disabled={isTransitioning}
            >
              <RefreshCw 
                className={cn(
                  "h-4 w-4 mr-2 transition-transform duration-300",
                  "group-hover:rotate-180",
                  isTransitioning && "animate-spin"
                )} 
              />
              Reset to Default
            </Button>
          </div>

          <div className="space-y-6">
            {Object.entries(weights).map(([category, value], index) => (
              <div 
                key={category} 
                className={cn(
                  "transform transition-all duration-300",
                  "animate-fade-in-up",
                  animatingCategory === category && "scale-105",
                  isTransitioning && "animate-pulse"
                )}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  transition: isTransitioning ? 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'all 0.3s ease'
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">{category}</label>
                  <span 
                    className={cn(
                      "text-sm transition-colors duration-300",
                      (animatingCategory === category || isTransitioning) ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {value}%
                  </span>
                </div>
                <Slider
                  value={[value]}
                  min={0}
                  max={100}
                  step={5}
                  disabled={isTransitioning}
                  className={cn(
                    "transition-all duration-300",
                    "[&_[role=slider]]:h-4 [&_[role=slider]]:w-4",
                    "[&_[role=slider]]:transition-all [&_[role=slider]]:duration-300",
                    "[&_[role=slider]]:hover:scale-110 [&_[role=slider]]:hover:ring-2 [&_[role=slider]]:hover:ring-primary/50",
                    animatingCategory === category && "[&_[role=slider]]:ring-2 [&_[role=slider]]:ring-primary",
                    isTransitioning && "opacity-50"
                  )}
                  onValueChange={([newValue]) => handleWeightChange(category as keyof CategoryWeights, newValue)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}