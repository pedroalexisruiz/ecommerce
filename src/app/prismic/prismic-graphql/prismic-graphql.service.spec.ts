import { TestBed } from '@angular/core/testing';

import { PrismicGraphqlService } from './prismic-graphql.service';

describe('PrismicGraphqlService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [PrismicGraphqlService],
    })
  );

  it('should be created', () => {
    const service: PrismicGraphqlService = TestBed.get(PrismicGraphqlService);
    expect(service).toBeTruthy();
  });
});
