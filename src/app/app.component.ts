import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { loadGames } from './store/game/game.actions';
import { ActivatedRouteSnapshot, Event, Router, RoutesRecognized } from '@angular/router';
import { setSelectedCategory } from './store/category/category.actions';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { selectGamesLoaded } from './store/game/game.selectors';

@Component({
	selector: 'app-root',
	template: `
		<div *ngIf="loaded">
			<app-header></app-header>
	        <app-category></app-category>
	        <router-outlet></router-outlet>
        </div>
        <div class="loading" [class.loaded]="loaded" [class.hidden]="hideLoader">
            <img src="../assets/logo.png" alt="White Casino" />
	        <div>Loading...</div>
        </div>
	`,
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	loaded = false;
	hideLoader = false;

	constructor(private store: Store<AppState>, private router: Router, private readonly title: Title) {
		router.events.subscribe((event: Event) => {
			if (event instanceof RoutesRecognized) {
				const category = this.getRouteParam(this.findLastFirstChild(event.state.root), 'category');
				if (category) {
					this.store.dispatch(setSelectedCategory({ category }));
					this.title.setTitle(`White Casino - ${ this.capitalizeFirstLetter(category) } Games`);
				}
			}
		});
	}

	ngOnInit(): void {
		this.store.dispatch(loadGames());

		this.store
			.pipe(
				map(state => selectGamesLoaded(state))
			)
			.subscribe(gamesLoaded => {
				this.loaded = gamesLoaded;

				setTimeout(() => {
					this.hideLoader = true;
				}, 1000);
			});
	}

	private findLastFirstChild(snapshot: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
		return snapshot.firstChild
			? this.findLastFirstChild(snapshot.firstChild)
			: snapshot;
	}

	private getRouteParam(snapshot: ActivatedRouteSnapshot, parameterName: string): string {
		let parameterValue = '';
		if (snapshot.params && snapshot.params[parameterName]) {
			parameterValue = snapshot.params[parameterName];
		}
		return parameterValue;
	}

	private capitalizeFirstLetter(sentence: string): string {
		return sentence.charAt(0).toUpperCase() + sentence.slice(1);
	}
}
