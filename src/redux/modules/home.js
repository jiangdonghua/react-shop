// import {get} from "../../utils/request";
import {combineReducers} from 'redux';
import url from '../../utils/url';
import {FETCH_DATA} from "../middleware/apis";
import {schema} from "./entities/products";

//请求参数
export const params = {
    PATH_LIKES: 'likes',
    PATH_DISCOUNTS: 'discounts',
    PAGE_SIZE_LIKES: 5,
    PAGE_SIZE_DISCOUNTS: 3
}

//actionType
export const types = {
    FETCH_LIKES_REQUEST: "HOME/FETCH_LIKES_REQUEST",
    FETCH_LIKES_SUCCESS: "HOME/FETCH_LIKES_SUCCESS",
    FETCH_LIKES_FAILURE: "HOME/FETCH_LIKES_FAILURE",//likes
    FETCH_DISCOUNTS_REQUEST: "HOME/FETCH_DISCOUNTS_REQUEST", //discount request
    FETCH_DISCOUNTS_SUCCESS: "HOME/FETCH_DISCOUNTS_SUCCESS", //discount success
    FETCH_DISCOUNTS_FAILURE: "HOME/FETCH_DISCOUNTS_FAILURE"  //discount failure
};

//state
const initialState = {
    likes: {
        isFetching: false,
        pageCount: 0,
        ids: []
    },
    discounts: {
        isFetching: false,
        ids: []
    }
}


export const actions = {
    loadLikes: (pageNum=0) => {
        return (dispatch, getState) => {
            let {pageCount} =getState().home.likes;
            let pageCount1=parseInt(pageNum)||pageCount;
            let rowIndex = pageCount1 * params.PAGE_SIZE_LIKES;
            let endpoint = url.getProductList(params.PATH_LIKES, rowIndex, params.PAGE_SIZE_LIKES);
            return dispatch(fetchLikes(endpoint))
        }
    },
    loadDiscounts: () => {
        return (dispatch, getState) => {
            //缓存
            let {ids}=getState().home.discounts;
            if(ids.length>0){
                return null;
            }
            const endpoint = url.getProductList(params.PATH_DISCOUNTS, 0, params.PAGE_SIZE_DISCOUNTS);
            return dispatch(fetchDiscounts(endpoint))
        }
    },
    // loadLikes:()=>{
    //     return (dispatch,getState)=>{
    //         dispatch(fetchLikesRequest());
    //         return get(url.getProductList("likes",0,10)).then(data=>{
    //             dispatch(fetchLikesSuccess(data))
    //         },
    //             error=>{
    //             dispatch(fetchLikesFailure(error))
    //             })
    //     }
    // }
}

//actionCreator
const fetchLikes = (endpoint) => ({
    [FETCH_DATA]: {
        types: [types.FETCH_LIKES_REQUEST, types.FETCH_LIKES_SUCCESS, types.FETCH_LIKES_FAILURE],//请求的状态
        endpoint, //url
        schema   //领域实体的结构
    }
})

const fetchDiscounts = (endpoint) => ({
    [FETCH_DATA]: {
        types: [types.FETCH_DISCOUNTS_REQUEST, types.FETCH_DISCOUNTS_SUCCESS, types.FETCH_DISCOUNTS_FAILURE],//请求的状态
        endpoint, //url
        schema   //领域实体的结构
    }
})

// const fetchLikesRequest=()=>({
//     type:types.FETCH_LIKES_REQUEST
// })
// const fetchLikesSuccess=(data)=>({
//     type:types.FETCH_LIKES_SUCCESS,
//     data
// })
// const fetchLikesFailure=(data)=>({
//     type:types.FETCH_LIKES_FAILURE,
//     data
// })

//reducer

const likes = (state = initialState.likes, action) => {
    switch (action.type) {
        case types.FETCH_LIKES_REQUEST:
            return {...state,isFetching:true}
        case types.FETCH_LIKES_SUCCESS:
            return {...state,isFetching:false,pageCount: state.pageCount+1,ids:state.ids.concat(action.response.ids)}
        case types.FETCH_LIKES_FAILURE:
            return {...state,isFetching:false}
        default:
            return state;

    }
}

const discounts = (state = initialState.discounts, action) => {
    switch (action.type) {
        case types.FETCH_DISCOUNTS_REQUEST:
            return {...state, isFetching: true}
        case types.FETCH_DISCOUNTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                ids: state.ids.concat(action.response.ids)
            }
        case types.FETCH_DISCOUNTS_FAILURE:
            return {...state, isFetching: false}
        default:
            return state;
    }

}

const reducer = combineReducers({
    likes,
    discounts
})

export default reducer;

//selectors

//获取猜你喜欢state
export const getLikes = (state) => {

    return state.home.likes.ids.map(id => {
        return state.entities.products[id]
    })
}
//获取特惠商品state
export const getDiscounts = (state) => {
    return state.home.discounts.ids.map(id => {
        return state.entities.products[id]
    })
}


//猜你喜欢当前分页码
export const getPageCountOfLikes=state=>{
    return state.home.likes.pageCount
}