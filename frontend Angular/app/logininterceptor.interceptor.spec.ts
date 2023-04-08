import { TestBed } from '@angular/core/testing';

import { LogininterceptorInterceptor } from './logininterceptor.interceptor';

describe('LogininterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LogininterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LogininterceptorInterceptor = TestBed.inject(LogininterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
