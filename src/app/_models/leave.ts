import {LeavePolicy} from './leave-policy';
import {Employee} from './employee';


export class Leave {
    id: number;
    employee: Employee;
    changedBy: Employee;
    leavePolicy: LeavePolicy;
    submissionDate: string;
    startDate: string;
    endDate: string;
    daysTaken: number;
    leaveBalance: number;
    relief: Employee;
    status: string;
    remarks: string;
}
