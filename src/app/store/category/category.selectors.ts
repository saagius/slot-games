import {createFeatureSelector, createSelector} from '@ngrx/store';
import {
    categoryFeatureKey,
    CategoryRootState, selectedCategoryFeatureKey, SelectedCategoryRootState
} from './category.reducer';

const categoriesFeature = createFeatureSelector<CategoryRootState, string[]>(categoryFeatureKey);
const selectedCategoryFeature = createFeatureSelector<SelectedCategoryRootState, string>(selectedCategoryFeatureKey);

export const selectCategories = createSelector(categoriesFeature, state => state);

export const selectSelectedCategory = createSelector(selectedCategoryFeature, state => state);
