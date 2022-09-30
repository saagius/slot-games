import { createAction, props } from '@ngrx/store';

export const setSearch = createAction('Set Search', props<{ search: string }>());
export const resetSearch = createAction('Reset Search');
