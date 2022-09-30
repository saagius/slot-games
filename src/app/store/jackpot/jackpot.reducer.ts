import { createReducer, on } from '@ngrx/store';
import { loadJackpotsSuccess } from './jackpot.actions';
import { Jackpot } from '../../jackpot/jackpot';

export interface JackpotState {
	[id: string]: Jackpot;
}

export const jackpotFeatureKey = 'jackpot';

export interface JackpotRootState {
	[jackpotFeatureKey]: JackpotState;
}

const initialState: JackpotState = {};

export const jackpotReducer = createReducer(
	initialState,
	on(loadJackpotsSuccess, (state, { jackpots }) => jackpots.reduce((acc, jackpot) => ({
		...acc,
		[jackpot.game]: jackpot
	}), {}))
);
