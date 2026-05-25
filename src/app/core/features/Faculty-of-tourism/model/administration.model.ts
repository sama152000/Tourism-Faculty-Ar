export interface ManagementGoal {
  id: string;
  index?: number;
  goalName?: string | null;
  aboutId?: string;
}

export interface ManagementAttachment {
  id: string;
  fileName?: string;
  isPublic?: boolean;
  relativePath?: string;
  folderName?: string;
  url?: string;
  managementId?: string;
}

export interface ManagementDetail {
  id: string;
  title: string;
  description: string;
  content: string;
  managementId: string;
  managementTitle: string;
}

export interface ManagementMember {
  id: string;
  isLeader: boolean;
  managementId: string;
  managementTitle: string;
  memberId: string;
  memberName: string;
  memberPhoto?: string | null;
}

export interface Administration {
  id: string;
  pageId: string;
  managementTitle: string;
  managementTitleEn: string;
  slug: string;
  aboutId: string;
  content: string;
  mission: string | null;
  vision: string | null;
  history: string | null;
  goals: ManagementGoal[];
  managementAttachments: ManagementAttachment[];
  details: ManagementDetail[];
  members: ManagementMember[];
}

export interface AdministrationsTabsData {
  title: string;
  subtitle: string;
  sections: Administration[];
}
