export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryCreate {
  name?: string;
  slug?: string;
  description?: string;
}
