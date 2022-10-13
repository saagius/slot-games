import { createFeatureSelector, createSelector } from '@ngrx/store';

import { activeFeatureKey, ActiveRootState } from './active.reducer';
import { AppState } from '../app.state';

const activeFeature = createFeatureSelector<ActiveRootState, boolean>(activeFeatureKey);

export const selectActive = createSelector(activeFeature, state => state);

const selectRoot = (state: AppState) => state;
export const selectActiveAndSelectedCategory = createSelector(
	selectRoot,
	(state: AppState) => {
		const active = state.active;
		const selectedCategory = state.selectedCategory;

		return {
			active,
			selectedCategory
		}
	})
