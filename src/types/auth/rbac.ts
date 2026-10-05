export type UserRole = 'VIEWER' | 'DEVELOPER' | 'PLATFORM_ENGINEER' | 'SECURITY_ENGINEER' | 'ADMINISTRATOR';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  groups: string[];
}

export interface Permission {
  action: string;
  resource: string;
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  VIEWER: [
    { action: 'view', resource: 'infrastructure' },
    { action: 'view', resource: 'observability' },
  ],
  DEVELOPER: [
    { action: 'view', resource: 'infrastructure' },
    { action: 'request', resource: 'infrastructure' },
    { action: 'view', resource: 'own_resources' },
    { action: 'create_pr', resource: 'infrastructure' },
  ],
  PLATFORM_ENGINEER: [
    { action: 'manage', resource: 'templates' },
    { action: 'review', resource: 'infrastructure_plans' },
    { action: 'approve', resource: 'infrastructure_requests' },
    { action: 'manage', resource: 'environments' },
  ],
  SECURITY_ENGINEER: [
    { action: 'review', resource: 'security_findings' },
    { action: 'manage', resource: 'security_policies' },
    { action: 'audit', resource: 'infrastructure' },
  ],
  ADMINISTRATOR: [
    { action: 'manage', resource: 'users' },
    { action: 'manage', resource: 'groups' },
    { action: 'manage', resource: 'roles' },
    { action: 'manage', resource: 'integrations' },
  ],
};
