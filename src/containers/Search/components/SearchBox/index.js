import React, {Component} from 'react';
import './style.css';


class SearchBox extends Component {

    render() {
        const {inputText,relatedKeywords}=this.props;
        return (
            <div className="searchBox">
                <div className="searchBox__container">
                    <input className="searchBox__text" value={inputText} onChange={this.handleChange}/>
                    <span className="searchBox__clear" onClick={this.handleClear}/>
                    <span className="searchBox__cancel" onClick={this.handleCancel}>取消</span>
                </div>
                {relatedKeywords.length>0? SearchBox.renderSuggestList(relatedKeywords,this):null}
            </div>
        );
    }
    handleChange=(e)=>{
       this.props.onChange(e.target.value)
    }
    handleClear=()=>{
        this.props.onClear()
    }
    handleCancel=()=>{
        this.props.onCancel()
    }
    handleClickItem=item=>{
        this.props.onClickItem(item)
    }
    static renderSuggestList(relatedKeywords,that){
        return(
            <ul className="searchBox__list">
                {
                   relatedKeywords.map(item=>{
                        return(
                            <li className="searchBox__item" key={item.id} onClick={that.handleClickItem.bind(that,item)}>
                                <span className="searchBox__itemKeyword">{item.keyword}</span>
                                <span className="searchBox__itemQuantity">约{item.quantity}个结果</span>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

export default SearchBox;



