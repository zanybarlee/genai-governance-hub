
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Brain, ChartBar, Users, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const features = [
    {
      icon: Shield,
      title: "Policy Management",
      description: "Centralize and automate your AI governance policies with intelligent compliance tracking."
    },
    {
      icon: Brain,
      title: "AI-Powered Audits",
      description: "Generate audit questions automatically and streamline evidence collection processes."
    },
    {
      icon: ChartBar,
      title: "Real-time Monitoring",
      description: "Monitor compliance status and risk metrics with interactive dashboards and alerts."
    },
    {
      icon: Users,
      title: "Multi-stakeholder Workflows",
      description: "Collaborate seamlessly across auditors, engineers, managers, and executives."
    }
  ];

  const benefits = [
    "Reduce audit preparation time by 80%",
    "Automate compliance reporting",
    "Real-time risk visibility",
    "Streamlined evidence collection",
    "Executive-ready dashboards",
    "Integrated remediation tracking"
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

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            Intelligent AI Governance & 
            <span className="text-primary"> Audit Platform</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in delay-100">
            Streamline your AI compliance workflows with automated audits, real-time monitoring, 
            and intelligent policy management. Built for modern enterprises.
          </p>
          <div className="space-x-4 animate-fade-in delay-200">
            <Button size="lg" asChild>
              <Link to="/signup">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/demo">
                Watch Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need for AI Governance
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From policy creation to audit execution, our platform covers the entire governance lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Transform your audit process
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our AI-powered platform revolutionizes how organizations approach governance, 
                making compliance faster, more accurate, and less disruptive.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8">
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">Audit Progress</span>
                    <span className="text-sm text-green-600">92% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Risk Score</span>
                    <span className="text-2xl font-bold text-primary">8.7/10</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-sm font-medium text-gray-500 mb-2">Recent Activity</div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>✓ Policy review completed</div>
                    <div>⏳ Evidence collection in progress</div>
                    <div>📊 Report generation ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to revolutionize your AI governance?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join leading organizations who trust our platform for their AI compliance needs.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/signup">
              Start Your Free Trial Today
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6" />
                <span className="text-lg font-bold">AI Governance Hub</span>
              </div>
              <p className="text-gray-400">
                Intelligent AI governance and audit platform for modern enterprises.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-gray-400">
                <div><Link to="/features" className="hover:text-white transition-colors">Features</Link></div>
                <div><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></div>
                <div><Link to="/demo" className="hover:text-white transition-colors">Demo</Link></div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <div className="space-y-2 text-gray-400">
                <div><Link to="/documentation" className="hover:text-white transition-colors">Documentation</Link></div>
                <div><Link to="/support" className="hover:text-white transition-colors">Support</Link></div>
                <div><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-gray-400">
                <div><Link to="/about" className="hover:text-white transition-colors">About</Link></div>
                <div><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></div>
                <div><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Governance Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
