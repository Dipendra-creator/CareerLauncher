"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/auth/auth-dialog";
import { useAuth } from "@/lib/auth";
import { 
  User, 
  FileText, 
  Briefcase, 
  ListTodo, 
  Users,
  Bell,
  Search,
  Menu,
  X,
  Target,
  ChevronDown,
  LogOut
} from "lucide-react";

const navigation = [
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    name: "Career Tools",
    icon: FileText,
    items: [
      { name: "Resume Builder", href: "/resume", icon: FileText },
      { name: "ATS Score Calculator", href: "/ats-score", icon: Target },
    ],
  },
  {
    name: "Job Search",
    icon: Briefcase,
    items: [
      { name: "Job Listings", href: "/jobs", icon: Briefcase },
      { name: "Application Tracker", href: "/applications", icon: ListTodo },
    ],
  },
  {
    name: "Community",
    href: "/community",
    icon: Users,
  },
];

export function MainNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (href: string) => pathname === href;
  const isActiveGroup = (items: any[]) => items?.some(item => pathname === item.href);

  const handleSignInClick = () => {
    setShowAuthDialog(true);
    setIsOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    setIsOpen(false);
  };

  return (
    <>
      <nav className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-300",
        isScrolled ? "top-2" : "top-4"
      )}>
        <div className={cn(
          "relative px-4 py-3 backdrop-blur-md border border-border/50 rounded-2xl shadow-lg transition-all duration-300",
          isScrolled ? "bg-card/40" : "bg-card/20"
        )}>
          <div className="flex items-center justify-between">
            <Link href="/" className="relative z-10">
              <h1 className="text-xl font-bold gradient-text">CareerLaunch</h1>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 mr-auto ml-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                
                if (item.items) {
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => setHoveredGroup(item.name)}
                      onMouseLeave={() => setHoveredGroup(null)}
                    >
                      <button
                        className={cn(
                          "flex items-center space-x-2 text-sm transition-all duration-200",
                          isActiveGroup(item.items)
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                      </button>
                      
                      {hoveredGroup === item.name && (
                        <div className="absolute top-full left-0 pt-2 w-48">
                          <div className="bg-card/95 backdrop-blur-md border border-border/50 rounded-xl shadow-lg p-2 animate-slideDown">
                            {item.items.map((subItem) => {
                              const SubIcon = subItem.icon;
                              return (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className={cn(
                                    "flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors",
                                    isActiveLink(subItem.href)
                                      ? "bg-primary/10 text-primary"
                                      : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                                  )}
                                >
                                  <SubIcon className="h-4 w-4" />
                                  <span>{subItem.name}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href!}
                    className={cn(
                      "flex items-center space-x-2 text-sm transition-all duration-200 hover:text-primary",
                      isActiveLink(item.href!)
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary" />
              </Button>
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              {isAuthenticated ? (
                <Button variant="outline" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <Button onClick={handleSignInClick}>Sign In</Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mounted && (
            <div
              className={cn(
                "absolute top-full left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border/50 rounded-b-2xl p-4 space-y-4 md:hidden transition-all duration-200 ease-in-out",
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
              )}
            >
              {navigation.map((item) => {
                const Icon = item.icon;

                if (item.items) {
                  return (
                    <div key={item.name} className="space-y-2">
                      <div className="flex items-center px-2 text-sm font-medium text-muted-foreground">
                        <Icon className="h-4 w-4 mr-2" />
                        {item.name}
                      </div>
                      <div className="pl-6 space-y-1">
                        {item.items.map((subItem) => {
                          const SubIcon = subItem.icon;
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={cn(
                                "flex items-center space-x-2 p-2 rounded-lg transition-colors",
                                isActiveLink(subItem.href)
                                  ? "bg-primary/10 text-primary"
                                  : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                              )}
                              onClick={() => setIsOpen(false)}
                            >
                              <SubIcon className="h-4 w-4" />
                              <span>{subItem.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href!}
                    className={cn(
                      "flex items-center space-x-2 p-2 rounded-lg transition-colors",
                      isActiveLink(item.href!)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              <div className="pt-4 border-t border-border/50 space-y-4">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    className="w-full justify-start"
                    onClick={handleSignInClick}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
      />
    </>
  );
}