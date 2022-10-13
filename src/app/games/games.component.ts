import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AppState } from '../store/app.state';
import { selectVisibleGameIds } from '../store/game/game.selectors';
import { loadJackpots } from '../store/jackpot/jackpot.actions';

@Component({
	selector: 'app-games',
	template: `
        <div class="games">
            <div class="games-wrapper" *ngIf="hasGames; else noGamesFound">
                <app-game
                        *ngFor="let gameId of $selectedGameIds | async; trackBy: trackById"
                        [gameId]="gameId"
                        class="game-wrapper"
                ></app-game>
            </div>
        </div>
        <ng-template #noGamesFound>
            <div class="no-games-found">
                No Games Found
            </div>
        </ng-template>
	`,
	styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
	$selectedGameIds = this.store.select(selectVisibleGameIds);
	hasGames = false;

	constructor(private store: Store<AppState>) {
	}

	ngOnInit(): void {
		this.store.dispatch(loadJackpots());

		this.store
			.pipe(
				map(state => selectVisibleGameIds(state))
			)
			.subscribe(visibleGames => {
				this.hasGames = visibleGames.length > 0;
			});
	}

	trackById(index: number, id: string): string {
		return id;
	}
}
