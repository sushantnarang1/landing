export interface EntraUser {
  oid: string;
  displayName: string;
  userPrincipalName: string;
  groups: string[];
}

export interface GroupRoleMapping {
  entraGroupId: string;
  narangOsRole: 'VIEWER' | 'DEVELOPER' | 'PLATFORM_ENGINEER' | 'SECURITY_ENGINEER' | 'ADMINISTRATOR';
}

export const DEFAULT_GROUP_MAPPINGS: GroupRoleMapping[] = [
  { entraGroupId: 'group-dev-123', narangOsRole: 'DEVELOPER' },
  { entraGroupId: 'group-plat-456', narangOsRole: 'PLATFORM_ENGINEER' },
  { entraGroupId: 'group-sec-789', narangOsRole: 'SECURITY_ENGINEER' },
  { entraGroupId: 'group-admin-000', narangOsRole: 'ADMINISTRATOR' },
];

export function mapGroupsToRole(userGroups: string[]): string {
  // Find the highest privilege role among the user's groups
  const rolePriority = {
    'ADMINISTRATOR': 5,
    'PLATFORM_ENGINEER': 4,
    'SECURITY_ENGINEER': 3,
    'DEVELOPER': 2,
    'VIEWER': 1,
  };

  let highestRole = 'VIEWER';
  let highestPriority = 1;

  for (const group of userGroups) {
    const mapping = DEFAULT_GROUP_MAPPINGS.find(m => m.entraGroupId === group);
    if (mapping && rolePriority[mapping.narangOsRole] > highestPriority) {
      highestPriority = rolePriority[mapping.narangOsRole];
      highestRole = mapping.narangOsRole;
    }
  }

  return highestRole;
}
