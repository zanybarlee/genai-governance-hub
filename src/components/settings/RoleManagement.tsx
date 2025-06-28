
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useRole } from "@/contexts/RoleContext";
import { Role } from "@/constants/roleAccess";

export function RoleManagement() {
  const { toast } = useToast();
  const { role, setRole } = useRole();

  const handleSaveRole = () => {
    toast({
      title: "Role Updated",
      description: `Your role has been updated to ${role}.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">User Role</label>
          <Select
            value={role}
            onValueChange={(value: Role) => setRole(value)}
          >
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              <SelectItem value="superuser">Superuser</SelectItem>
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="developer">Developer</SelectItem>
              <SelectItem value="auditor">Internal Auditor</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="system-engineer">System Engineer</SelectItem>
              <SelectItem value="audit-manager">Audit Manager</SelectItem>
              <SelectItem value="it-manager">IT Manager / CIO</SelectItem>
              <SelectItem value="senior-management">Senior Management</SelectItem>
              <SelectItem value="external-auditor">External Auditor</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSaveRole}>Update Role</Button>
      </CardContent>
    </Card>
  );
}
