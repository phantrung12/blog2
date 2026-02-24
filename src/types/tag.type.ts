export interface ITag {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITagCreate {
  name?: string;
  slug?: string;
  description?: string;
}
