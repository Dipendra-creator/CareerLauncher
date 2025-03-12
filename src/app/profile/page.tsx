import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Star,
  MapPin,
  Mail,
  Link as LinkIcon,
  Edit,
  Plus
} from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="container px-4 mx-auto max-w-6xl animate-fade-in-up">
        {/* Header Section */}
        <div className="relative mb-8">
          <div className="h-48 w-full rounded-xl bg-gradient-to-r from-primary/20 to-primary/5" />
          <div className="absolute bottom-0 translate-y-1/2 left-8 flex items-end gap-6">
            <div className="h-24 w-24 rounded-xl bg-secondary border-4 border-background overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mb-2">
              <h1 className="text-2xl font-bold">Sarah Anderson</h1>
              <p className="text-muted-foreground">Computer Science Student @ Stanford University</p>
            </div>
          </div>
          <Button className="absolute bottom-0 right-8 translate-y-1/2">
            <Edit className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* About */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-muted-foreground">
                Passionate computer science student with a focus on AI and machine learning. 
                Looking for internship opportunities to apply my skills in real-world projects.
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  San Francisco Bay Area
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  sarah.anderson@stanford.edu
                </div>
                <div className="flex items-center text-muted-foreground">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  github.com/sarahanderson
                </div>
              </div>
            </Card>

            {/* Skills */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Skills</h2>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              {[
                { name: "Python", level: 90 },
                { name: "Machine Learning", level: 75 },
                { name: "React", level: 85 },
                { name: "Node.js", level: 70 },
              ].map((skill) => (
                <div key={skill.name} className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span>{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </Card>

            {/* Certifications */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Certifications</h2>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              {[
                { name: "AWS Certified Cloud Practitioner", date: "2023" },
                { name: "Google Data Analytics", date: "2023" },
                { name: "Meta Frontend Development", date: "2022" },
              ].map((cert) => (
                <div key={cert.name} className="flex items-start gap-3 mb-4">
                  <Award className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.date}</p>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Education */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Education</h2>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Stanford University</h3>
                    <p className="text-muted-foreground">BS in Computer Science</p>
                    <p className="text-sm text-muted-foreground">2021 - Present • 3.9 GPA</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Experience */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Experience</h2>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              <div className="space-y-6">
                {[
                  {
                    role: "Software Engineering Intern",
                    company: "Tech Corp",
                    period: "Jun 2023 - Sep 2023",
                    description: "Developed and maintained web applications using React and Node.js. Implemented new features and improved application performance."
                  },
                  {
                    role: "Research Assistant",
                    company: "Stanford AI Lab",
                    period: "Jan 2023 - Present",
                    description: "Conducting research on machine learning algorithms for computer vision applications. Published 2 papers in international conferences."
                  }
                ].map((exp) => (
                  <div key={exp.role} className="flex gap-4">
                    <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{exp.role}</h3>
                      <p className="text-primary">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.period}</p>
                      <p className="mt-2 text-muted-foreground">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Projects */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Projects</h2>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              <div className="space-y-6">
                {[
                  {
                    name: "AI Image Recognition App",
                    tech: "Python, TensorFlow, React",
                    description: "Developed a web application that uses deep learning to classify images with 95% accuracy."
                  },
                  {
                    name: "Social Network Analysis Tool",
                    tech: "Python, NetworkX, D3.js",
                    description: "Built a tool to analyze and visualize social network graphs, used by 500+ researchers."
                  }
                ].map((project) => (
                  <div key={project.name} className="flex gap-4">
                    <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{project.name}</h3>
                      <p className="text-sm text-primary">{project.tech}</p>
                      <p className="mt-2 text-muted-foreground">{project.description}</p>
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