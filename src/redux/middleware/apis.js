// {
//     FETCH_DATA:{
//         types:[,,,],
//          endpoint:url,
//          schame:{
//             id:"product_id",
//             name:"products"
//         }
//     }
// }

import {get} from "../../utils/request";
//经过中间件处理的action具有的标识
export const FETCH_DATA='FETCH DATA';
export default store=>next=>action=>{
    const callAPI=action[FETCH_DATA];
    if(typeof callAPI==="undefined"){
        return next(action)
    }

    const {endpoint,schema,types}=callAPI;
    if(typeof endpoint!=='string'){
        throw new Error("endpoint必须是一个字符串")
    }
    if(!schema){
        throw new Error("必须指定领域实体的schema")
    }
    if(!Array.isArray(types)&&types.length!==3){
        throw new Error('需要指定一个包含了3个action type的数组')
    }
    if(!types.every(type=>typeof type==="string")){
        throw new Error('action type的类型必须为字符串')
    }

    const actionWith=data=>{ //额外参数
        const finalAction={...action,...data};
        delete finalAction[FETCH_DATA];
        return finalAction;
    }

    const [requestType,successType,failureType]=types;

    //request.
    next(actionWith({
        type:requestType
    }))
    return  fetchData(endpoint,schema).then(
        //success.
        response=>next(actionWith({
            type:successType,
            response
        })),
        //failure.
        error=>next(actionWith({
            type:failureType,
            error:error.message||"获取失败"
        }))
    )

}

//执行网络请求
const fetchData=(endpoint,schema)=>{
    return get(endpoint).then(data=>{
        return normalizeData(data,schema)
    })
}

//根据schema，将获取的数据扁平处理
const normalizeData=(data,schema)=>{
    const {id,name}=schema;
    let kvObj={};
    let ids=[];
    if(Array.isArray(data)){
        data.forEach(item=>{
            kvObj[item[id]]=item;
            ids.push(item[id])
        })
    }else{
        kvObj[data[id]]=data;
        ids.push(data[id])
    }

    return {
        [name]:kvObj,
        ids
    }
}