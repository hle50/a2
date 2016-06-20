import {Component, OnInit} from '@angular/core';


@Component({
    selector: 'side-bar',
    template:`
 <div class="col-md-2 col-lg-2 home-left-column desktop-only">
    <aside class="sidebar site-block">

        <div class="sidebar-block" id="categoriesMenuLevel">
            <ul class="store-menu">
                <li class="father-departments-icon">
                    <span>DEPARTMENTS</span>
                </li>

            </ul>
        </div>


    </aside>
</div>
    `
    //templateUrl: 'app/sidebar/sidebar.template.html',

})
export class SideBarComponent  {

}