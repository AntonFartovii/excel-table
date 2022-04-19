import  {$} from '@/core/dom.js'
export function resizeHandler (event, $root) {
    const $resizer = $(event.target)
    const $parent = $resizer.closest ('[data-type="resizable"]')
    const coords = $parent.getCoords ()
    const type = event.target.dataset.resize
    const cells = $root.findAll(
        '[data-coll="'+$parent.data.coll+'"]')
    const $googleLine = $ (document.getElementById ( `google-line-${type}`))
    let value
    let delta
    $resizer.css({opacity: 1})
    document.onmousemove = e => {
        if (type === 'col') {
            delta = e.pageX - coords.right
            value = coords.width + delta
            $googleLine.css ( {opacity: "1", left: e.pageX + 'px'} )
            $resizer.css({right: - delta + 'px'})
        } else if (type === 'row') {
            delta = e.pageY - coords.bottom
            value = coords.height + delta
            $googleLine.css ( {opacity: "1", bottom: e.pageY + 'px'} )
            $resizer.css({bottom: - delta + 'px'})
        }
    }
    document.onmouseup = (ev) => {
        document.onmousemove = null
        document.onmouseup = null
        if (type === 'col') {
            $parent.css({width: value + 'px'})
            $googleLine.css ({opacity: "0",})
            cells.forEach (el => el.style.width = value + 'px')
        } else {
            $parent.css({height: value + 'px'})
        }

        $resizer.css({opacity: "0", right: 0, bottom: 0})
    }
}