import {TestBed} from '@angular/core/testing';
import {SchemaService} from '../../_services/schema.service';
import {ApiService} from "@app/_services/api.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {MOCK_SCHEMAS} from "@app/problems/_test/mock";
import {TestModule} from "@test/test.module";

describe('SchemaService', () => {
    const mockSchemaTitle = 'TestSchema';
    let schemaService: SchemaService;
    let apiService: ApiService;
    let httpMock: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule],
            providers: [SchemaService, ApiService]
        });
        schemaService = TestBed.inject(SchemaService);
        apiService = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(schemaService).toBeTruthy();
    });

    it('getSchema returns schema', () => {
        schemaService.getSchema(mockSchemaTitle).subscribe((schema) => {
            expect(schema).toEqual(MOCK_SCHEMAS.find(schema => schema.title === mockSchemaTitle));
        });
        const request = httpMock.expectOne(apiService.getURL('schema', 'TestSchema'));
        expect(request.request.method).toBe('GET');
        request.flush(MOCK_SCHEMAS.find(schema => schema.title === mockSchemaTitle));
    });
});
