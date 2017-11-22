export class Category {
  id: number;
  name: string;
  description?: string;
}

export class CategoryGroup {
  name: string;
  categories: Category[];
}
