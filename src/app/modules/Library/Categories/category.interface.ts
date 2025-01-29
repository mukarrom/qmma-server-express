export interface ICategory {
  name: string;
  description: string;
  image?: string;
  totalProducts?: number;
  // products?: Types.ObjectId[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
