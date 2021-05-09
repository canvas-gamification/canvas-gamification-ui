import {TestBed} from '@angular/core/testing';

import {CategoryService} from './category.service';
import {TestModule} from '@test/test.module';

describe('CategoryService', () => {
    let service: CategoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(CategoryService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
