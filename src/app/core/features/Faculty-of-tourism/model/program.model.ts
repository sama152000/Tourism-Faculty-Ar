export interface ProgramGoal {
  id: string;
  index?: number;
  goalName: string;
}

export interface ProgramAttachment {
  id: string;
  fileName: string;
  url: string;
}

export interface ProgramDetail {
  id: string;
  title: string;
  content: string;
  programCategory: string;
  facultyId: string;
  facultyName: string;
  programId: string;
  programName: string;
}

export interface ProgramMember {
  id: string;
  isLeader: boolean;
  programId: string;
  programName: string;
  memberId: string;
  memberName: string;
}

export interface Program {
  id: string;
  pageId: string;
  pageTitle: string;
  aboutId: string;
  about: string;
  mission: string;
  vision: string;
  goals: ProgramGoal[];
  programAttachments: ProgramAttachment[];
  details: ProgramDetail[];
  members: ProgramMember[];
}

export interface ProgramsTabsData {
  title: string;
  subtitle: string;
  sections: Program[];
}
