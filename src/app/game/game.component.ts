import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Game } from './game';
import { AppState } from '../store/app.state';
import { selectGame } from '../store/game/game.selectors';

@Component({
	selector: 'app-game',
	template: `
        <div class="game" *ngIf="game">
            <app-game-jackpot [gameId]="gameId"></app-game-jackpot>
	        <app-game-ribbon [gameId]="gameId"></app-game-ribbon>
            <app-game-image [gameId]="gameId"></app-game-image>
            <div class="game-details">
                <div class="game-name">{{game.name}}</div>
                <button>Play</button>
            </div>
        </div>
        <div class="game-loading" *ngIf="!game">Loading...</div>
	`,
	styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
	@Input() gameId?: string;
	game?: Game;

	constructor(private store: Store<AppState>) {
	}

	ngOnInit(): void {
		if (this.gameId) {
			const id = this.gameId;

			this.store
				.pipe(
					map(state => selectGame(state, { id }))
				)
				.subscribe(game => {
					if (game) {
						this.game = game;
					}
				});
		}
	}
}
