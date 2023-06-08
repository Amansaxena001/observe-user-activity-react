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

const detectInViewPort = (blocks): Element[] => {
    const result: Element[] = [];

    const blocksToObserve = document.querySelectorAll(`.${blocks}`);
    blocksToObserve.forEach((el: Element) => {
        if (inViewPort(el)) {
            result.push(el);
        }
    });
    return result;
};

const debounce = (fn, delay) => {
    let id;
    return (...args) => {
        const context = this;
        clearTimeout(id);
        id = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
};

const debouncedDetect = debounce(detectInViewPort, 1000);

window.addEventListener('scroll', debouncedDetect, false);
