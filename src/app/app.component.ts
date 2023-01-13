import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'WebShop Angular';

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.setCurrentUser();
  }

setCurrentUser(){
    const userJson = localStorage.getItem('user')
    const user: User = userJson !== null ? JSON.parse(userJson) : null;
    this.userService.setCurrentUser(user);
  }

}
