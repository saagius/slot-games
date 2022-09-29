import {Actions, createEffect, ofType} from '@ngrx/effects';
import {GameService} from '../../api/game.service';
import {Injectable} from '@angular/core';
import {
  loadGames,
  loadGamesError,
  loadGamesSuccess
} from './game.actions';
import {catchError, delay, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {setCategories} from '../category/category.actions';
import {Game} from '../../game/game';

@Injectable()
export class GameEffects {
    otherCategories = ['fun', 'virtual', 'ball'];

    loadGames$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadGames),
            switchMap(() => this.gameService.getGames()),
            switchMap(games => [
                loadGamesSuccess({games}),
                setCategories({ categories: this.getDistinctCategoriesFromGames(games) })
            ]),
            catchError(() => [loadGamesError()])
        )
    );

    pollGames$ = createEffect(() => this.actions$.pipe(
        ofType(loadGamesSuccess, loadGamesError),
        switchMap(() => of(loadGames()).pipe(delay(60000)))
    ));

    constructor(private actions$: Actions, private gameService: GameService) {
    }

    getDistinctCategoriesFromGames(games: Game[]): string[] {
        const distinctCategories: string[] = [];

        if (games && games.length) {
            games.forEach(game => {
                game.categories.forEach(category => {
                    if (!distinctCategories.includes(category)) {
                        if (this.otherCategories.includes(category)) {
                            if (!distinctCategories.includes('other')) {
                                distinctCategories.push('other');
                            }
                        }
                        else {
                            distinctCategories.push(category);
                        }
                    }
                });
            });
        }

        return distinctCategories;
    }
}
