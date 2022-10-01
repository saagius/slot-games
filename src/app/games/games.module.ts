import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games.component';
import { GameModule } from '../game/game.module';
import { SearchModule } from '../search/search.module';

@NgModule({
	declarations: [GamesComponent],
	imports: [
		CommonModule,
		GameModule
	],
	exports: [GamesComponent]
})
export class GamesModule {
}
