import { createReducer, on } from '@ngrx/store';
import { setSearch } from './search.actions';

export const searchFeatureKey = 'search';

export interface SearchRootState {
	[searchFeatureKey]: string;
}

const initialSearchState = '';
export const searchReducer = createReducer(
	initialSearchState,
	on(setSearch, (state, { search }) => search)
);
