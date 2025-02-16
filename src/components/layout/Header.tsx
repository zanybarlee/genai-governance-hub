
import React from "react";
import { Bell, Settings, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRole } from "@/contexts/RoleContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";

export const Header = () => {
  const { role, setRole } = useRole();
  const { toast } = useToast();

  const roles = [
    { id: "superuser", name: "Superuser", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Super" },
    { id: "admin", name: "Administrator", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" },
    { id: "developer", name: "Developer", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev" },
    { id: "auditor", name: "Auditor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Audit" },
    { id: "manager", name: "Policy Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Manager" },
  ];

  const currentRole = roles.find(r => r.id === role) || roles[2]; // Default to developer

  const handleRoleChange = (newRole: string) => {
    setRole(newRole as any);
    toast({
      title: "Role Changed",
      description: `Switched to ${roles.find(r => r.id === newRole)?.name}`,
    });
  };

  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold text-primary-500">
            GenAI Governance
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              3
            </span>
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5 text-gray-500" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full">
                <Avatar>
                  <AvatarImage src={currentRole.avatar} alt={currentRole.name} />
                  <AvatarFallback><UserRound className="h-4 w-4" /></AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="end">
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
        </div>
      </div>
    </header>
  );
};
