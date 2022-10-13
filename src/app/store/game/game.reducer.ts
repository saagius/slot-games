import { createReducer, on } from '@ngrx/store';

import { loadGamesSuccess } from './game.actions';
import { Game } from '../../game/game';

export interface GameState {
	[id: string]: Game;
}

export const gameFeatureKey = 'game';

export interface GameRootState {
	[gameFeatureKey]: GameState;
}

const initialState: GameState = {};

export const gameReducer = createReducer(
	initialState,
	on(loadGamesSuccess, (state, { games }) => games.reduce((acc, game) => ({
		...acc,
		[game.id]: game
	}), {}))
);
