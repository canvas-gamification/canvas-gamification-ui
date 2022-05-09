import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

    readonly storageKey = 'rememberSidebarOpen';

    @Input() sidebarId: string;
    @Input() position: 'left' | 'right' = 'left';
    @Input() size: 's' | 'm' | 'l' = 'm';
    @Input() spacing: 'start' | 'between' = 'start';
    @Input() toggleable = true;
    sidebarOpen = true;

    ngOnInit() {
        if (!this.toggleable) return;

        const directory = this.getSidebarDirectory();
        if (!directory) return;
        this.sidebarOpen = directory[this.sidebarId] ?? true;
    }

    /**
     * Get the sidebar directory from local storage.
     * Create new empty directory if none is found.
     * @throws Error when no sidebar ID is provided.
     */
    getSidebarDirectory(): object | undefined {
        if (!this.sidebarId) throw new Error('Attach an ID to the sidebar!');

        const sidebarDirectoryString = localStorage.getItem(this.storageKey);
        if (!sidebarDirectoryString) {
            localStorage.setItem(this.storageKey, JSON.stringify({}));
            return {};
        }
        return JSON.parse(sidebarDirectoryString);
    }

    /**
     * Open and close the sidebar, saving state to local storage.
     * If directory is not found, nothing is saved.
     */
    toggleSidebar(): void {
        this.sidebarOpen = !this.sidebarOpen;

        const directory = this.getSidebarDirectory();
        if (!directory) return;
        directory[this.sidebarId] = this.sidebarOpen;
        localStorage.setItem(this.storageKey, JSON.stringify(directory));
    }
}
