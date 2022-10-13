import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRibbonComponent } from './game-ribbon.component';

@NgModule({
	declarations: [
		GameRibbonComponent
	],
	imports: [
		CommonModule
	],
	exports: [GameRibbonComponent]
})
export class GameRibbonModule {
}
