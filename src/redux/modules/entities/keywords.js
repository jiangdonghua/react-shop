import createReducer from '../../../utils/createReducer';

export const schema={
    name:"search",
    id:"id"
}

const reducer=createReducer(schema.name);

export default reducer;

//selectors
export const getKeywordsById=(state,id)=>{
    return state.entities.keywords[id]
}