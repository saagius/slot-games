import { createAction, props } from '@ngrx/store';

export const setActive = createAction('Set Active', props<{ active: boolean }>());
