import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { Game } from '../game/game';
import { selectVisibleGames } from '../store/game/game.selectors';
import { loadJackpots } from '../store/jackpot/jackpot.actions';

@Component({
	selector: 'app-games',
	template: `
        <app-search></app-search>
        <div class="games">
            <div class="games-wrapper">
                <app-game
                        *ngFor="let game of $selectedGames | async; trackBy: trackById"
                        [game]="game"
                        class="game-wrapper"
                ></app-game>
            </div>
        </div>
	`,
	styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
	$selectedGames = this.store.select(selectVisibleGames);

	constructor(private store: Store<AppState>) {
	}

	ngOnInit(): void {
		this.store.dispatch(loadJackpots());
	}

	trackById(index: number, item: Game): string {
		return item.id;
	}
}
