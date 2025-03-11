import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Briefcase, LineChart, Users, Search, Building2, GraduationCap, Trophy } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),rgba(0,0,0,0))]" />
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80"
            alt="Students collaborating"
            className="w-full h-full object-cover opacity-10 scale-105 animate-subtle-zoom"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div 
            className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-primary">🎓 Built for ambitious students</span>
          </div>
          
          <h1 
            className="text-5xl md:text-7xl font-bold mb-6 gradient-text animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Launch Your Career <br /> With Confidence
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            Connect with leading companies, access exclusive internships, and build your professional network.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-purple-600/50 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for jobs, internships..."
                  className="h-12 pl-10 pr-4 rounded-lg bg-card/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none w-full sm:w-80 transition-all duration-300"
                />
              </div>
            </div>
            <Button size="lg" className="text-lg px-8 h-12 relative group overflow-hidden">
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="relative z-10 ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide the tools and connections you need to kickstart your career journey
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="glass-card p-8 space-y-4 hover:border-primary/50 transition-colors">
            <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center">
              <Briefcase className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Premium Opportunities</h3>
            <p className="text-muted-foreground">
              Access exclusive internships and entry-level positions from top-tier companies and innovative startups.
            </p>
          </Card>

          <Card className="glass-card p-8 space-y-4 hover:border-primary/50 transition-colors">
            <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Mentorship Network</h3>
            <p className="text-muted-foreground">
              Connect with industry professionals and get guidance from experienced mentors in your field.
            </p>
          </Card>

          <Card className="glass-card p-8 space-y-4 hover:border-primary/50 transition-colors">
            <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center">
              <LineChart className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Skill Development</h3>
            <p className="text-muted-foreground">
              Access resources and tools to develop in-demand skills and track your career progress.
            </p>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            <div className="p-6 rounded-lg hover:bg-primary/5 transition-colors">
              <h3 className="text-4xl font-bold gradient-text mb-2">10K+</h3>
              <p className="text-muted-foreground">Active Opportunities</p>
            </div>
            <div className="p-6 rounded-lg hover:bg-primary/5 transition-colors">
              <h3 className="text-4xl font-bold gradient-text mb-2">5M+</h3>
              <p className="text-muted-foreground">Student Users</p>
            </div>
            <div className="p-6 rounded-lg hover:bg-primary/5 transition-colors">
              <h3 className="text-4xl font-bold gradient-text mb-2">2K+</h3>
              <p className="text-muted-foreground">Partner Companies</p>
            </div>
            <div className="p-6 rounded-lg hover:bg-primary/5 transition-colors">
              <h3 className="text-4xl font-bold gradient-text mb-2">95%</h3>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore opportunities across various industries and roles
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Building2, title: "Business", count: "2,305" },
            { icon: LineChart, title: "Marketing", count: "1,832" },
            { icon: GraduationCap, title: "Engineering", count: "3,154" },
            { icon: Trophy, title: "Design", count: "1,408" },
            { icon: Users, title: "HR", count: "952" },
            { icon: Briefcase, title: "Finance", count: "1,729" },
          ].map((category, index) => (
            <button
              key={index}
              className="glass-card p-6 flex items-center gap-4 hover:border-primary/50 transition-colors text-left"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <category.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{category.title}</h3>
                <p className="text-muted-foreground">{category.count} opportunities</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of students who have already found their dream opportunities through our platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Sign Up Now
            </Button>
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}