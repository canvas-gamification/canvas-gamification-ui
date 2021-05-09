import {TestBed} from '@angular/core/testing';

import {ContactService} from './contact.service';
import {TestModule} from '@test/test.module';

describe('ContactService', () => {
    let service: ContactService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(ContactService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
