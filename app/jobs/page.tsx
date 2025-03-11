"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Search,
  MapPin,
  Building2,
  Briefcase,
  Clock,
  DollarSign,
  Filter,
  ChevronDown,
  BookmarkPlus
} from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Software Engineer Intern",
    company: "Google",
    location: "Mountain View, CA",
    type: "Internship",
    salary: "$45-55/hr",
    posted: "2 days ago",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png",
    description: "Join our team to work on cutting-edge technology projects..."
  },
  {
    id: 2,
    title: "Product Manager",
    company: "Microsoft",
    location: "Redmond, WA",
    type: "Full-time",
    salary: "$120-150K/year",
    posted: "1 week ago",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
    description: "Lead product development initiatives in our cloud division..."
  },
  {
    id: 3,
    title: "UX Designer",
    company: "Apple",
    location: "Cupertino, CA",
    type: "Full-time",
    salary: "$100-130K/year",
    posted: "3 days ago",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
    description: "Design beautiful and intuitive user experiences..."
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "Meta",
    location: "Menlo Park, CA",
    type: "Full-time",
    salary: "$130-160K/year",
    posted: "5 days ago",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2048px-Meta_Platforms_Inc._logo.svg.png",
    description: "Work with large-scale data to derive meaningful insights..."
  }
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="container px-4 mx-auto max-w-6xl animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="text-xl text-muted-foreground">
            Discover opportunities at top companies worldwide
          </p>
        </div>

        {/* Search Bar */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Job title, company, or keyword"
                className="w-full h-12 pl-10 pr-4 rounded-lg bg-secondary border border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Location"
                className="w-full h-12 pl-10 pr-4 rounded-lg bg-secondary border border-border"
              />
            </div>
            <Button size="lg" className="h-12 px-8">
              Search Jobs
            </Button>
          </div>
        </Card>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Button variant="outline">
            Job Type
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline">
            Experience Level
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline">
            Salary Range
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline">
            Company Size
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline">
            Industry
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="ml-auto">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <Card key={job.id} className="p-6">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center">
                  <img src={job.logo} alt={job.company} className="h-8 w-8 object-contain" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <Button variant="ghost" size="icon">
                      <BookmarkPlus className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-1" />
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {job.type}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.salary}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.posted}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>
      </div>
    </main>
  );
}