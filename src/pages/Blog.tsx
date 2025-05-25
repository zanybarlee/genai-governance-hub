
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const posts = [
    {
      title: "The Future of AI Governance: Trends to Watch in 2024",
      excerpt: "Explore the latest trends and developments in AI governance that will shape the industry this year.",
      date: "March 15, 2024",
      category: "Industry Insights",
      readTime: "5 min read"
    },
    {
      title: "How to Build Effective AI Audit Workflows",
      excerpt: "A comprehensive guide to creating audit workflows that actually work for your organization.",
      date: "March 10, 2024",
      category: "Best Practices",
      readTime: "8 min read"
    },
    {
      title: "AI Compliance: Regulatory Updates and What They Mean for You",
      excerpt: "Stay up-to-date with the latest regulatory changes and their impact on AI governance.",
      date: "March 5, 2024",
      category: "Compliance",
      readTime: "6 min read"
    },
    {
      title: "Case Study: How TechCorp Reduced Audit Time by 80%",
      excerpt: "Learn how one company transformed their AI governance process with automation.",
      date: "February 28, 2024",
      category: "Case Studies",
      readTime: "10 min read"
    },
    {
      title: "Getting Started with AI Risk Assessment",
      excerpt: "A beginner's guide to identifying and managing AI-related risks in your organization.",
      date: "February 22, 2024",
      category: "Tutorials",
      readTime: "7 min read"
    },
    {
      title: "The ROI of AI Governance: Measuring Success",
      excerpt: "Discover how to measure and demonstrate the value of your AI governance initiatives.",
      date: "February 15, 2024",
      category: "Business",
      readTime: "5 min read"
    }
  ];

  const categories = ["All", "Industry Insights", "Best Practices", "Compliance", "Case Studies", "Tutorials", "Business"];

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
              AI Governance Insights
            </h1>
            <p className="text-xl text-gray-600">
              Stay informed with the latest trends, best practices, and insights in AI governance
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {posts.map((post, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl leading-tight">
                    <Link to="#" className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <Link 
                      to="#" 
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Stay Updated
              </h2>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter for the latest AI governance insights and updates
              </p>
              <div className="flex max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="rounded-l-none">
                  Subscribe
                </Button>
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

export default Blog;
