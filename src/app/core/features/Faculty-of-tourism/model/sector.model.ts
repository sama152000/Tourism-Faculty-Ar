export interface SectorGoal {
  id: string;
  index: number;
  goalName: string | null;
  aboutId: string;
}

export interface SectorAttachment {
  id: string;
  fileName: string;
  isPublic: boolean;
  relativePath: string;
  folderName: string;
  url: string;
  sectorId: string;
}

export interface SectorDetail {
  id: string;
  title: string;
  content: string;
  sectorId: string;
  sectorName: string;
}

export interface SectorMember {
  id: string;
  isLeader: boolean;
  sectorId: string;
  sectorName: string;
  memberId: string;
  memberName: string;
}

export interface SectorPost {
  id: string;
  sectorId: string;
  sectorName: string;
  postId: string;
  postName: string;
}

export interface SectorProgram {
  id: string;
  name: string;
  sectorId: string;
  sectorName: string;
  programId: string;
  programName: string | null;
}

export interface SectorService {
  id: string;
  name?: string;
  details?: string;
  duration?: string;
  sectorId: string;
  sectorName: string;
}

export interface SectorUnit {
  id: string;
  unitNameAr: string | null;
  unitDescriptionAr: string | null;
  email: string;
  employeesCount: number;
  location: string;
  unitPhone: string;
  memberId: string;
  memberName: string;
  unitId: string;
  unitName: string;
  managementId: string;
  managementName: string;
  sectorId: string;
  sectorName: string;
}

export interface Sector {
  id: string;
  name: string;
  subTitle: string;
  pageId: string;
  pageTitle: string;
  aboutId: string;
  about: string;
  mission: string;
  vision: string;
  goals: SectorGoal[];
  sectorAttachments: SectorAttachment[];
  details: SectorDetail[];
  members: SectorMember[];
  posts: SectorPost[];
  programs: SectorProgram[];
  services: SectorService[];
  units: SectorUnit[];
}

export interface SectorsTabsData {
  title: string;
  subtitle: string;
  sections: Sector[];
}
