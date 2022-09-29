import {Actions, createEffect, ofType} from '@ngrx/effects';
import {GameService} from '../../api/game.service';
import {Injectable} from '@angular/core';
import {
  loadGames,
  loadGamesError,
  loadGamesSuccess
} from './game.actions';
import {catchError, delay, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class GameEffects {
  loadGames$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGames),
      switchMap(() => this.gameService.getGames().pipe(
        map(games => loadGamesSuccess({games})),
        catchError(() => [loadGamesError()])
      ))
    )
  );

  pollGames$ = createEffect(() => this.actions$.pipe(
    ofType(loadGamesSuccess, loadGamesError),
    switchMap(() => of(loadGames()).pipe(delay(60000)))
  ));

  constructor(private actions$: Actions, private gameService: GameService) {
  }
}
