import React, {Component} from 'react';
import './style.css'

class Banner extends Component {
    render() {
        const {dark}=this.props
        const style=dark?{backgroundImage:"url(//www.dpfile.com/app/app-m-module/static/666419d6641cf0faec444fc12b50383d.jpg)"}:null
        return (
            <header className='banner' style={style}>
                <div className='banner__wrapper'>
                    <div className="banner__title">
                        <span className='banner__logo'> </span>
                        <span className="banner__text">吃喝玩乐，找优惠</span>
                    </div>
                    <div className="banner__btns">
                        <a className="banner__btns__openapp"
                           href="//link.dianping.com/universal-link?originalUrl=https%3A%2F%2Fitunes.apple.com%2Fcn%2Fapp%2Fwei-xin%2Fid351091731%3Fmt%3D8&amp;schema=dianping://home?utm_source=ulink_maintop%253Adefault%253ASafari%253Am">打开大众点评</a>
                        <a className="banner__btns__downloadapp" href="//m.dianping.com/download/redirect?id=11186">下载APP优惠大</a>
                    </div>
                </div>
            </header>
        );
    }
}

export default Banner;