import { IKeyValue } from '../models/key-value.interface';

export class Category implements IKeyValue {
  id: number;
  name: string;
  description?: string;
}

export class CategoryGroup implements IKeyValue {
  id: number;
  name: string;
  categories: Category[];
}
