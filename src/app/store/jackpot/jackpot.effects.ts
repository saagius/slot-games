import { Actions, createEffect, ofType } from '@ngrx/effects';
import { JackpotService } from '../../api/jackpot.service';
import { Injectable } from '@angular/core';
import { loadJackpots, loadJackpotsError, loadJackpotsSuccess } from './jackpot.actions';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class JackpotEffects {
	loadJackpots$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadJackpots),
			switchMap(() => this.jackpotService.getJackpots().pipe(
				map(jackpots => loadJackpotsSuccess({ jackpots })),
				catchError(() => [loadJackpotsError()])
			))
		)
	);

	pollJackpots$ = createEffect(() => this.actions$.pipe(
		ofType(loadJackpotsSuccess, loadJackpotsError),
		switchMap(() => of(loadJackpots()).pipe(delay(3000)))
	));

	constructor(private actions$: Actions, private jackpotService: JackpotService) {
	}
}
