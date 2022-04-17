import {$} from "@core/dom";

export class Excel {
    constructor(selector, options) {
        // Element by class Dom - Global container
        this.$el = $(selector)
        this.components = options.components || []
    }
    getRoot() {
        // Тоже самое что и document.createElement()
        //                  classList.add()
        const $root = $.create('div', 'excel')
        this.components = this.components.map((Component) => {
            const $el = $.create('div', Component.className)

            const component = new Component($el)
            //
            if (component.name) {
                window['c' + component.name] = component
            }
            // console.log($el)
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        return $root
    }
    render () {
        // this.$el - объект класса Dom
        // результатом будет запись HTML
        this.$el.append(this.getRoot())
        this.components.forEach(component => component.init())
    }
}