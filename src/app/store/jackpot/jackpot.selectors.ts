import { createFeatureSelector, createSelector } from '@ngrx/store';

import { jackpotFeatureKey, JackpotRootState, JackpotState } from './jackpot.reducer';

const selectJackpotFeature = createFeatureSelector<JackpotRootState, JackpotState>(jackpotFeatureKey);

export const selectJackpots = createSelector(selectJackpotFeature, state => Object.keys(state).map(key => state[key]));

export const selectJackpot = createSelector(selectJackpotFeature, (state: JackpotState, props: { id: string }) => state[props.id]);
