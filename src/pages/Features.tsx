
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Book, Activity, FileText, Settings, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Policy Management",
      description: "Centralize and automate your AI governance policies with intelligent compliance tracking and real-time monitoring.",
      benefits: ["Automated policy updates", "Compliance tracking", "Risk assessment", "Version control"]
    },
    {
      icon: Activity,
      title: "AI-Powered Audits",
      description: "Generate audit questions automatically and streamline evidence collection with intelligent workflows.",
      benefits: ["Automated question generation", "Evidence collection", "Progress tracking", "Report generation"]
    },
    {
      icon: FileText,
      title: "Compliance Reporting",
      description: "Generate comprehensive compliance reports with executive dashboards and detailed analytics.",
      benefits: ["Executive dashboards", "Custom reports", "Real-time analytics", "Export capabilities"]
    },
    {
      icon: Settings,
      title: "Workflow Automation",
      description: "Streamline governance workflows with automated processes and intelligent routing.",
      benefits: ["Process automation", "Smart routing", "Task management", "Collaboration tools"]
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for AI Governance
            </h1>
            <p className="text-xl text-gray-600">
              Everything you need to manage AI compliance and governance in one platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to experience these features?
            </h2>
            <p className="text-gray-600 mb-6">
              Start your free trial today and see how our platform transforms your AI governance.
            </p>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/demo">Watch Demo</Link>
              </Button>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
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

export default Features;
