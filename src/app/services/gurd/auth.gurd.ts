
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGurd: CanActivateFn = (route, state) => {
  // debugger;
  const router = inject(Router);
  const localUser = localStorage.getItem('employeeERPuser');
  if (localUser != null) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
