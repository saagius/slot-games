import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameJackpotComponent } from './game-jackpot.component';

@NgModule({
	declarations: [
		GameJackpotComponent
	],
	imports: [
		CommonModule
	],
	exports: [GameJackpotComponent]
})
export class GameJackpotModule {
}
