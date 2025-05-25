
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Support = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle support form submission
    console.log("Support form submitted");
  };

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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              How can we help you?
            </h1>
            <p className="text-xl text-gray-600">
              Get the support you need to succeed with AI Governance Hub
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Support Options */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Help Center</CardTitle>
                  <CardDescription>
                    Find answers to common questions and browse our knowledge base
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild>
                    <Link to="/documentation">Browse Help Articles</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Live Chat</CardTitle>
                  <CardDescription>
                    Chat with our support team in real-time during business hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">Start Live Chat</Button>
                  <p className="text-sm text-gray-500 mt-2">
                    Available Mon-Fri, 9AM-6PM PST
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Phone Support</CardTitle>
                  <CardDescription>
                    Speak directly with our technical support team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-primary">1-800-AI-GOVERN</p>
                  <p className="text-sm text-gray-500">
                    Available for Professional and Enterprise plans
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Send us a detailed message and we'll get back to you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What can we help you with?" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Please describe your issue or question in detail..."
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How do I get started with AI Governance Hub?</h3>
                <p className="text-gray-600">Sign up for a free trial and follow our quick start guide to set up your first policy and audit workflow.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What integrations are available?</h3>
                <p className="text-gray-600">We offer integrations with popular tools like Slack, Microsoft Teams, Jira, and many more. Check our documentation for the full list.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How secure is my data?</h3>
                <p className="text-gray-600">We use enterprise-grade security measures including encryption at rest and in transit, SOC 2 compliance, and regular security audits.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I customize audit workflows?</h3>
                <p className="text-gray-600">Yes! Our platform allows you to create custom audit workflows tailored to your organization's specific requirements and compliance needs.</p>
              </div>
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

export default Support;
