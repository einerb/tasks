export class User {
  id: string;
  fullname: string;
  email: string;
  password: string;

  constructor(item?: User) {
    this.id = item && item.id ? item.id : null;
    this.fullname = item && item.fullname ? item.fullname : '';
    this.email = item && item.email ? item.email : null;
    this.password = item && item.password ? item.password : '';
  }
}
