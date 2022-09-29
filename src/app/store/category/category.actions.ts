import {createAction, props} from '@ngrx/store';

export const setCategories = createAction('[Category List] Set Categories', props<{categories: string[]}>());
export const setSelectedCategory = createAction('[Category List] Set Selected Category', props<{category: string}>());
