import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './store/app.state';
import {Game} from './game/game';
import {selectGames} from "./store/game/game.selectors";
import {loadGames} from "./store/game/game.actions";
import {loadJackpots} from "./store/jackpot/jackpot.actions";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  template: `
    <div class="header">
      <ul>
        <li class="category" [class.selected]="categoryIsSelected(category)" (click)="selectCategory(category)" *ngFor="let category of categories">
          <a>{{category}}</a>
        </li>
      </ul>
    </div>
    <div class="games">
      <div class="games-wrapper">
        <app-game
          *ngFor="let game of selectedGames; trackBy: trackById"
          [game]="game"
          [currentCategory]="selectedCategory"
          class="game-wrapper"
        ></app-game>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  categories: string[] = [];
  selectedCategory: string = 'new';
  selectedGames: Game[] = [];
  otherCategories = ['fun', 'virtual', 'ball'];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadGames());
    this.store.dispatch(loadJackpots());

    this.getCurrentCategoryGames();
  }

  getCurrentCategoryGames() {
    this.store
      .pipe(
        map(state => selectGames(state)),
        filter(val => val !== undefined)
      )
      .subscribe((_games: Game[]) => {
        let distinctCategories: string[] = [];
        this.selectedGames = [];

        if(_games && _games.length) {
          _games.forEach(game => {
            game.categories.forEach(category => {
              if(this.selectedCategory == 'other') {
                if(this.otherCategories.includes(category)) {
                  this.selectedGames.push(game);
                }
              }
              else if(this.selectedCategory == category) {
                this.selectedGames.push(game);
              }

              if(!distinctCategories.includes(category)) {
                if(this.otherCategories.includes(category)) {
                  if(!distinctCategories.includes('other')) {
                    distinctCategories.push('other');
                  }
                }
                else {
                  distinctCategories.push(category);
                }
              }
            });
          });

          this.categories = distinctCategories;
        }
      });
  }

  trackById(index: number, item: Game): string {
    return item.id;
  }

  categoryIsSelected(category: string): boolean {
    return this.selectedCategory == category;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.getCurrentCategoryGames();
  }
}
