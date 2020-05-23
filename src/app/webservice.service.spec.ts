import { TestBed } from '@angular/core/testing';

import { WebserviceService } from './webservice.service';

describe('WebserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebserviceService = TestBed.get(WebserviceService);
    expect(service).toBeTruthy();
  });
});
