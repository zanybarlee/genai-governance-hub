
import { SettingsLayout } from "@/components/settings/SettingsLayout";
import { RoleManagement } from "@/components/settings/RoleManagement";
import { NotificationPreferences } from "@/components/settings/NotificationPreferences";
import { SecuritySettings } from "@/components/settings/SecuritySettings";

const Settings = () => {
  return (
    <SettingsLayout>
      <div>
        <h1 className="text-3xl font-bold text-primary-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your user roles and preferences
        </p>
      </div>

      <RoleManagement />
      <NotificationPreferences />
      <SecuritySettings />
    </SettingsLayout>
  );
};

export default Settings;
