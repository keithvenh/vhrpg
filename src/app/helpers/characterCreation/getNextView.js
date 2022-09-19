export default function getNextView(obj,currentLink) {
    console.log(currentLink)
    console.log(obj)
    const currentStep = obj[currentLink].step
    const nextStep = currentStep + 1
    const nextView = Object.keys(obj).reduce((result,key) => {

        if (obj[key].step = nextStep) {
            result = obj[key];
        };
            return result;
    }, []);
    console.log(nextView)
    return nextView.key
}