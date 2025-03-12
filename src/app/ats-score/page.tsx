"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { uploadResumeForATSScore, type ATSScoreResponse, type ScoringWeights } from "@/lib/api/ats";
import {
  FileText,
  Upload,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Download,
  RefreshCw,
  Loader2,
  Settings,
  Sliders
} from "lucide-react";

const AVAILABLE_FIELDS = [
  "Data Science & Analytics",
  "Machine Learning & AI",
  "Web Development",
  "Mobile Development",
  "Cloud Computing & DevOps",
  "Database Technologies",
  "Programming Languages",
  "Software Engineering & Methodologies",
  "Operating Systems & Networking",
  "Cybersecurity",
  "Emerging Technologies"
];

export default function ATSScorePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<ATSScoreResponse | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [weights, setWeights] = useState<ScoringWeights>({});
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
      const response = await uploadResumeForATSScore(
        file,
        selectedFields.length > 0 ? selectedFields : undefined,
        isAdvancedMode ? weights : undefined
      );
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

  const handleFieldSelection = (field: string) => {
    setSelectedFields(prev => 
      prev.includes(field)
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  const handleWeightChange = (field: string, value: number) => {
    setWeights(prev => ({
      ...prev,
      [field]: value
    }));
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
        <div className="container px-4 max-w-4xl mx-auto">
          <Card className="p-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">ATS Score Analysis</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Upload your resume to get detailed ATS optimization insights
              </p>

              <div className="max-w-xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">Scoring Settings</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="advanced-mode">Advanced Mode</Label>
                    <Switch
                      id="advanced-mode"
                      checked={isAdvancedMode}
                      onCheckedChange={setIsAdvancedMode}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {AVAILABLE_FIELDS.map((field) => (
                      <div key={field} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                        <Switch
                          id={field}
                          checked={selectedFields.includes(field)}
                          onCheckedChange={() => handleFieldSelection(field)}
                        />
                        <Label htmlFor={field} className="flex-1 cursor-pointer">
                          {field}
                        </Label>
                        {isAdvancedMode && selectedFields.includes(field) && (
                          <div className="flex items-center gap-2 min-w-[120px]">
                            <Sliders className="h-4 w-4 text-muted-foreground" />
                            <Slider
                              defaultValue={[weights[field] || 1]}
                              min={0}
                              max={5}
                              step={0.5}
                              onValueChange={([value]) => handleWeightChange(field, value)}
                              className="w-24"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
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
            </div>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="container px-4 max-w-4xl mx-auto">
        {/* Overall Score */}
        <Card className="p-8 mb-8">
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
                  strokeDashoffset={553 - (553 * results.ats_score.overall_score) / 100}
                  className="stroke-primary transition-all duration-1000 ease-out"
                  style={{ strokeLinecap: "round" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-5xl font-bold">{results.ats_score.overall_score}</span>
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

        {/* Categories */}
        <div className="space-y-4">
          {Object.entries(results.ats_score.category_scores)
            .filter(([category]) => selectedFields.length === 0 || selectedFields.includes(category))
            .map(([category, data]) => (
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
                        Category Score: {data.score}%
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
