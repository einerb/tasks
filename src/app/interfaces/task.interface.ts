export class Task {
  public _id: string;
  public name: string;
  public priority: string;
  public expiration: string;

  constructor(item?: Task) {
    this._id = item && item._id ? item._id : null;
    this.name = item && item.name ? item.name : '';
    this.priority = item && item.priority ? item.priority : null;
    this.expiration = item && item.expiration ? item.expiration : null;
  }
}

export class TaskUser extends Task {
  id: string;
}
