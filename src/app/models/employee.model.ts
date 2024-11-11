// employee.model.ts
export interface Employee {
  id: number;
  name: string;
  role:'Software Developer' | 'Senior Software Developer' | 'Quality Assurance' | 'Technical Lead' | 'Manager'|'Sr. UI Developer',
  rating:number;
  experience:string,
  joiningDate:string,
  team:string,
  manager:string,
  location:string,
  email: string;
  phone: string;
  avatar: string;
}

