import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { State } from '../state/app.state';

export const reducers: ActionReducerMap<State> = {};

// Middlewares
export const metaReducers: MetaReducer<State>[] = !environment.production
    ? []
    : [];
