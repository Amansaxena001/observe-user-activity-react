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

const detectInViewPort = (blockId: string): Element[] => {
    const result: Element[] = [];

    const blocksToObserve = document.querySelectorAll(`.${blockId}`);
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

const observeViewPort = (id: string): void => {
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', () => debouncedDetect(id), false);
    }
};

const stopObserve = (): void => {
    window.removeEventListener('scroll', debouncedDetect, false);
};

// test fn
const test = (id) => console.log(id, 'Successfully imported and running');

module.exports = {
    observeViewPort,
    stopObserve,
    test,
};
