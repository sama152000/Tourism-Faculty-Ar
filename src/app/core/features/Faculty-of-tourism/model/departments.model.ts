export interface DepartmentAttachment {
  id: string;
  fileName: string;
  url: string;
}

export interface DepartmentGoal {
  id: string;
  index: number;
  goalName: string;
}

export interface DepartmentDetail {
  id: string;
  title: string;
  content: string;
  departmentId: string;
  departmentName: string;
}

export interface DepartmentMember {
  id: string;
  isLeader: boolean;
  departmentId: string;
  departmentName: string;
  memberId: string;
  memberName: string;
}

export interface DepartmentProgram {
  id: string;
  name: string;
  departmentId: string;
  departmentName: string;
  programId: string;
  programName: string;
}

export interface DepartmentService {
  id: string;
  name: string;
  details: string;
  duration: string;
  applicationUrl: string;
  downloadUrl: string;
  isOnline: boolean;
  category: string;
  fees?: number;
  contactPerson: string;
  contactPhone: string;
  departmentId: string;
  departmentName: string;
}

export interface Department {
  id: string;
  name: string;
  subTitle: string;
  pageId: string;
  pageTitle: string;
  aboutId: string;
  about: string;
  mission: string;
  vision: string;
  goals: DepartmentGoal[];
  departmentAttachments: DepartmentAttachment[];
  details: DepartmentDetail[];
  members: DepartmentMember[];
  programs: DepartmentProgram[];
  services: DepartmentService[];
}

export interface DepartmentTabsData {
  title: string;
  subtitle: string;
  sections: Department[];
}
