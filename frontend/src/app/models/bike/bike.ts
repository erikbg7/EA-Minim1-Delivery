export class Bike {

  _id: string;
  name: string;
  kms: number;
  station: string;
  description: string;


  constructor(id = '', name = '', kms = 0, station = '', description = '') {
    this._id = id;
    this.name = name;
    this.kms = kms;
    this.station = station;
    this.description = description;
  }
}
