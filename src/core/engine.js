class Engine {
    constructor(selector) {
        this.el = typeof selector === "string"
        ? document.querySelector(selector)
        : selector
    }
}

export function $E(selector) {
    return new Engine(selector)
}