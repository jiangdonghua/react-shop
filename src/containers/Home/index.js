import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {getLikes,getDiscounts,getPageCountOfLikes,actions as homeActions} from '../../redux/modules/home';

import Category from './components/Category';
import Headline from './components/Headline';
import Discount from './components/Discount';
import LikeList from './components/LikeList';
import HomeHeader from './components/HomeHeader';
import Activity from './components/Activity';
import Banner from './components/Banner';
import Footer from '../../components/Footer';

class Home extends Component {
    render() {
        const {likes,discounts,pageCount}=this.props;

        return (
            <div>
                <HomeHeader/>
                <Banner dark={false}/>
                <Category/>
                <Headline/>
                <Activity/>
                <Discount data={discounts}/>
                <LikeList data={likes} pageCount={pageCount} fetchData={this.fetMoreLikes}/>
                <Footer/>
            </div>
        );
    }
    componentDidMount() {
        this.props.homeActions.loadDiscounts()
    }

    fetMoreLikes=(num)=>{
        this.props.homeActions.loadLikes(num)
    }
}

const mapStateToProps=(state)=>{
    return {
        likes:getLikes(state),
        discounts:getDiscounts(state),
        pageCount:getPageCountOfLikes(state)
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        homeActions:bindActionCreators(homeActions,dispatch)
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(Home);