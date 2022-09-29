import {Component, Input} from '@angular/core';
import {formatCurrency} from "@angular/common";
import {Game} from './game';
import {selectJackpot} from "../store/jackpot/jackpot.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.state";
import {Jackpot} from "../jackpot/jackpot";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-game',
  template: `
    <div class="game" *ngIf="game">
      <div class="game-jackpot" *ngIf="jackpot">
        {{formatAmountToCurrency(jackpot.amount)}}
      </div>
      <div class="box" *ngIf="isNew()">
        <div class="ribbon right">New</div>
      </div>
      <div class="box" *ngIf="isTop()">
        <div class="ribbon right">Top</div>
      </div>
      <div class="game-image">
        <img [src]="game.image" [alt]="game.name" (error)="handleMissingImage($event)">
        <div class="game-image-not-found" *ngIf="!imageFound">Image not available</div>
      </div>
      <div class="game-details">
        <div class="game-name">{{game.name}}</div>
        <button>Play</button>
      </div>
    </div>
  `,
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  @Input() game?: Game;
  @Input() currentCategory?: string

  jackpot?: Jackpot;
  imageFound: boolean = true;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    if(this.game) {
      const id = this.game.id;

      this.store
        .pipe(
          map(state => selectJackpot(state, { id })),
          filter(val => val !== undefined)
        )
        .subscribe(_jackpot => {
          if(_jackpot) {
            this.jackpot = _jackpot;
          }
        });
    }
  }

  formatAmountToCurrency(amount: number): string {
    return formatCurrency(amount, 'en-GB', '£', 'GBP', '1.0-0');
  }

  isNew() {
    return this.game && this.game.categories.includes('new') && this.currentCategory != 'new';
  }

  isTop() {
    return this.game && this.game.categories.includes('top') && this.currentCategory != 'top' && !this.isNew();
  }

  handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
    this.imageFound = false;
  }
}
