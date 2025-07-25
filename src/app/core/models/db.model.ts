import { JsonObject, JsonProperty, JsonConverter, JsonConvert, JsonCustomConvert, Any } from 'json2typescript';

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
@JsonConverter
export class GameCategoryArrayConverter implements JsonCustomConvert<GameCategory[]> {
    serialize(data: GameCategory[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): GameCategory[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, GameCategory);
    }
}
@JsonConverter
export class MediaArrayConverter implements JsonCustomConvert<Media[]> {
    serialize(data: Media[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Media[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Media);
    }
}

@JsonConverter
export class GameCategoryConverter implements JsonCustomConvert<GameCategory> {
    serialize(data: GameCategory): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serialize(data);
    }
    deserialize(data: any): GameCategory {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(data, GameCategory);
    }
}
@JsonConverter
export class GameTagArrayConverter implements JsonCustomConvert<GameTag[]> {
    serialize(data: GameTag[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): GameTag[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, GameTag);
    }
}

@JsonConverter
export class GameTagConverter implements JsonCustomConvert<GameTag> {
    serialize(data: GameTag): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serialize(data);
    }
    deserialize(data: any): GameTag {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(data, GameTag);
    }
}
@JsonConverter
export class ReviewArrayConverter implements JsonCustomConvert<Review[]> {
    serialize(data: Review[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Review[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Review);
    }
}

@JsonConverter
export class ReviewConverter implements JsonCustomConvert<Review> {
    serialize(data: Review): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serialize(data);
    }
    deserialize(data: any): Review {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(data, Review);
    }
}
@JsonConverter
export class CategoryArrayConverter implements JsonCustomConvert<Category[]> {
    serialize(data: Category[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Category[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Category);
    }
}

@JsonConverter
export class CategoryConverter implements JsonCustomConvert<Category> {
    serialize(data: Category): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serialize(data);
    }
    deserialize(data: any): Category {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(data, Category);
    }
}
@JsonConverter
export class TagArrayConverter implements JsonCustomConvert<Tag[]> {
    serialize(data: Tag[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Tag[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Tag);
    }
}
@JsonConverter
export class OrderDetailsArrayConverter implements JsonCustomConvert<OrderDetails[]> {
    serialize(data: OrderDetails[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): OrderDetails[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, OrderDetails);
    }
}

@JsonConverter
export class DiscountArrayConverter implements JsonCustomConvert<Discount[]> {
    serialize(data: Discount[]): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serializeArray(data);
    }
    deserialize(data: any): Discount[] {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeArray(data, Discount);
    }
}

@JsonConverter
export class TagConverter implements JsonCustomConvert<Tag> {
    serialize(data: Tag): any {
        const jsonConvert = new JsonConvert();
        return jsonConvert.serialize(data);
    }
    deserialize(data: any): Tag {
        const jsonConvert = new JsonConvert();
        return jsonConvert.deserializeObject(data, Tag);
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
  
  @JsonProperty('profilePicture', StringConverter, true)
  profilePicture: string = '' as any;

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

  @JsonProperty('roles', Any, true)   
  Role: any = '' as any;
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


@JsonObject('GameInfo')
export class GameInfor {
  @JsonProperty('id', NumberConverter, true)
  Id: number = '' as any;

  @JsonProperty('title', StringConverter, true)
  Title: string = '' as any;

  // UPDATED: Đổi tên và thêm các trường mới
  @JsonProperty('description', StringConverter, true)
  Description: string = '' as any;

  @JsonProperty('price', NumberConverter, true)
  Price: number = '' as any;

  @JsonProperty('genre', StringConverter, true)
  Genre: string = '' as any;

  @JsonProperty('coverImagePath', StringConverter, true)
  CoverImagePath: string = '' as any;


  @JsonProperty('mediaUrls', StringConverter, true) 
  MediaUrls: string = '' as any;

    @JsonProperty('isActive', BooleanConverter, true) 
  IsActive: boolean = false;

  @JsonProperty('discountPercent', NumberConverter, true)
  DiscountPercent: number = 0;

  @JsonProperty('saleEndDate', DateTimeConverter, true)
  SaleEndDate: Date | null = null;

  @JsonProperty('status', StringConverter, true)
  Status: string = '' as any;

  @JsonProperty('createdBy', StringConverter, true)
  CreatedBy: string = '' as any;

  @JsonProperty('createdAt', DateTimeConverter, true)
  CreatedAt: Date = '' as any;
  
  @JsonProperty('developerId', StringConverter, true)
  DeveloperId: string = '' as any;
  
  @JsonProperty('installerFilePath', StringConverter, true)
  InstallerFilePath: string = '' as any;

  @JsonProperty('tags', GameTagArrayConverter, true)
  Tags: GameTag[] = [];

  @JsonProperty('reviews', ReviewArrayConverter, true)
  Reviews: Review[] = [];
   @JsonProperty('media',MediaArrayConverter , true)
  Media: Media[] = [];
  @JsonProperty('activeDiscounts',DiscountArrayConverter , true)
  Discounts: Discount[] = [];
}

@JsonObject('GameCategory')
export class GameCategory {
  @JsonProperty('id', NumberConverter, true)
  Id: number = 0;

  @JsonProperty('gameID', NumberConverter, true)
  GameID: number = 0;

  @JsonProperty('game', StringConverter, true)
  Game: string = '';
    @JsonProperty('gameName', StringConverter, true)
  GameName: string = '';

    @JsonProperty('categoryName', StringConverter, true)
  CategoryName: string = '';
  @JsonProperty('categoryID', NumberConverter, true)
  CategoryID: number = 0;

  @JsonProperty('category', CategoryConverter, true)
  Category: Category = new Category();

  @JsonProperty('createdAt', DateTimeConverter, true)
  CreatedAt: Date = new Date();

  @JsonProperty('createdBy', StringConverter, true)
  CreatedBy: string = '';
}

@JsonObject('Category')
export class Category {
  @JsonProperty('id', NumberConverter, true)
  Id: number = 0;

  @JsonProperty('categoryName', StringConverter, true)
  CategoryName: string = '';

  @JsonProperty('createdAt', DateTimeConverter, true)
  CreatedAt: Date = new Date();

  @JsonProperty('createdBy', StringConverter, true)
  CreatedBy: string = '';
}
@JsonObject('Media')
export class Media {
  @JsonProperty('id', NumberConverter, true)
  Id: number = 0;

  @JsonProperty('gameID', NumberConverter, true)
  CategoryName: number = 0;


  @JsonProperty('mediaURL', StringConverter, true)
  MediaURL: string = '';
}

@JsonObject('GameTag')
export class GameTag {
  @JsonProperty('id', NumberConverter, true)
  Id: number = 0;

  @JsonProperty('gameID', NumberConverter, true)
  GameID: number = 0;

  @JsonProperty('game', StringConverter, true)
  Game: string = '';

    @JsonProperty('tagName', StringConverter, true)
    TagName: string = '';

  @JsonProperty('tagID', NumberConverter, true)
  TagID: number = 0;

  @JsonProperty('tag', TagConverter, true)
  Tag: Tag = new Tag();

  @JsonProperty('createdAt', DateTimeConverter, true)
  CreatedAt: Date = new Date();

  @JsonProperty('createdBy', StringConverter, true)
  CreatedBy: string = '';
}

@JsonObject('Tag')
export class Tag {
  @JsonProperty('id', NumberConverter, true)
  Id: number = 0;

  @JsonProperty('tagName', StringConverter, true)
  TagName: string = '';

  @JsonProperty('createdAt', DateTimeConverter, true)
  CreatedAt: Date = new Date();

  @JsonProperty('createdBy', StringConverter, true)
  CreatedBy: string = '';
}
@JsonObject('Cart')
export class Cart {
  @JsonProperty('id', NumberConverter, true)
  Id: number = 0;

  @JsonProperty('userID', StringConverter, true)
  UserId: string = '';

  @JsonProperty('addedAt', DateTimeConverter, true)
  CreatedAt: Date = new Date();

  @JsonProperty('gameID', NumberConverter, true)
  GameId: number = undefined as any;
}
@JsonObject('Review')
export class Review {
  @JsonProperty('id', NumberConverter, true)
  Id: number = 0;

  @JsonProperty('gameID', NumberConverter, true)
  GameID: number = 0;

  @JsonProperty('game', StringConverter, true)
  Game: string = '';

  @JsonProperty('userID', StringConverter, true)
  UserID: string = '';

  @JsonProperty('starCount', NumberConverter, true)
  StarCount: number = 0;

  @JsonProperty('comment', StringConverter, true)
  Comment: string = '';

  @JsonProperty('createdAt', DateTimeConverter, true)
  CreatedAt: Date = new Date();
}
@JsonObject('Thread')
export class Thread {
  @JsonProperty('id', NumberConverter, true)
  Id: number = 0;

  @JsonProperty('threadTitle', StringConverter, true)
  ThreadTitle: string = '';

  @JsonProperty('threadDescription', StringConverter, true)
  ThreadDescription: string = '';

  @JsonProperty('createdBy', StringConverter, true)
  CreatedBy: string = '';

  @JsonProperty('upvoteCount', NumberConverter, true)
  upvoteCount: number = 0;

  @JsonProperty('createdAt', DateTimeConverter, true)
  CreatedAt: Date = new Date();
}
@JsonObject('ThreadReply')
export class ThreadReply {
  @JsonProperty('id', NumberConverter, true)
  Id: number = 0;

  @JsonProperty('threadID', NumberConverter, true)
  ThreadID: number = 0;

    @JsonProperty('upvoteCount', NumberConverter, true)
  UpvoteCount: number = 0;


  @JsonProperty('threadComment', StringConverter, true)
  ThreadComment: string = '';

  @JsonProperty('createdBy', StringConverter, true)
  CreatedBy: string = '';

  @JsonProperty('createdAt', DateTimeConverter, true)
  CreatedAt: Date = new Date();
}
@JsonObject('Discount')
export class Discount {

  @JsonProperty('id', NumberConverter, true)
  id: number = 0;

  @JsonProperty('code', StringConverter, true)
  code: string = '';

  @JsonProperty('description', StringConverter, true)
  description: string = '';

  @JsonProperty('value', NumberConverter, true)
  value: number = 0;

  @JsonProperty('isPercent', Boolean, true)
  isPercent: boolean = true;

  @JsonProperty('startDate', DateTimeConverter, true)
  startDate: Date = new Date();

  @JsonProperty('endDate', DateTimeConverter, true)
  endDate: Date = new Date();

  @JsonProperty('isActive', Boolean, true)
  isActive: boolean = true;

  @JsonProperty('createdAt', DateTimeConverter, true)
  createdAt: Date = new Date();
}
@JsonObject('StoreOrder')
export class StoreOrder {
  @JsonProperty('id', NumberConverter, true)
  Id: number = 0;

  @JsonProperty('userID', StringConverter, true)
  UserId: string = '';

  @JsonProperty('orderDate', DateTimeConverter, true)
  OrderDate: Date = new Date();

  @JsonProperty('totalAmount', NumberConverter, true)
  TotalAmount: number = undefined as any;

    @JsonProperty('status', StringConverter, true)
  Status: string = undefined as any;

    @JsonProperty('phoneNumber', StringConverter, true)
  PhoneNumber: string = undefined as any;

    @JsonProperty('email', StringConverter, true)
  Email: string = undefined as any;

    @JsonProperty('orderDetails', OrderDetailsArrayConverter, true)
  OrderDetails: OrderDetails[]=[];
}

@JsonObject('OrderDetails')
export class OrderDetails {
  @JsonProperty('id', NumberConverter, true)
  Id: number = 0;

  @JsonProperty('unitPrice', NumberConverter, true)
  UnitPrice: number = 0;

  @JsonProperty('createdAt', DateTimeConverter, true)
  CreatedAt: Date = new Date();

     @JsonProperty('gameName', StringConverter, true)
  GameName: string = undefined as any;

  @JsonProperty('orderID', NumberConverter, true)
  OrderID: number = undefined as any;

    @JsonProperty('gameID', NumberConverter, true)
  GameId: number = undefined as any;
}