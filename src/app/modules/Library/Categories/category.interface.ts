export interface ICategory {
  name: string;
  description?: string;
  image?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
