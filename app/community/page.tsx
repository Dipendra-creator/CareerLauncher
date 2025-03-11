"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MessageSquare,
  Users,
  ThumbsUp,
  Share2,
  BookmarkPlus,
  Search,
  Plus,
  Filter
} from "lucide-react";

const discussions = [
  {
    id: 1,
    title: "Tips for acing technical interviews at FAANG companies",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    },
    category: "Interview Prep",
    replies: 24,
    likes: 156,
    timeAgo: "2 hours ago"
  },
  {
    id: 2,
    title: "What skills are most in-demand for entry-level software engineers?",
    author: {
      name: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
    },
    category: "Career Advice",
    replies: 18,
    likes: 92,
    timeAgo: "5 hours ago"
  },
  {
    id: 3,
    title: "Negotiating your first tech job offer - what you need to know",
    author: {
      name: "Emily Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
    },
    category: "Salary & Benefits",
    replies: 31,
    likes: 203,
    timeAgo: "1 day ago"
  }
];

const popularTags = [
  "Interview Prep",
  "Career Advice",
  "Resume Tips",
  "Tech Skills",
  "Networking",
  "Work-Life Balance",
  "Job Search",
  "Mentorship"
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("trending");

  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="container px-4 mx-auto max-w-6xl animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
            <p className="text-muted-foreground">Connect, learn, and grow with fellow professionals</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Discussion
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Search */}
            <Card className="p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  className="w-full h-12 pl-10 pr-4 rounded-lg bg-secondary border border-border"
                />
              </div>
            </Card>

            {/* Tabs */}
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant={activeTab === "trending" ? "default" : "outline"}
                onClick={() => setActiveTab("trending")}
              >
                Trending
              </Button>
              <Button
                variant={activeTab === "latest" ? "default" : "outline"}
                onClick={() => setActiveTab("latest")}
              >
                Latest
              </Button>
              <Button
                variant={activeTab === "top" ? "default" : "outline"}
                onClick={() => setActiveTab("top")}
              >
                Top
              </Button>
              <Button variant="outline" className="ml-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            {/* Discussions */}
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={discussion.author.avatar}
                      alt={discussion.author.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{discussion.title}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                          {discussion.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span>{discussion.author.name}</span>
                        <span>•</span>
                        <span>{discussion.timeAgo}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          {discussion.replies} Replies
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          {discussion.likes} Likes
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Button variant="ghost" size="sm">
                          <BookmarkPlus className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Community Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-secondary">
                  <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold mb-1">15.2K</div>
                  <div className="text-sm text-muted-foreground">Members</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary">
                  <MessageSquare className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold mb-1">8.5K</div>
                  <div className="text-sm text-muted-foreground">Discussions</div>
                </div>
              </div>
            </Card>

            {/* Popular Tags */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Popular Tags</h2>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Button key={tag} variant="outline" size="sm">
                    {tag}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Top Contributors */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Top Contributors</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img
                      src={`https://images.unsplash.com/photo-${1507003211169 + i}?auto=format&fit=crop&q=80`}
                      alt={`Contributor ${i}`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">John Doe</div>
                      <div className="text-sm text-muted-foreground">
                        {150 - i * 20} contributions
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}