import {GameRootState} from './game/game.reducer';
import {JackpotRootState} from './jackpot/jackpot.reducer';

export type AppState = GameRootState & JackpotRootState; /* & OtherRootState  & ... */
