
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function NotificationPreferences() {
  const { toast } = useToast();
  
  // Notification preferences state
  const [notificationPreferences, setNotificationPreferences] = useState({
    policyUpdates: true,
    complianceAlerts: true,
    systemUpdates: true,
    securityAlerts: true,
  });
  
  const handleNotificationSave = () => {
    toast({
      title: "Notification Preferences Saved",
      description: "Your notification preferences have been updated successfully.",
    });
  };
  
  return (
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
  );
}
