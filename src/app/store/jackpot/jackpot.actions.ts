import { createAction, props } from '@ngrx/store';

import { Jackpot } from '../../jackpot/jackpot';

export const loadJackpots = createAction('[Jackpot List] Load Jackpots');
export const loadJackpotsSuccess = createAction('[Jackpot List] Load Jackpots Success', props<{ jackpots: Jackpot[] }>());
export const loadJackpotsError = createAction('[Jackpot List] Load Jackpots Error');
