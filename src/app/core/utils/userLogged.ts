import { first, last } from "rxjs";

export class UserLogged {
    private readonly TOKENKEY: string = 'token';
    private readonly userIdKey: string = 'userId';
   private readonly userRoleKey: string = 'userRole';
   private readonly depart : string = 'depart';
   private readonly departid : string = 'departid';

    constructor() {
      this.TOKENKEY = 'token';
      this.userIdKey = 'userId';
      this.userRoleKey = 'userRole'
      this.depart = 'depart';
      this.departid = 'departid';
    }
    getToken(): string {
        console.log(this.getCookie(this.TOKENKEY));
      return this.getCookie(this.TOKENKEY);
    }
    getRoles() {
      const result: any = [];
      let roles: any = [];
      try {
        roles = JSON.parse(this.getCookie(this.userRoleKey));
      } catch (err) {
        roles = this.getCookie(this.userRoleKey);
      }
      try {
        roles.forEach((role: any) => {
          result.push((role.Name1 as string).trim().toLowerCase());
        });
      } catch (error) {}
      return result;
    }

    getCurrentUser(): any {
      let userId = this.getCookie(this.userIdKey);
      let token = this.getCookie(this.TOKENKEY); 
      let depart = this.getCookie(this.depart);
      let departid = this.getCookie(this.departid);

      let role = '';

 

      try {
        role = JSON.parse(this.getCookie(this.userRoleKey) || '[]');
      } catch (err) {
        role = this.getCookie(this.userRoleKey);
      }

      return {
        userId: userId,
        token: token,
        role: role,
        depart : depart,
        departid: departid
      };
    }

    setCurrentUser(
      token: string,
      userId: string,
       role: string,
       depart : string,
       departid : string

    ): void {
      this.setCookie(this.TOKENKEY, token);
      this.setCookie(this.userIdKey, userId);
      this.setCookie(this.userRoleKey,role);
      this.setCookie(this.depart,depart);
      this.setCookie(this.departid,departid);



    }

    saveToken(token: string) {
      this.setCookie(this.TOKENKEY, token);
    }

    isLogged(): boolean {
      let token = this.getCookie(this.TOKENKEY);
      // const helper = new JwtHelperService();
      if (token === '' || token === null) return false;
      else return true;
    }
    logout(): void {
      this.deleteCookie(this.TOKENKEY);
      this.deleteCookie(this.userIdKey);
      // this.deleteCookie(this.TypeKey);

      // this.deleteCookie(this.userPermissionKey1);
    }
    private deleteCookie(key: any): void {
      document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    private setCookie(key: string, value: string): void {
      document.cookie = key + '=' + value + ';path=/';
    }
    private getCookie(cname: any): string {
      let name = cname + '=';
      let ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    }
  }
