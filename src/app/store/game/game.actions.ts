import { createAction, props } from '@ngrx/store';

import { Game } from '../../game/game';

export const loadGames = createAction('[Game List] Load Games');
export const loadGamesSuccess = createAction('[Game List] Load Games Success', props<{ games: Game[] }>());
export const loadGamesError = createAction('[Game List] Load Games Error');
