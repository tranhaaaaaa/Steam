import { JsonObject, JsonProperty, JsonConverter, JsonConvert, JsonCustomConvert } from 'json2typescript';

@JsonConverter
export class NumberConverter implements JsonCustomConvert<number> {
    serialize(data: any): number {
        if (Number.isNaN(data)) {
            return data;
        } else {
            return Number(data);
        }
    }
    deserialize(data: any): number {
        if (typeof data === 'undefined' || data === null) {
            return data;
        }
        if (Number.isNaN(data)) {
            return data;
        } else {
            return Number(data);
        }
    }
}
@JsonConverter
export class StringConverter implements JsonCustomConvert<string> {
    serialize(data: any): string {
        if (data) {
            return data.toString();
        } else {
            return data;
        }
    }
    deserialize(data: any): string {
        if (data) {
            return data.toString();
        } else {
            return data;
        }
    }
}
@JsonConverter
export class BooleanConverter implements JsonCustomConvert<boolean> {
    serialize(data: any): boolean {
        if (typeof (data) === 'boolean') {
            return data;
        } else {
            return data;
        }
    }
    deserialize(data: any): boolean {
        if (typeof (data) === 'boolean') {
            return data;
        } else {
            return data;
        }
    }
}
@JsonConverter
export class DateTimeConverter implements JsonCustomConvert<Date> {
    serialize(date: Date): any {
        function pad(number: any) {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }
        return date.getFullYear() +
            '-' + pad(date.getMonth() + 1) +
            '-' + pad(date.getDate()) +
            'T' + pad(date.getHours()) +
            ':' + pad(date.getMinutes()) +
            ':' + pad(date.getSeconds()) +
            '.' + (date.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
            'Z';
    }
    deserialize(date: any): Date {
        const dReturn = new Date(date);
        if (dReturn.getFullYear() === 1970
            && dReturn.getMonth() === 0
            && dReturn.getDate() === 1) {
            return null as any;
        } else {
            return dReturn;
        }
    }
}


@JsonObject('User')
export class User {
  @JsonProperty('id', StringConverter, true)
  Id: string = '' as any;

  @JsonProperty('userName', StringConverter, true)
  UserName: string = '' as any;

  @JsonProperty('normalizedUserName', StringConverter, true)
  NormalizedUserName: string = '' as any;

  @JsonProperty('email', StringConverter, true)
  Email: string = '' as any;

  @JsonProperty('normalizedEmail', StringConverter, true)
  NormalizedEmail: string = '' as any;

  @JsonProperty('emailConfirmed', BooleanConverter, true)
  EmailConfirmed: boolean = '' as any;

  @JsonProperty('passwordHash', StringConverter, true)
  PasswordHash: string = '' as any;

  @JsonProperty('securityStamp', StringConverter, true)
  SecurityStamp: string = '' as any;

  @JsonProperty('concurrencyStamp', StringConverter, true)
  ConcurrencyStamp: string = '' as any;

  @JsonProperty('phoneNumber', StringConverter, true)
  PhoneNumber: string = '' as any;

  @JsonProperty('phoneNumberConfirmed', BooleanConverter, true)
  PhoneNumberConfirmed: boolean = '' as any;

  @JsonProperty('twoFactorEnabled', BooleanConverter, true)
  TwoFactorEnabled: boolean = '' as any;

  @JsonProperty('lockoutEnd', StringConverter, true)
  LockoutEnd: string = '' as any;

  @JsonProperty('lockoutEnabled', BooleanConverter, true)
  LockoutEnabled: boolean = '' as any;

  @JsonProperty('accessFailedCount', NumberConverter, true)
  AccessFailedCount: number = '' as any;

  @JsonProperty('role', StringConverter, true)   
  Role: string = '' as any;
}


@JsonObject('AddUser')
export class AddUser {
  @JsonProperty('username', StringConverter, true)
  Username: string = '' as any;

  @JsonProperty('email', StringConverter, true)
  Email: string = '' as any;

  @JsonProperty('phone', StringConverter, true)
  Phone: string = '' as any;

  @JsonProperty('password', StringConverter, true)
  Password: string = '' as any;

  @JsonProperty('role', StringConverter, true)
  Role: string = '' as any;

  
}