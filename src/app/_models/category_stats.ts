import {Category} from '@app/_models/category';

export interface CategoryStats{
    category: Category;
    children: CategoryStats[];
}
