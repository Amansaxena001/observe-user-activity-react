import { debounce } from "./utils";

const inViewPort = (el: Element) => {
    const elementPosition = el.getBoundingClientRect();

    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    const viewWidth = window.innerWidth || document.documentElement.clientWidth;

    return (
        elementPosition.top >= 0 &&
        elementPosition.left >= 0 &&
        elementPosition.right <= viewWidth &&
        elementPosition.bottom <= viewHeight
    );
};

const detectInViewPort = (cb:Function,id:string):void => {
    const result: Element[] = [];

    const parent:HTMLElement=document.getElementById(id);

    const blocksToObserve = parent.getElementsByClassName('*');

    [...blocksToObserve].forEach((el: Element) => {
        if (inViewPort(el)) {
            result.push(el);
        }
    });

   cb(result)
};


const debouncedDetect = debounce(detectInViewPort, 1000);


// call on component mount
const observeViewPort = (cb:CallableFunction,id: string): void => {
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', ()=>{
            debouncedDetect(cb,id)
        }, false);
    }
};

// call on cleanuop function
const stopObserve = (): void => {
    window.removeEventListener('scroll', debouncedDetect, false);
};

// test fn
const test = (id) => console.log(id, 'Successfully imported and running');


// pass parent div id 
const useViewPortObserver=(callback:Function, id:string)=>{
    if(typeof callback==="function" && id!==null){
      observeViewPort(callback,id)
    }

}

test(1)

module.exports = {
    observeViewPort,
    stopObserve,
    test,
    useViewPortObserver
};
