import {AfterViewInit, Component, ViewChild} from '@angular/core';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements AfterViewInit {
    @ViewChild('sampleEditor') sampleEditor;

    ngAfterViewInit(): void {
        this.sampleEditor.setTheme('monokai');
        this.sampleEditor.setMode('java');
        this.sampleEditor.setOptions({
            tabSize: 4,
            useSoftTabs: true,
            useWorker: false,
            fontSize: 'inherit',
            theme: 'ace/theme/vibrant_ink',
            mode: 'ace/mode/java'
        });
    }
}
