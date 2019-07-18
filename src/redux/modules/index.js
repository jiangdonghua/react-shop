import {combineReducers} from 'redux';
import entities from './entities';//领域
import home from './home';  //各自
import detail from './detail';
import search from './search';
import login from './login';
import user from './users';
import purchase from './purchase';
import app from './app'; //通用

//合并成根reducer
const rootReducer=combineReducers({
    entities,
    home,
    detail,
    search,
    login,
    user,
    purchase,
    app
});
export default rootReducer;