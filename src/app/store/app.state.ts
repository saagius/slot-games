import { GameRootState } from './game/game.reducer';
import { JackpotRootState } from './jackpot/jackpot.reducer';
import { CategoryRootState, SelectedCategoryRootState } from './category/category.reducer';
import { SearchRootState } from './search/search.reducer';
import { ActiveRootState } from './active/active.reducer';

export type AppState =
	GameRootState
	& JackpotRootState
	& CategoryRootState
	& SelectedCategoryRootState
	& SearchRootState
	& ActiveRootState;
