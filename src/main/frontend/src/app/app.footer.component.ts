import {Component} from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <div class="footer">
            <div class="card clearfix">
                <span class="footer-text-left">"OWL Library"</span>
                <span class="footer-text-right">
                    <span class="material-icons ui-icon-copyright"></span>
                    <span>Все прова защещины 2018</span>
                </span>
            </div>
        </div>
    `
})
export class AppFooterComponent {

}
