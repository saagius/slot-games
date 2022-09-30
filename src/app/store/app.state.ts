import { GameRootState } from './game/game.reducer';
import { JackpotRootState } from './jackpot/jackpot.reducer';
import { CategoryRootState, SelectedCategoryRootState } from './category/category.reducer';

export type AppState = GameRootState & JackpotRootState & CategoryRootState & SelectedCategoryRootState; /* & OtherRootState  & ... */
