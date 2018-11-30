import configs from '../configs'
let {config}=configs

var gql = require('../graphql/wxgql.js');
var GraphQL = gql.GraphQL;
var gql = GraphQL({
  url: config.HTTP_DATA_URL
},true);

let mutations=function(object){

    let {data,mutation}=object
    
    return gql.mutate({
        mutation:mutation,
        variables:data 
      }).then((e)=>{
        return e
      })
}

let querys=function(object){

    let {data,query}=object

    return gql.query({
        query: query,
        variables: data
      }).then((res) => {
        return res
      }).catch((error) => {
        return error
      })
}

export default{
    querys,
    mutations
}