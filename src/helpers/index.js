//helper function
function checkItemInList(item, list){
    if (!item || !list) return false;
    const result = list.find((i) => {
        return i === item;
    })
    console.log("RESULT", result, item)
    return Boolean(result)
}

export {checkItemInList};