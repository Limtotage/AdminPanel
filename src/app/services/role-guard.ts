import { Injectable } from '@angular/core';

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { parseJwt } from '../core/utils/Jwt.util';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    const payload = parseJwt(token);
    const rawRoles: string[] = payload.roles;
    const roles = rawRoles.map(r => r.replace('ROLE_', ''));

    const expectedRole = route.data['role'] as string;

    if (roles && roles.includes(expectedRole)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
