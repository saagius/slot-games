import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import { JackpotService } from '../../api/jackpot.service';
import { loadJackpots, loadJackpotsError, loadJackpotsSuccess } from './jackpot.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { selectSelectedCategory } from '../category/category.selectors';
import { setSelectedCategory } from '../category/category.actions';
import { setActive } from '../active/active.actions';
import { selectActiveAndSelectedCategory } from '../active/active.selectors';

@Injectable()
export class JackpotEffects {
	loadJackpots$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadJackpots),
			switchMap(() => {
					return this.jackpotService.getJackpots()
						.pipe(
							map(jackpots => loadJackpotsSuccess({ jackpots })),
							catchError(() => [loadJackpotsError()])
						);
			})
		)
	);

	pollJackpots$ = createEffect(() => this.actions$.pipe(
		ofType(loadJackpotsSuccess, loadJackpotsError, setSelectedCategory, setActive),
		withLatestFrom(this.store.select(selectActiveAndSelectedCategory)),
		switchMap(([_, props]) => {
			const {
				active,
				selectedCategory
			} = props;

			if(active && ['top', 'slots', 'new'].includes(selectedCategory)) {
				return of(loadJackpots()).pipe(delay(3000))
			}

			return of({ type: 'NO_ACTION' });
		})
	));

	constructor(private actions$: Actions, private jackpotService: JackpotService, private store: Store<AppState>) {
	}
}
