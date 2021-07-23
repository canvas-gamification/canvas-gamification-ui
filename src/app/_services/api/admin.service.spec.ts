import {TestBed} from '@angular/core/testing';
import {AdminService} from './admin.service';
import {TestModule} from '@test/test.module';

describe('TestService', () => {
    let service: AdminService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        });
        service = TestBed.inject(AdminService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
