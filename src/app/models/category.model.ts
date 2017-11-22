export class Category {
  id: number;
  name: string;
  description?: string;
}

export class CategoryGroup {
  id: number;
  name: string;
  categories: Category[];
}
