import {TestBed} from '@angular/core/testing';

import {TabListViewService} from './tab-list-view.service';

describe('TabListViewService', () => {
    let service: TabListViewService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TabListViewService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get list view when not set', () => {
        window.localStorage.removeItem(service.localStorageValue);
        const view = service.getView();
        console.log(view);
        expect(view).toBe('list');
    });

    it('should set view to tab', () => {
        service.setView('tab');
        expect(service.getView()).toBe('tab');
    });
});
