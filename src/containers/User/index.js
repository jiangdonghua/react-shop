import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserMain from './containers/UserMain';
import UserHeader from './components/UserHeader';

import {actions as userActions, getOrders, getCurrentTab} from '../../redux/modules/users';
import {actions as loginActions} from "../../redux/modules/login";

class User extends Component {
    render() {
        const {orders, currentTab} = this.props;
        return (
            <div>
                <UserHeader onBack={this.handleBack} onLogout={this.handleLogout}/>
                <UserMain data={orders} currentTab={currentTab} handleTabClick={this.handleTabClick}/>
            </div>
        );
    }

    componentDidMount() {
        this.props.userActions.loadOrders()
    }

    handleBack = () => {
        this.props.history.push('/')
    }
    handleLogout = () => {
        this.props.loginActions.logout()
    }
    handleTabClick = (index) => {
        this.props.userActions.setCurrentTab(index)
    }

}

const mapStateToProps = (state, props) => {
    return {
        orders: getOrders(state),
        currentTab: getCurrentTab(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        loginActions: bindActionCreators(loginActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(User);