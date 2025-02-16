
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useRole } from "@/contexts/RoleContext";
import { useState } from "react";

const Settings = () => {
  const { toast } = useToast();
  const { role, setRole } = useRole();

  // Notification preferences state
  const [notificationPreferences, setNotificationPreferences] = useState({
    policyUpdates: true,
    complianceAlerts: true,
    systemUpdates: true,
    securityAlerts: true,
  });

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    deviceManagement: true,
  });

  const handleSaveRole = () => {
    toast({
      title: "Role Updated",
      description: `Your role has been updated to ${role}.`,
    });
  };

  const handleNotificationSave = () => {
    toast({
      title: "Notification Preferences Saved",
      description: "Your notification preferences have been updated successfully.",
    });
  };

  const handleSecuritySave = () => {
    toast({
      title: "Security Settings Saved",
      description: "Your security settings have been updated successfully.",
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
                  Manage your user roles and preferences
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Role Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">User Role</label>
                    <Select
                      value={role}
                      onValueChange={(value: any) => setRole(value)}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        <SelectItem value="superuser">Superuser</SelectItem>
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

              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="policy-updates">Policy Updates</Label>
                      <Switch
                        id="policy-updates"
                        checked={notificationPreferences.policyUpdates}
                        onCheckedChange={(checked) =>
                          setNotificationPreferences((prev) => ({
                            ...prev,
                            policyUpdates: checked,
                          }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="compliance-alerts">Compliance Alerts</Label>
                      <Switch
                        id="compliance-alerts"
                        checked={notificationPreferences.complianceAlerts}
                        onCheckedChange={(checked) =>
                          setNotificationPreferences((prev) => ({
                            ...prev,
                            complianceAlerts: checked,
                          }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="system-updates">System Updates</Label>
                      <Switch
                        id="system-updates"
                        checked={notificationPreferences.systemUpdates}
                        onCheckedChange={(checked) =>
                          setNotificationPreferences((prev) => ({
                            ...prev,
                            systemUpdates: checked,
                          }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="security-alerts">Security Alerts</Label>
                      <Switch
                        id="security-alerts"
                        checked={notificationPreferences.securityAlerts}
                        onCheckedChange={(checked) =>
                          setNotificationPreferences((prev) => ({
                            ...prev,
                            securityAlerts: checked,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <Button onClick={handleNotificationSave}>Save Preferences</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="2fa">Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch
                        id="2fa"
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={(checked) =>
                          setSecuritySettings((prev) => ({
                            ...prev,
                            twoFactorAuth: checked,
                          }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="login-alerts">Login Alerts</Label>
                        <p className="text-sm text-gray-500">
                          Receive alerts for new login attempts
                        </p>
                      </div>
                      <Switch
                        id="login-alerts"
                        checked={securitySettings.loginAlerts}
                        onCheckedChange={(checked) =>
                          setSecuritySettings((prev) => ({
                            ...prev,
                            loginAlerts: checked,
                          }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="device-management">Device Management</Label>
                        <p className="text-sm text-gray-500">
                          Monitor and manage devices accessing your account
                        </p>
                      </div>
                      <Switch
                        id="device-management"
                        checked={securitySettings.deviceManagement}
                        onCheckedChange={(checked) =>
                          setSecuritySettings((prev) => ({
                            ...prev,
                            deviceManagement: checked,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <Button onClick={handleSecuritySave}>Save Security Settings</Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
