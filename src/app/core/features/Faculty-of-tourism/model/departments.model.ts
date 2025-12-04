export interface Department {
  id: string;
  name: string;
  description: string;
  image: string;
  link?: string;
}

export interface DepartmentsData {
  title: string;
  subtitle: string;
  departments: Department[];
}


export interface DepartmentDetail {
  id: string;
  name: string;
  title: string;
  overview: string;
  mission: string;
  objectives: string[];
  courses: string[];
  careerOpportunities: string[];
  facultyMembers: number;
  students: number;
  image: string;
  icon: string;
}

export interface DepartmentTabsData {
  title: string;
  subtitle: string;
  departments: DepartmentDetail[];
}