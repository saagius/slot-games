import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Game } from '../game/game';
import { AppState } from '../store/app.state';
import { selectSelectedCategory } from '../store/category/category.selectors';
import { selectGame } from '../store/game/game.selectors';

@Component({
	selector: 'app-game-ribbon',
	template: `
		<div class="box" *ngIf="isNew()">
            <div class="ribbon right">New</div>
        </div>
        <div class="box" *ngIf="isTop()">
            <div class="ribbon right">Top</div>
        </div>
	`,
	styleUrls: ['./game-ribbon.component.scss']
})
export class GameRibbonComponent implements OnInit {
	@Input() gameId?: string;
	game?: Game;
	currentCategory?: string;

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

			this.store
				.pipe(
					map(state => selectSelectedCategory(state))
				)
				.subscribe(currentCategory => {
					this.currentCategory = currentCategory;
				});
		}
	}

	isNew(): boolean {
		return this.game ? this.game.categories.includes('new') && this.currentCategory !== 'new' : false;
	}

	isTop(): boolean {
		return this.game ? this.game.categories.includes('top') && this.currentCategory !== 'top' && !this.isNew() : false;
	}
}
