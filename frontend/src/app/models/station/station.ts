export class Station {
  _id: string;
  name: string;
  state: string;
  description: string;


  constructor(id = '', name = '', state = '', description = '') {
    this._id = id;
    this.name = name;
    this.state = state;
    this.description = description;
  }
}
