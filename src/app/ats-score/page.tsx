"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { uploadResumeForATSScore, type ATSScoreResponse } from "@/lib/api/ats";
import { AdvancedControls } from "@/components/ats/advanced-controls";
import { DEFAULT_WEIGHTS, type CategoryWeights } from "@/lib/constants";
import {
  FileText,
  Upload,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Download,
  RefreshCw,
  Loader2
} from "lucide-react";

export default function ATSScorePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<ATSScoreResponse | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [weights, setWeights] = useState<CategoryWeights>(DEFAULT_WEIGHTS);
  const { toast } = useToast();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFile(file);
      await analyzeResume(file);
    }
  });

  const analyzeResume = async (file: File) => {
    setIsAnalyzing(true);
    try {
      const response = await uploadResumeForATSScore(file);
      setResults(response);
      toast({
        title: "Analysis Complete",
        description: "Your resume has been successfully analyzed.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  const calculateWeightedScore = (categoryScore: number, category: string): number => {
    const weight = weights[category as keyof CategoryWeights] / 100;
    return categoryScore * weight;
  };

  const calculateOverallScore = (): number => {
    if (!results) return 0;
    
    const scores = Object.entries(results.ats_score.category_scores).map(
      ([category, data]) => calculateWeightedScore(data.score, category)
    );
    
    return Math.round(scores.reduce((a, b) => a + b, 0) / Object.keys(weights).length);
  };

  if (isAnalyzing) {
    return (
      <main className="min-h-screen pt-20 pb-16">
        <div className="container px-4 max-w-4xl mx-auto">
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <Loader2 className="h-24 w-24 animate-spin text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Analyzing Your Resume</h2>
                <p className="text-muted-foreground">
                  Our AI is scanning your resume for ATS optimization...
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  if (!results) {
    return (
      <main className="min-h-screen pt-20 pb-16">
        <div className="container px-4 max-w-4xl mx-auto space-y-6">
          <Card className="p-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">ATS Score Analysis</h1>
              <p className="text-xl text-muted-foreground">
                Upload your resume to get detailed ATS optimization insights
              </p>
            </div>

            <div 
              {...getRootProps()} 
              className="relative group cursor-pointer"
            >
              <input {...getInputProps()} />
              <div className="border-2 border-dashed border-primary/50 rounded-xl p-12 text-center group-hover:border-primary transition-colors">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-medium mb-1">
                      {isDragActive
                        ? "Drop your resume here"
                        : "Drop your resume here or click to browse"
                      }
                    </p>
                    <p className="text-muted-foreground">
                      Supports PDF files up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <AdvancedControls onWeightsChange={setWeights} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="container px-4 max-w-4xl mx-auto space-y-6">
        {/* Overall Score */}
        <Card className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  strokeWidth="16"
                  className="stroke-primary/20"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  strokeWidth="16"
                  strokeDasharray={553}
                  strokeDashoffset={553 - (553 * calculateOverallScore()) / 100}
                  className="stroke-primary transition-all duration-1000 ease-out"
                  style={{ strokeLinecap: "round" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-5xl font-bold">{calculateOverallScore()}</span>
                  <span className="text-2xl text-muted-foreground">/100</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">ATS Score Analysis</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Your resume has been analyzed. Here's a detailed breakdown of your scores and suggestions for improvement.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => setFile(null)}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Analyze Another Resume
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <AdvancedControls onWeightsChange={setWeights} />

        {/* Categories */}
        <div className="space-y-4">
          {Object.entries(results.ats_score.category_scores).map(([category, data]) => (
            <Card
              key={category}
              className={`p-6 transition-all duration-200 ${
                expandedCategory === category ? "ring-2 ring-primary" : ""
              }`}
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{category}</h3>
                    <p className="text-muted-foreground">
                      Weighted Score: {Math.round(calculateWeightedScore(data.score, category))}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-2xl font-bold">{data.score}</span>
                    <span className="text-muted-foreground">/100</span>
                  </div>
                  {expandedCategory === category ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </div>

              {expandedCategory === category && (
                <div className="mt-6 pt-6 border-t border-border animate-slideDown">
                  {Object.entries(data.breakdown).map(([subcategory, details]) => (
                    <div key={subcategory} className="mb-6 last:mb-0">
                      <h4 className="font-medium mb-3">{subcategory}</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Score</span>
                          <span className="font-medium">{details.score}%</span>
                        </div>
                        <Progress value={details.score} className="h-2" />

                        {details.suggestion_keywords.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm font-medium mb-2">Suggested Keywords</p>
                            <div className="flex flex-wrap gap-2">
                              {details.suggestion_keywords.map((keyword) => (
                                <span
                                  key={keyword}
                                  className="px-3 py-1 rounded-full bg-warning-500/10 text-warning-500 text-sm"
                                >
                                  <AlertCircle className="inline-block h-4 w-4 mr-1" />
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}