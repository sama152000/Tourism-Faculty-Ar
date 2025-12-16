export interface UnitGoal {
  id: string;
  index?: number;
  goalName?: string | null;
  aboutId?: string;
}

export interface UnitAttachment {
  id: string;
  fileName?: string;
  isPublic?: boolean;
  relativePath?: string;
  folderName?: string;
  url?: string;
  unitId?: string;
}

export interface UnitDetail {
  id: string;
  title: string;
  content: string;
  unitPlace: string;
  unitId: string;
  unitTitle: string;
  unitAttachments: UnitAttachment[];
}

export interface UnitMember {
  id: string;
  isLeader: boolean;
  unitId: string;
  unitTitle: string;
  memberId: string;
  memberName: string;
}

export interface Unit {
  id: string;
  pageId: string;
  unitTitle: string;
  unitTitleEn: string;
  aboutId: string;
  content: string;
  mission: string;
  vision: string;
  history?: string | null;
  goals: UnitGoal[];
  unitAttachments: UnitAttachment[];
  details: UnitDetail[];
  members: UnitMember[];
}

export interface UnitsTabsData {
  title: string;
  subtitle: string;
  sections: Unit[];
}
