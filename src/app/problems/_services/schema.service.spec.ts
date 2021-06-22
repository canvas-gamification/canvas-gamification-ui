import {TestBed} from '@angular/core/testing';

import {SchemaService} from './schema.service';
import {TestModule} from '@test/test.module';
import {ApiService} from "@app/_services/api.service";
import {HttpTestingController} from "@angular/common/http/testing";

describe('SchemaService', () => {
    // TODO - Determine a more specific type.
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const mockSchemas: any = [
        {
            title: 'TestSchema',
            type: 'array',
            format: 'table',
            items: {
                type: 'string',
                title: 'Test'
            }
        },
        {
            title: 'TestSchema2',
            type: 'array',
            format: 'table',
        }
    ];

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
        schemaService.getSchema('TestSchema').subscribe((schema) => {
            expect(schema.title).toEqual('TestSchema');
            expect(schema.type).toEqual('array');
            expect(schema.format).toEqual('table');
        });
        const request = httpMock.expectOne(apiService.getURL('schema', 'TestSchema'));
        expect(request.request.method).toBe('GET');
        request.flush(mockSchemas.find(schema => schema.title === 'TestSchema'));
    });
});
