import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Game } from '../game/game';
import { AppState } from '../store/app.state';
import { selectGame } from '../store/game/game.selectors';

@Component({
	selector: 'app-game-image',
	template: `
        <div class="game-image" *ngIf="game">
            <img [src]="game.image" [alt]="game.name" (error)="handleMissingImage($event)">
            <div class="game-image-not-found" *ngIf="!imageFound">Image not available</div>
        </div>
	`,
	styleUrls: ['./game-image.component.scss']
})
export class GameImageComponent implements OnInit {
	@Input() gameId?: string;
	game?: Game;
	imageFound = true;

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

	handleMissingImage(event: Event): void {
		(event.target as HTMLImageElement).style.display = 'none';
		this.imageFound = false;
	}
}
