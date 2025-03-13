
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function SecuritySettings() {
  const { toast } = useToast();
  
  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    deviceManagement: true,
  });
  
  const handleSecuritySave = () => {
    toast({
      title: "Security Settings Saved",
      description: "Your security settings have been updated successfully.",
    });
  };
  
  return (
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
  );
}
