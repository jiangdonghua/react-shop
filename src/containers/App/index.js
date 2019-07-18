import React,{Component} from 'react';
import ErrorToast from '../../components/ErrorToast';
import {getError,actions as appActions} from "../../redux/modules/app";
import {bindActionCreators} from 'redux';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PrivateRoute from '../PrivateRoute';
import AsyncComponent from "../../utils/AsyncComponent";
import './style.css';
// import Home from "../Home";
// import ProductDetail from '../ProductDetail';
// import Search from '../Search';
// import SearchResult from '../SearchResult';
// import User from '../User';
// import Login from '../Login';
// import Purchase from '../Purchase';
const Home=AsyncComponent(()=>import("../Home"));
const ProductDetail=AsyncComponent(()=>import("../ProductDetail"));
const Search=AsyncComponent(()=>import("../Search"));
const SearchResult=AsyncComponent(()=>import("../SearchResult"));
const User=AsyncComponent(()=>import("../User"));
const Login=AsyncComponent(()=>import("../Login"));
const Purchase=AsyncComponent(()=>import("../Purchase"));



class App extends Component{
    render() {
        const {error,appActions:{clearError}}=this.props;
        return (
            <div className="App">
                <Router basename="/shop">
                    <Switch>
                        <Route path='/detail/:id' component={ProductDetail}/>
                        <Route path='/search' component={Search}/>
                        <Route path='/login' component={Login}/>
                        <PrivateRoute path='/user' component={User}/>
                        <Route path="/search_result" component={SearchResult}/>
                        <PrivateRoute path="/purchase/:id" component={Purchase}/>
                        <Route path='/' component={Home}/>

                    </Switch>
                </Router>
                {error? <ErrorToast msg={error} clearError={clearError}/>:null}
            </div>
        );
    }


}


const mapStateToProps=(state,props)=>{
return {
    error:getError(state)
}

}

const mapDispatchToProps=(dispatch)=>{
return {
    appActions:bindActionCreators(appActions,dispatch)
}
}




export default connect(mapStateToProps,mapDispatchToProps)(App);
