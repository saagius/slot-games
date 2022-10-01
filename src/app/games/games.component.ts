import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Game } from '../game/game';
import { selectVisibleGames } from '../store/game/game.selectors';
import { loadJackpots } from '../store/jackpot/jackpot.actions';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-games',
	template: `
        <div class="games">
            <div class="games-wrapper" *ngIf="hasGames; else noGamesFound">
                <app-game
                        *ngFor="let game of $selectedGames | async; trackBy: trackById"
                        [game]="game"
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
	$selectedGames = this.store.select(selectVisibleGames);
	hasGames = false;

	constructor(private store: Store<AppState>) {
	}

	ngOnInit(): void {
		this.store.dispatch(loadJackpots());

		this.store
			.pipe(
				map(state => selectVisibleGames(state))
			)
			.subscribe(visibleGames => {
				this.hasGames = visibleGames.length > 0;
			});
	}

	trackById(index: number, item: Game): string {
		return item.id;
	}
}
