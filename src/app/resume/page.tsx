"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  Share2,
  Eye,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Plus
} from "lucide-react";

export default function ResumePage() {
  const [atsScore, setAtsScore] = useState(85);

  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="container px-4 mx-auto max-w-6xl animate-fade-in-up">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Resume Builder</h1>
            <p className="text-muted-foreground">Create and optimize your resume for ATS systems</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Version
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="formatting">Formatting</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                </TabsList>

                <TabsContent value="content">
                  <div className="space-y-6">
                    {/* Personal Info */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Full Name</label>
                          <input
                            type="text"
                            className="w-full h-10 px-3 rounded-md bg-secondary border border-border"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <input
                            type="email"
                            className="w-full h-10 px-3 rounded-md bg-secondary border border-border"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Phone</label>
                          <input
                            type="tel"
                            className="w-full h-10 px-3 rounded-md bg-secondary border border-border"
                            placeholder="(555) 555-5555"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Location</label>
                          <input
                            type="text"
                            className="w-full h-10 px-3 rounded-md bg-secondary border border-border"
                            placeholder="City, State"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Professional Summary</h2>
                      <textarea
                        className="w-full h-32 p-3 rounded-md bg-secondary border border-border"
                        placeholder="Write a compelling professional summary..."
                      />
                    </div>

                    {/* Experience */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Work Experience</h2>
                        <Button variant="outline" size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Experience
                        </Button>
                      </div>
                      <Card className="p-4 mb-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Company</label>
                            <input
                              type="text"
                              className="w-full h-10 px-3 rounded-md bg-secondary border border-border"
                              placeholder="Company Name"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Position</label>
                            <input
                              type="text"
                              className="w-full h-10 px-3 rounded-md bg-secondary border border-border"
                              placeholder="Job Title"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Description</label>
                          <textarea
                            className="w-full h-32 p-3 rounded-md bg-secondary border border-border"
                            placeholder="Describe your responsibilities and achievements..."
                          />
                        </div>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="formatting">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Layout Options</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="p-4 cursor-pointer border-primary">
                          <div className="h-32 bg-secondary rounded-md mb-2" />
                          <p className="text-center font-medium">Classic</p>
                        </Card>
                        <Card className="p-4 cursor-pointer">
                          <div className="h-32 bg-secondary rounded-md mb-2" />
                          <p className="text-center font-medium">Modern</p>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold mb-4">Typography</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Font Family</label>
                          <select className="w-full h-10 px-3 rounded-md bg-secondary border border-border mt-2">
                            <option>Inter</option>
                            <option>Roboto</option>
                            <option>Open Sans</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Font Size</label>
                          <select className="w-full h-10 px-3 rounded-md bg-secondary border border-border mt-2">
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="templates">
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((template) => (
                      <Card key={template} className="p-4 cursor-pointer">
                        <div className="h-48 bg-secondary rounded-md mb-2" />
                        <h3 className="font-medium">Template {template}</h3>
                        <p className="text-sm text-muted-foreground">Professional template for tech roles</p>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* ATS Score */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">ATS Score</h2>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-primary/20 mb-2">
                  <span className="text-2xl font-bold text-primary">{atsScore}%</span>
                </div>
                <p className="text-muted-foreground">Your resume is ATS-friendly</p>
              </div>
              <Progress value={atsScore} className="h-2 mb-4" />
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Proper keyword usage</span>
                </div>
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Clear section headings</span>
                </div>
                <div className="flex items-center text-sm">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                  <span>Add more quantifiable achievements</span>
                </div>
              </div>
            </Card>

            {/* Keyword Optimization */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Keyword Optimization</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Python</span>
                  <span className="text-primary">4 mentions</span>
                </div>
                <Progress value={80} className="h-2" />
                <div className="flex items-center justify-between">
                  <span>React</span>
                  <span className="text-primary">3 mentions</span>
                </div>
                <Progress value={60} className="h-2" />
                <div className="flex items-center justify-between">
                  <span>Machine Learning</span>
                  <span className="text-yellow-500">1 mention</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
              <Button variant="outline" className="w-full mt-4">
                Suggest More Keywords
              </Button>
            </Card>

            {/* Tips */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Resume Tips</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary">
                  <h3 className="font-medium mb-2">Use Action Verbs</h3>
                  <p className="text-sm text-muted-foreground">
                    Start bullet points with strong action verbs like "developed," "implemented," or "led."
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary">
                  <h3 className="font-medium mb-2">Quantify Achievements</h3>
                  <p className="text-sm text-muted-foreground">
                    Include specific metrics and numbers to demonstrate your impact.
                  </p>
                </div>
                <Button variant="link" className="w-full">
                  View All Tips
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}