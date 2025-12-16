export interface CenterGoal {
  id: string;
  index: number;
  goalName: string | null;
  aboutId: string;
}

export interface CenterAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
  centerId: string;
}

export interface CenterDetail {
  id: string;
  title: string;
  description: string;
  content: string;
  centerId: string;
  center: string;
}

export interface CenterMember {
  id: string;
  isLeader: boolean;
  centerId: string;
  centerName: string;
  memberId: string;
  memberName: string;
}

export interface Center {
  id: string;
  subTitle: string;
  place: string;
  pageId: string;
  centerName: string;
  centerNameEn: string;
  aboutId: string;
  about: string;
  mission: string;
  vision: string;
  goals: CenterGoal[];
  centerAttachments: CenterAttachment[];
  details: CenterDetail[];
  members: CenterMember[];
}

export interface CentersTabsData {
  title: string;
  subtitle: string;
  sections: Center[];
}
