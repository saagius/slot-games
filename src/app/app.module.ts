import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ApiModule } from './api/api.module';
import { GameModule } from './game/game.module';
import { gameReducer } from './store/game/game.reducer';
import { GameEffects } from './store/game/game.effects';
import { jackpotReducer } from './store/jackpot/jackpot.reducer';
import { JackpotEffects } from './store/jackpot/jackpot.effects';
import { categoryReducer, selectedCategoryReducer } from './store/category/category.reducer';
import { CategoryModule } from './category/category.module';
import { GamesModule } from './games/games.module';
import { GamesComponent } from './games/games.component';
import { searchReducer } from './store/search/search.reducer';
import { HeaderModule } from './header/header.module';
import { activeReducer } from './store/active/active.reducer';

const appRoutes: Routes = [
	{
		path: 'games/:category',
		component: GamesComponent,
		data: { title: 'White Casino' }
	},
	{
		path: '',
		redirectTo: '/games/new',
		pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: '/games/new',
		pathMatch: 'full'
	}
];

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		GameModule,
		GamesModule,
		CategoryModule,
		HeaderModule,
		StoreModule.forRoot({
				game: gameReducer,
				jackpot: jackpotReducer,
				categories: categoryReducer,
				selectedCategory: selectedCategoryReducer,
				search: searchReducer,
				active: activeReducer
			},
			{}
		),
		StoreDevtoolsModule.instrument({
			maxAge: 25, // Retains last 25 states
			logOnly: environment.production // Restrict extension to log-only mode
		}),
		EffectsModule.forRoot([GameEffects, JackpotEffects]),
		ApiModule,
		RouterModule.forRoot(
			appRoutes
		)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
