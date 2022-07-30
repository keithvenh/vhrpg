
export default function iterateObject(obj) {
    let myArray = [];
    Object.keys(obj).forEach(key => {
        
        myArray.push(obj[key])
    })
    
    return myArray
}