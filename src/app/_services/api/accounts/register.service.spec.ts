import {TestBed} from '@angular/core/testing';

import {RegisterService} from './register.service';
import {TestModule} from '@test/test.module';

describe('RegisterService', () => {
    let service: RegisterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(RegisterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
