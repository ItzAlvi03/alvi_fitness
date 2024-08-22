import { TestBed } from '@angular/core/testing';

import { BackendHelperService } from './backend-helper.service';

describe('BackendHelperService', () => {
  let service: BackendHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
