
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Play, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Demo = () => {
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

      {/* Demo Content */}
      <main className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              See AI Governance Hub in Action
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover how our platform transforms AI governance and compliance workflows
            </p>
          </div>

          {/* Video Placeholder */}
          <Card className="mb-12">
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-white rounded-full p-6 mb-4 shadow-lg mx-auto w-fit">
                    <Play className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    Product Demo Video
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Watch a 5-minute overview of our AI governance platform
                  </p>
                  <Button size="lg">
                    <Play className="mr-2 h-5 w-5" />
                    Play Demo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demo Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Dashboard</CardTitle>
                <CardDescription>
                  See how our real-time monitoring dashboard provides instant visibility into your AI governance status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center text-gray-500">
                  Dashboard Preview
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Automated Audit Flow</CardTitle>
                <CardDescription>
                  Experience how our AI-powered audit system generates questions and streamlines evidence collection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center text-gray-500">
                  Audit Flow Preview
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Policy Management</CardTitle>
                <CardDescription>
                  Learn how to create, manage, and track compliance with your AI governance policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center text-gray-500">
                  Policy Management Preview
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Reporting</CardTitle>
                <CardDescription>
                  See how our platform generates comprehensive compliance reports for stakeholders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center text-gray-500">
                  Reporting Preview
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-600 mb-6">
              Try our platform with a free trial and see the difference it makes for your AI governance.
            </p>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/signin">Sign In</Link>
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

export default Demo;
