import { createReducer, on } from '@ngrx/store';

import { setActive } from './active.actions';

export const activeFeatureKey = 'active';

export interface ActiveRootState {
	[activeFeatureKey]: boolean;
}

const initialActiveState = true;
export const activeReducer = createReducer(
	initialActiveState,
	on(setActive, (state, { active }) => active)
);
