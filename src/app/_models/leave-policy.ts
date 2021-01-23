import {Employee} from './employee';
import {Leave} from './leave';

export class LeavePolicy {

  constructor(
    id: number,
    leave_type: string
  ) {
    this.id = id;
    this.leave_type = leave_type;
  }
  id: number;
  leave_type: string;
}
