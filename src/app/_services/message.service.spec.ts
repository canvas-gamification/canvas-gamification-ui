import {TestBed} from '@angular/core/testing';

import {MessageService} from './message.service';
import {TestModule} from '@test/test.module';

describe('MessageService', () => {
    let service: MessageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(MessageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
