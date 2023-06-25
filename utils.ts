export const debounce = (fn:Function, delay:number) => {
    let id;
    return (...args) => {
        const context = this;
        clearTimeout(id);
        id = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
};
