"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Clock,
  Building2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Filter,
  Plus,
  ChevronRight,
  CalendarCheck, // Add this
  Trophy, // Add this
  type LucideIcon // Add this type import
} from "lucide-react";

const applications : any = [
  {
    id: 1,
    company: "Google",
    position: "Software Engineer Intern",
    location: "Mountain View, CA",
    status: "interview",
    stage: "Technical Interview",
    date: "2024-02-15",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
  },
  {
    id: 2,
    company: "Microsoft",
    position: "Product Manager Intern",
    location: "Redmond, WA",
    status: "applied",
    stage: "Application Review",
    date: "2024-02-10",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png"
  },
  {
    id: 3,
    company: "Apple",
    position: "Machine Learning Engineer",
    location: "Cupertino, CA",
    status: "rejected",
    stage: "Final Round",
    date: "2024-02-05",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png"
  },
  {
    id: 4,
    company: "Meta",
    position: "Frontend Engineer",
    location: "Menlo Park, CA",
    status: "offered",
    stage: "Offer Extended",
    date: "2024-02-01",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2048px-Meta_Platforms_Inc._logo.svg.png"
  }
];

const statusColors: any = {
  applied: "text-blue-500",
  interview: "text-yellow-500",
  offered: "text-green-500",
  rejected: "text-red-500"
};

// Add this type definition at the top of your file
type ApplicationStatus = 'applied' | 'interview' | 'offered' | 'rejected';

// Make sure your application interface includes the correct status type
interface Application {
  id: number;
  company: string;
  position: string;
  location: string;
  status: ApplicationStatus;
  stage: string;
  date: string;
  logo: string;
}

// Type your statusIcons object
// The statusIcons definition will now work correctly
const statusIcons: any = {
  applied: CheckCircle2,
  interview: CalendarCheck,
  offered: Trophy,
  rejected: XCircle
};

export default function ApplicationsPage() {
  const [filter, setFilter] = useState("all");

  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="container px-4 mx-auto max-w-6xl animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Application Tracker</h1>
            <p className="text-muted-foreground">Track and manage your job applications</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Application
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Total Applications</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">24</span>
              <Building2 className="h-8 w-8 text-primary opacity-50" />
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Interviews</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">8</span>
              <Calendar className="h-8 w-8 text-yellow-500 opacity-50" />
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Offers</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">3</span>
              <CheckCircle2 className="h-8 w-8 text-green-500 opacity-50" />
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Response Rate</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">45%</span>
              <Progress value={45} className="w-16 h-2" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All Applications
          </Button>
          <Button
            variant={filter === "active" ? "default" : "outline"}
            onClick={() => setFilter("active")}
          >
            Active
          </Button>
          <Button
            variant={filter === "archived" ? "default" : "outline"}
            onClick={() => setFilter("archived")}
          >
            Archived
          </Button>
          <Button variant="outline" className="ml-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {applications.map((application: any) => {
            // Now this line will work without type errors
            const StatusIcon = statusIcons[application.status];
            return (
              <Card key={application.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center">
                    <img
                      src={application.logo}
                      alt={application.company}
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold">{application.position}</h3>
                        <p className="text-muted-foreground">{application.company}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {application.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {application.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`h-4 w-4 ${statusColors[application.status]}`} />
                        <span className={`text-sm ${statusColors[application.status]}`}>
                          {application.stage}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}