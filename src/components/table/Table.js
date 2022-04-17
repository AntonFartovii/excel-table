import {ExcelComponent} from "../../core/ExcelComponent";
import {createTable} from "./table.template";

export class Table extends ExcelComponent{
    static className = 'excel__table'
    toHTML() {
        return createTable(20)
        // return `<div class="row">
        //             <div class="row-info">
        //             </div>
        //             <div class="row-data">
        //                 <div class="column">
        //                     A
        //                 </div>
        //                 <div class="column">
        //                     B
        //                 </div>
        //                 <div class="column">
        //                     C
        //                 </div>
        //             </div>
        //         </div>
        //         <div class="row">
        //             <div class="row-info">
        //                 1
        //             </div>
        //             <div class="row-data">
        //                 <div class="cell selected" contenteditable="true">
        //                     11
        //                 </div>
        //                 <div class="cell" >22</div>
        //                 <div class="cell" contenteditable="true">33</div>
        //             </div>
        //         </div>`
    }
}