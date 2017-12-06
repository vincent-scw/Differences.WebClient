import { IdName } from '../models/id-name.model';

export interface Category extends IdName {
  description?: string;
}

export interface CategoryGroup extends IdName {
  categories: Category[];
}
