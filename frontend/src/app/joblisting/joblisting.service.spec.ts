import { TestBed, inject } from '@angular/core/testing';

import { JoblistingService } from './joblisting.service';

describe('JoblistingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JoblistingService]
    });
  });

  it('should be created', inject([JoblistingService], (service: JoblistingService) => {
    expect(service).toBeTruthy();
  }));
});
