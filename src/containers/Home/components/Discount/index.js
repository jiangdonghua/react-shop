import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.css';


class Discount extends Component {
    render() {
      const {data}=this.props;
        return (
            <div className='discount'>
                <a href="/" className="discount__header">
                    <span className='discount__title'>超值特惠</span>
                    <span className='discount__more'>更多优惠</span>
                    <span className="discount__arrow"> </span>
                </a>
                <div className="discount__content">
                    {
                        data.map((item)=>{
                            return (
                                <Link to={`/detail/${item.id}`} className="discount__item" key={item.id}>
                                    <div className='discount__itemPic'>
                                        <img src={item.picture} alt=''/>
                                    </div>
                                    <div className='discount__itemTitle'>
                                        {item.shop}
                                    </div>
                                    <div className='discount__itemPriceWrapper'>
                                        <ins className='discount__itemCurrentPrice'>{item.currentPrice}</ins>
                                        <del className='discount__itemOldPrice'>{item.oldPrice}</del>
                                    </div>
                                </Link>
                            )
                        })
                    }

                </div>
            </div>
        );
    }
}

export default Discount;