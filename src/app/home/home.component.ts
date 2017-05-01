import { Component, OnInit } from '@angular/core';

import { User } from '../-models/index';
import { UserService, UserdataService } from '../-services/index';



import { BmiCalculatorComponent } from 'app/bmi-calculator/bmi-calculator.component';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    bmr: number;
    show: boolean = false;

    tempa;
    tempfn;
    templn;
    tempw;
    temph;
    tempg;

    constructor(private userService: UserService, private userDataService: UserdataService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }



    ngOnInit() {
        this.loadAllUsers();
        this.calcBmr();
        this.tempa = this.currentUser.age;
        this.tempfn = this.currentUser.firstName;
        this.templn = this.currentUser.lastName;
        this.tempw = this.currentUser.weight;
        this.temph = this.currentUser.height;
        this.tempg = this.currentUser.goalWeight;
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
        this.delUser2();
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    calcBmr() {
        this.bmr = 66 + (13.17 * this.currentUser.weight) + (5 * (this.currentUser.height * 100) - (6.8 * this.currentUser.age));
    }

    delUser2() {
        {
            this.userDataService.deleteUser2().subscribe()
        }
    }

    updateUser() {
        let tempUser = new User();

        tempUser.firstName = this.tempfn;
        tempUser.lastName = this.templn;
        tempUser.weight = this.tempw;
        tempUser.height = this.temph;
        tempUser.age = this.tempa;
        tempUser.goalWeight = this.tempw;

        tempUser.id = this.currentUser.id;
        tempUser.password = this.currentUser.password;
        tempUser.username = this.currentUser.username;
        // let body = JSON.stringify(tempUser);
        this.userDataService.serviceUpdateUser(tempUser).subscribe(
            data => {
                console.log("after put: ", data);
                this.userDataService.getUser(data.userId);
            }
        );

    }




}