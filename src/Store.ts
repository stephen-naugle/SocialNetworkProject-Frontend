
import {compose, createStore, Store} from 'redux';
import { IState } from './interfaces';
import { state } from './reducers/index';


const composeEnhancers = 
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//custom middleware for dispatching
const enhancer = composeEnhancers();

export const saveState = (state:any) => {
    const serializedState = JSON.stringify(state);
    window.sessionStorage.setItem("app_state", serializedState);
}



//reference to global store, call this to dispatch actions
export const store: Store<IState> = createStore(state, enhancer);

store.subscribe(() => {
    saveState(store.getState().UserState.username);
});

export const loadState = () => {
    const serializedState = window.sessionStorage.getItem("app_state");

    if(!serializedState){
        return undefined;
    }

    return JSON.parse(serializedState);
}



export const clearState = () => {
    window.sessionStorage.clear();
}