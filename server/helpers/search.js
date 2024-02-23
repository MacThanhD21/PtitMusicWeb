module.exports = (query)=>{
    let searchObject = {
        keyword: ""
    };
    if(query.keyword){
        searchObject.keyword = query.keyword;
        searchObject.regex = new RegExp(query.keyword, 'i');
    }
    return searchObject;
}