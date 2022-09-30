import { createSelector } from '@ngrx/store';
import { Game } from '../../game/game';
import { AppState } from '../app.state';

const otherCategories = ['fun', 'virtual', 'ball'];

const selectRoot = (state: AppState) => state;

export const selectVisibleGames = createSelector(
	selectRoot,
	(state: AppState) => {
		const games = state.game;
		const selectedCategory = state.selectedCategory;
		const search = state.search;

		let gamesToShow: Game[] = [];

		if (games && selectedCategory) {
			gamesToShow = Object.keys(games).map(key => games[key]).filter((game: Game) => {
				if (selectedCategory === 'other') {
					return game.categories.some(cat => {
						return otherCategories.includes(cat);
					});
				}

				return game.categories.includes(selectedCategory);
			});
		} else {
			gamesToShow = Object.keys(games).map(key => games[key]);
		}

		if (search) {
			gamesToShow = gamesToShow.filter(game => game.name.toLowerCase().includes(search.toLowerCase()));
		}

		return gamesToShow;
	}
);
