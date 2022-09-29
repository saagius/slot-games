import {createFeatureSelector, createSelector} from '@ngrx/store';
import {gameFeatureKey, GameRootState, GameState} from './game.reducer';

const selectGameFeature = createFeatureSelector<GameRootState, GameState>(gameFeatureKey);

export const selectGames = createSelector(selectGameFeature, state => Object.keys(state).map(key => state[key]));

export const selectGame = createSelector(selectGameFeature, (state: GameState, props: {id: string}) => state[props.id]);
