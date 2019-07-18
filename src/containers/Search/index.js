import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions as searchActions,getRelatedKeywords,getInputText,getHistoryKeywords,getPopularKeywords} from '../../redux/modules/search';
import SearchBox from './components/SearchBox';
import SearchHistory from './components/SearchHistory';
import PopularSearch from './components/PopularSearch';

class Search extends Component {
    render() {
        const {inputText,relatedKeywords,historyKeywords,popularKeywords} = this.props;
        return (
            <div>
                <SearchBox
                    inputText={inputText}
                    relatedKeywords={relatedKeywords}
                    onChange={this.handleChangeInput}
                    onClear={this.handleClearInput}
                    onCancel={this.handleCancel}
                    onClickItem={this.handleClickItem}
                />
                <PopularSearch
                data={popularKeywords}
                onClickItem={this.handleClickItem}
                />
                <SearchHistory
                    data={historyKeywords}
                    onClickItem={this.handleClickItem}
                    onClear={this.handleClearHistory}
                />
            </div>
        );
    }
    handleChangeInput=(text)=>{
        const {setInputText,loadRelatedKeywords} = this.props.searchActions;
        setInputText(text);
        loadRelatedKeywords(text);
    }
    handleClearInput = () => {
        const {clearInputText} = this.props.searchActions;
        clearInputText();
    }
    handleCancel = () => {
        this.handleClearInput();
        this.props.history.goBack()
    }
    handleClickItem=(item)=>{

        const {addHistoryKeyword,loadRelatedShop,setInputText}=this.props.searchActions;
        setInputText(item.keyword);
        addHistoryKeyword(item.id);
        loadRelatedShop(item.id);
        this.props.history.push("/search_result")
    }
    // 清除历史记录
    handleClearHistory = () => {
        const {clearHistoryKeywords} = this.props.searchActions;
        clearHistoryKeywords();
    };
    componentDidMount() {
        const {loadPopularKeywords} = this.props.searchActions;
        loadPopularKeywords()
    }
    componentWillUnmount() {
        const {clearInputText} = this.props.searchActions;
        clearInputText();
    };
}


const mapStateToProps = (state, props) => {
    return {
        inputText:getInputText(state),
        relatedKeywords:getRelatedKeywords(state),
        historyKeywords:getHistoryKeywords(state),
        popularKeywords:getPopularKeywords(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchActions: bindActionCreators(searchActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);