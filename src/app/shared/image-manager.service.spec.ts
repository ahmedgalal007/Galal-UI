/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImageManagerService } from './image-manager.service';

describe('ImageManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageManagerService]
    });
  });

  it('should ...', inject([ImageManagerService], (service: ImageManagerService) => {
    expect(service).toBeTruthy();
  }));
});
