import {TestBed} from '@angular/core/testing';

import {SchemaService} from './schema.service';
import {TestModule} from '@test/test.module';

describe('SchemaService', () => {
    let service: SchemaService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(SchemaService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
