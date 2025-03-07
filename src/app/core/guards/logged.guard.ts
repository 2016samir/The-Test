import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logged: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const id = inject(PLATFORM_ID)
  
  if( isPlatformBrowser(id) ){
    if( localStorage.getItem('userToken') === null ){
      return true;
    }else{
      router.navigate(['/home']);
      return false;
    }
  }
  else{
    return false;
  }
    
};
