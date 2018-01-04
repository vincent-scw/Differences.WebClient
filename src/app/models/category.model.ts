import { IdName } from './id-name.model';
import { ResponseBase } from './response-base.model';

export interface Category extends IdName {
  description?: string;
}

export interface CategoryGroup extends IdName {
  categories: Category[];
}

export interface CategoryGroupResponse extends ResponseBase {
  categoryDefinition: CategoryGroup[];
}
