import { Injectable } from '@angular/core';
import { UserLogged } from '../utils/userLogged';

@Injectable({
  providedIn: 'root'
})
export class RolepermissionService {

  private roles: string[] = []; // Roles of the current user
  private permissions: string[] = []; // Permission of the current user

  constructor() {}
  hasRole(requiredRoles: string[]): boolean {
    let userLogged: UserLogged = new UserLogged();
    this.roles = userLogged.getRoles();
    console.log("roles",this.roles);
    const requiredTrimmed = requiredRoles.map((role) =>
      role.trim().toLowerCase()
    );
  
    return this.roles.some((role) => requiredTrimmed.includes(role));
  }
}
