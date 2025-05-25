
import React from "react";
import { UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRole } from "@/contexts/RoleContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";

interface RoleOption {
  id: string;
  name: string;
  avatar: string;
}

export const RoleSwitcher = () => {
  const { role, setRole } = useRole();
  const { toast } = useToast();

  const roles: RoleOption[] = [
    { id: "superuser", name: "Superuser", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Super" },
    { id: "admin", name: "Administrator", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" },
    { id: "developer", name: "Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev" },
    { id: "auditor", name: "Internal Auditor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Audit" },
    { id: "manager", name: "Policy Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Manager" },
    { id: "system-engineer", name: "System Engineer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SysEng" },
    { id: "audit-manager", name: "Audit Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AuditMgr" },
    { id: "it-manager", name: "IT Manager / CIO", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ITMgr" },
    { id: "senior-management", name: "Senior Management", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SeniorMgmt" },
    { id: "viewer", name: "Viewer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Viewer" },
  ];

  const currentRole = roles.find(r => r.id === role) || roles[2];

  const handleRoleChange = (newRole: string) => {
    setRole(newRole as any);
    toast({
      title: "Role Changed",
      description: `Switched to ${roles.find(r => r.id === newRole)?.name}`,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rounded-full">
          <Avatar>
            <AvatarImage src={currentRole.avatar} alt={currentRole.name} />
            <AvatarFallback><UserRound className="h-4 w-4" /></AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2 bg-white border shadow-lg" align="end">
        <div className="space-y-1">
          {roles.map((roleOption) => (
            <Button
              key={roleOption.id}
              variant={role === roleOption.id ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => handleRoleChange(roleOption.id)}
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={roleOption.avatar} alt={roleOption.name} />
                <AvatarFallback><UserRound className="h-3 w-3" /></AvatarFallback>
              </Avatar>
              <span className="text-sm">{roleOption.name}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
