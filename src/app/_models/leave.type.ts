import {Employee} from './employee';
import {Leave} from './leave';

export class LeaveType {

  constructor(
    id: number,
    name: string
  ) {
    this.id = id;
    this.name = name;
  }
  id: number;
  name: string;
}
