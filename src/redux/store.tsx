import { createStore,
         combineReducers,
         applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducerApp from "./reducers/reducerApp";

const rootReducer = combineReducers({
    search: reducerApp,
})

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;