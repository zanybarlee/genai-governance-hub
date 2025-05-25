
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Book, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Documentation = () => {
  const sections = [
    {
      title: "Getting Started",
      description: "Learn the basics of AI Governance Hub",
      articles: [
        "Quick Start Guide",
        "Setting up your first policy",
        "Understanding the dashboard",
        "Inviting team members"
      ]
    },
    {
      title: "Policy Management",
      description: "Master policy creation and management",
      articles: [
        "Creating effective policies",
        "Policy templates and best practices",
        "Version control and approvals",
        "Automated compliance checks"
      ]
    },
    {
      title: "Audit Workflows",
      description: "Streamline your audit processes",
      articles: [
        "Setting up audit workflows",
        "AI-powered question generation",
        "Evidence collection and management",
        "Audit reporting and analytics"
      ]
    },
    {
      title: "API Reference",
      description: "Integrate with our powerful APIs",
      articles: [
        "Authentication and API keys",
        "Policy management endpoints",
        "Audit data access",
        "Webhook configurations"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">AI Governance Hub</span>
            </div>
            <div className="space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Book className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Documentation
            </h1>
            <p className="text-xl text-gray-600">
              Everything you need to get the most out of AI Governance Hub
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {sections.map((section, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                  <CardDescription>
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.articles.map((article, idx) => (
                      <li key={idx}>
                        <Link 
                          to="#" 
                          className="text-primary hover:underline flex items-center"
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                          {article}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search and Quick Links */}
          <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Quick Access
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Button variant="outline" className="h-16" asChild>
                <Link to="/demo">
                  <div className="text-center">
                    <div className="font-semibold">Watch Demo</div>
                    <div className="text-sm text-gray-500">See it in action</div>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" className="h-16" asChild>
                <Link to="/support">
                  <div className="text-center">
                    <div className="font-semibold">Get Support</div>
                    <div className="text-sm text-gray-500">Need help?</div>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" className="h-16" asChild>
                <Link to="/contact">
                  <div className="text-center">
                    <div className="font-semibold">Contact Sales</div>
                    <div className="text-sm text-gray-500">Talk to an expert</div>
                  </div>
                </Link>
              </Button>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Button variant="ghost" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Documentation;
