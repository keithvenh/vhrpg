
export default function iterateObject(obj) {
    let myArray = [];
    Object.keys(obj).forEach(key => {
        
        myArray.push(obj[key])
    })
    console.log(myArray);
    //Sort alphabetically
    myArray.sort((a,b) => {
        let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
    console.log(myArray);
    return myArray
}