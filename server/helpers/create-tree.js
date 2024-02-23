let count = 1;

function createTree(arr, parent_id = ""){
    const tree = [];
    arr.forEach(item => {
        if(item.parent_id == parent_id){
            item.index = count++;
            const children = createTree(arr,item.id);
            if(children.length > 0){
                item.children = children;
            }
            tree.push(item);
        }
    });
    return tree;
}

module.exports.create = (arr)=>{
    count = 1;
    return createTree(arr);
}