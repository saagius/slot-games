import { Component, Input, OnInit } from '@angular/core';
import { formatCurrency } from '@angular/common';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';

import { selectJackpot } from '../store/jackpot/jackpot.selectors';
import { AppState } from '../store/app.state';
import { Jackpot } from '../jackpot/jackpot';

@Component({
	selector: 'app-game-jackpot',
	template: `
        <div class="game-jackpot" *ngIf="jackpot">
            {{formatAmountToCurrency(jackpot.amount)}}
        </div>
	`,
	styleUrls: ['./game-jackpot.component.scss']
})
export class GameJackpotComponent implements OnInit {
	@Input() gameId?: string;
	jackpot?: Jackpot;

	constructor(private store: Store<AppState>) {
	}

	ngOnInit(): void {
		if (this.gameId) {
			const id = this.gameId;

			this.store
				.pipe(
					map(state => selectJackpot(state, { id })),
					filter(val => val !== undefined)
				)
				.subscribe(jackpot => {
					if (jackpot) {
						this.jackpot = jackpot;
					}
				});
		}
	}

	formatAmountToCurrency(amount: number): string {
		return formatCurrency(amount, 'en-GB', '£', 'GBP', '1.0-0');
	}
}
