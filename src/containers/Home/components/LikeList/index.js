import React, {Component} from 'react';
import LikeItem from './LikeItem';
import Loading from '../../../../components/Loading';
import './style.css';


class likeList extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.removeListener = false;
        this.loadTimes=0;
    }

    render() {
        const {data, pageCount} = this.props;
        return (
            <div className='likeList' ref={this.myRef}>
                <div className='likeList__header'>猜你喜欢</div>
                <div className='likeList__like'>
                    {
                        data.map((item, index) => {
                            return <LikeItem key={index} data={item}/>
                        })
                    }
                </div>
                {
                    pageCount < 3 ? (<Loading/>) : (<a className="likeList__viewAll" href='/detail'>查看更多</a>)
                }
            </div>
        );
    }

    componentDidMount() {
        if(this.props.pageCount<3){
            document.addEventListener("scroll", this.handleScroll);
        }else{
            this.removeListener=true
        }

        if(this.props.pageCount===0){
            this.props.fetchData(this.loadTimes);
        }

    }

    componentDidUpdate() {
        if (this.props.pageCount >= 3 && !this.removeListener) {
            document.removeEventListener("scroll", this.handleScroll);
            this.removeListener = true
        }
    }

    componentWillUnmount() {
        if (!this.removeListener) {
            document.removeEventListener("scroll", this.handleScroll);
        }
    }

    handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const screenHeight = document.documentElement.clientHeight;
        const likeListTop = this.myRef.current.offsetTop;
        const likeListHeight = this.myRef.current.offsetHeight;

        if (scrollTop >= (likeListHeight + likeListTop - screenHeight)) {
            setTimeout(()=>{
                this.loadTimes++;
                if(this.loadTimes<3){
                    this.props.fetchData(this.loadTimes);
                }
            },500)

        }


    }
}

export default likeList;