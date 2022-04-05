import {	Component, OnInit, ViewChild, NgZone } from '@angular/core';
import {	FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  UserService } from '../service/user.service';
declare var $: any;

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
	AddEmployee: FormGroup;
	serverErrorMassege: any;
	submitted = false;
	Employee: any = [];
	constructor(public fb: FormBuilder, private UserService: UserService) {
		this.readEmployee();
	}
	ngOnInit() {
		this.AddEmployee = this.fb.group({
			name: ['', [Validators.required]],
			fname: [''],
			gender: [''],
			birth_date: [''],
			marital_status: [''],
			blood_group: [''],
			contact_number: [''],
			email: [''],
			operation: [''],
			id: [''],
		});
	}
	get f() {
		return this.AddEmployee.controls;
	}
	showModel() {
    this.AddEmployee = this.fb.group({
			name: [''],
			fname: [''],
			gender: [''],
			birth_date: [''],
			marital_status: [''],
			blood_group: [''],
			contact_number: [''],
			email: [''],
			operation: 'add',
			id: [''],
		});
		$('#myModal').modal('show');
	}
	submitAddEmployeeForm() {
		this.submitted = true;
		if(this.AddEmployee.value.operation == 'add') {
			if(this.AddEmployee.valid) {
				this.UserService.AddEmployee(this.AddEmployee.value).subscribe(
					(res) => {
						this.readEmployee();
					}, (err) => {
						this.serverErrorMassege = err;
					});
			}
		} else {
			if(this.AddEmployee.valid) {
				this.UserService.updateEmployee(this.AddEmployee.value.id, this.AddEmployee.value).subscribe(
					(res) => {
						this.readEmployee();
					}, (err) => {
						this.serverErrorMassege = err;
					});
			}
		}
	}
	readEmployee() {
		this.UserService.ListEmployee().subscribe((data) => {
			this.Employee = data;
			console.log(this.Employee);
		});
		$('#myModal').modal('hide');
	}
	opneModel(employeeId) {
		this.UserService.getEmployee(employeeId).subscribe((data) => {
			this.AddEmployee.setValue({
				name: data['name'],
				fname: data['fname'],
				gender: data['gender'],
				birth_date: data['birth_date'],
				marital_status: data['marital_status'],
				blood_group: data['blood_group'],
				contact_number: data['contact_number'],
				email: data['email'],
				id: data['_id'],
				operation: 'edit',
			});
		});
	}
	removeEmployee(employee, index) {
		if(window.confirm('Are you sure?')) {
			this.UserService.deleteEmployee(employee._id).subscribe((data) => {
				// this.Employee.splice(index, 1);
        this.readEmployee();
			});
		}
	}
}