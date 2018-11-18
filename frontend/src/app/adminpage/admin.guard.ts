import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
      private user: User,
      private router: Router
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
    if (this.user.role === 'admin') {
        return true;
      }
    this.router.navigate(['/']);
    return false;
  }

}
