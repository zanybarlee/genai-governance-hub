
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [githubToken, setGithubToken] = useState("");
  const [selectedRole, setSelectedRole] = useState("developer");

  const handleSaveGitHub = () => {
    toast({
      title: "GitHub Settings Saved",
      description: "Your GitHub integration settings have been updated.",
    });
  };

  const handleSaveRole = () => {
    toast({
      title: "Role Updated",
      description: "The user role has been updated successfully.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <div className="mx-auto max-w-screen-2xl space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-primary-900">Settings</h1>
                <p className="text-gray-600 mt-2">
                  Manage your CI/CD integrations and user roles
                </p>
              </div>

              <Tabs defaultValue="cicd" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="cicd">CI/CD Integration</TabsTrigger>
                  <TabsTrigger value="roles">User Roles</TabsTrigger>
                </TabsList>

                <TabsContent value="cicd" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>GitHub Integration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Personal Access Token
                        </label>
                        <Input
                          type="password"
                          placeholder="Enter GitHub token"
                          value={githubToken}
                          onChange={(e) => setGithubToken(e.target.value)}
                        />
                      </div>
                      <Button onClick={handleSaveGitHub}>Save GitHub Settings</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Automated Testing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">
                          Test Pipeline Configuration
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select test runner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="jest">Jest</SelectItem>
                            <SelectItem value="mocha">Mocha</SelectItem>
                            <SelectItem value="cypress">Cypress</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="roles" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Role Management</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">User Role</label>
                        <Select
                          value={selectedRole}
                          onValueChange={setSelectedRole}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="developer">Developer</SelectItem>
                            <SelectItem value="auditor">Auditor</SelectItem>
                            <SelectItem value="manager">Policy Manager</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleSaveRole}>Update Role</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
