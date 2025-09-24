import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { RolepermissionService } from './rolepermission.service';
// import { permission } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class GuardService {
  constructor(
    private rolePermissionService: RolepermissionService,
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // By Role
    const requiredRoles = route.data['roles'] as any[] | undefined;
    console.log("requiredRoles",requiredRoles)
    if (requiredRoles === undefined) {
      this.router.navigate(['/unauthorized']); // Redirect to an unauthorized page or back to home
      return false;
    }
    if (this.rolePermissionService.hasRole(requiredRoles)) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']); // Redirect to an unauthorized page or back to home
      return false;
    }

    // by permission
    // const requiredPermission = permission;
    // const routeKey = route.data.routeKey;

    // if (requiredPermission === undefined) {
    //   return false;
    // }
    // if (routeKey === undefined || routeKey === '' || routeKey === null) {
    //   // Redirect to an unauthorized page or back to home
    //   this.router.navigate(['/unauthorized']);
    //   return false;
    // }
    // if (
    //   this.rolePermissionService.hasPermission1(
    //     requiredPermission,
    //     routeKey,
    //     'read'
    //   )
    // ) {
    //   return true;
    // } else {
    //   // Redirect to an unauthorized page or back to home
    //   this.router.navigate(['/unauthorized']);
    //   return false;
    // }
  }
}
