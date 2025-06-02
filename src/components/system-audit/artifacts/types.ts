
export interface ArtifactCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface ManagedArtifact {
  id: string;
  name: string;
  categoryId: string;
  paths: string[];
  description: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  status?: 'idle' | 'scanning' | 'compliant' | 'warning' | 'failed';
  score?: number;
  lastScan?: Date;
}

export const DEFAULT_CATEGORIES: ArtifactCategory[] = [
  { id: '1', name: 'User & Group Configuration', description: 'User account definitions and permissions', color: 'bg-blue-100 text-blue-800' },
  { id: '2', name: 'Authentication & PAM', description: 'Authentication modules and access controls', color: 'bg-green-100 text-green-800' },
  { id: '3', name: 'SSH Configuration', description: 'SSH daemon and client settings', color: 'bg-purple-100 text-purple-800' },
  { id: '4', name: 'Host & Network Access', description: 'Network configurations and access controls', color: 'bg-orange-100 text-orange-800' },
  { id: '5', name: 'Service & Module Hardening', description: 'Security modules and service configurations', color: 'bg-red-100 text-red-800' },
  { id: '6', name: 'Logging & Rotation', description: 'Log management and rotation policies', color: 'bg-yellow-100 text-yellow-800' },
  { id: '7', name: 'Scheduled Jobs', description: 'Cron jobs and scheduled tasks', color: 'bg-indigo-100 text-indigo-800' },
  { id: '8', name: 'Filesystem & Kernel Hardening', description: 'Filesystem mounts and kernel parameters', color: 'bg-pink-100 text-pink-800' },
  { id: '9', name: 'Package & Patch Management', description: 'Package managers and repositories', color: 'bg-teal-100 text-teal-800' },
  { id: '10', name: 'Time & Localization', description: 'System time and locale settings', color: 'bg-gray-100 text-gray-800' }
];

export const DEFAULT_ARTIFACTS: ManagedArtifact[] = [
  {
    id: 'artifact-1',
    name: 'User Account Files',
    categoryId: '1',
    paths: ['/etc/passwd', '/etc/shadow', '/etc/group', '/etc/gshadow', '/etc/sudoers', '/etc/sudoers.d/*'],
    description: 'User‐account definitions, password hashes, group memberships, and sudo privileges',
    type: 'Configuration',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'idle'
  },
  {
    id: 'artifact-2',
    name: 'PAM Configuration',
    categoryId: '2',
    paths: ['/etc/pam.d/*', '/etc/security/limits.conf', '/etc/security/*'],
    description: 'Pluggable Authentication Module (PAM) policies, resource‐limit settings, and access controls',
    type: 'Security',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'idle'
  },
  {
    id: 'artifact-3',
    name: 'SSH Configuration Files',
    categoryId: '3',
    paths: ['/etc/ssh/sshd_config', '/etc/ssh/ssh_config'],
    description: 'SSH daemon/client settings: protocol versions, ciphers, root‐login, timeouts',
    type: 'Network',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'idle'
  },
  {
    id: 'artifact-4',
    name: 'Network Access Control',
    categoryId: '4',
    paths: ['/etc/hosts.allow', '/etc/hosts.deny', '/etc/hosts', '/etc/hostname', '/etc/resolv.conf', '/etc/netplan/*'],
    description: 'TCP wrappers, host‐to‐IP mappings, system hostname, DNS resolver, and network interface definitions',
    type: 'Network',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'idle'
  },
  {
    id: 'artifact-5',
    name: 'Security Modules & Services',
    categoryId: '5',
    paths: ['/etc/apparmor/', '/etc/apparmor.d/', '/etc/modprobe.d/', '/etc/modules-load.d/', '/etc/init.d/', '/etc/systemd/'],
    description: 'AppArmor confinement rules, kernel‐module blacklists, and service unit definitions (sysvinit & systemd)',
    type: 'Security',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'idle'
  },
  {
    id: 'artifact-6',
    name: 'System Logging',
    categoryId: '6',
    paths: ['/etc/rsyslog.conf', '/etc/rsyslog.d/', '/etc/logrotate.conf', '/etc/logrotate.d/'],
    description: 'Syslog forwarding/formatting rules and log‐rotation schedules/policies',
    type: 'Configuration',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'idle'
  },
  {
    id: 'artifact-7',
    name: 'Scheduled Jobs',
    categoryId: '7',
    paths: ['/etc/crontab', '/etc/cron.d/', '/etc/cron.daily/', '/etc/cron.hourly/', '/etc/cron.weekly/', '/etc/cron.monthly/'],
    description: 'System‐wide cron definitions, custom cron.d files, and hourly/daily/weekly/monthly job scripts',
    type: 'Configuration',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'idle'
  },
  {
    id: 'artifact-8',
    name: 'Filesystem & Kernel Config',
    categoryId: '8',
    paths: ['/etc/fstab', '/etc/sysctl.conf', '/etc/sysctl.d/', '/etc/security/limits.conf'],
    description: 'Mount options, kernel parameter hardening, and per‐user resource limits',
    type: 'Configuration',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'idle'
  },
  {
    id: 'artifact-9',
    name: 'Package Management',
    categoryId: '9',
    paths: ['/etc/apt/', '/etc/dpkg/'],
    description: 'APT repository definitions, APT configuration, and dpkg configuration',
    type: 'Configuration',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'idle'
  },
  {
    id: 'artifact-10',
    name: 'System Localization',
    categoryId: '10',
    paths: ['/etc/timezone', '/etc/locale.conf'],
    description: 'System timezone and locale settings',
    type: 'Configuration',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'idle'
  }
];
