import { combineReducers } from 'redux';
import modifier from './modifier';

const rootReducer = combineReducers({
    recipes: modifier
});

export default rootReducer;
