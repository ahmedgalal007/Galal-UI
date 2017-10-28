import { TestBed, inject } from '@angular/core/testing';

import { FileIoService } from './file-io.service';

describe('FileIoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileIoService]
    });
  });

  it('should be created', inject([FileIoService], (service: FileIoService) => {
    expect(service).toBeTruthy();
  }));
});
