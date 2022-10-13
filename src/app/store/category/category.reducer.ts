import { createReducer, on } from '@ngrx/store';

import { setCategories, setSelectedCategory } from './category.actions';

export const categoryFeatureKey = 'categories';

export interface CategoryRootState {
	[categoryFeatureKey]: string[];
}

const initialCategoriesState: string[] = [];
export const categoryReducer = createReducer(
	initialCategoriesState,
	on(setCategories, (state, { categories }) => ([
		...categories
	]))
);

export const selectedCategoryFeatureKey = 'selectedCategory';

export interface SelectedCategoryRootState {
	[selectedCategoryFeatureKey]: string;
}

const initialSelectedCategoryState = 'new';
export const selectedCategoryReducer = createReducer(
	initialSelectedCategoryState,
	on(setSelectedCategory, (state, { category }) => category)
);
