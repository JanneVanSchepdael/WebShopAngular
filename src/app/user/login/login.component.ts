import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) {}


  ngOnInit(): void {

  }

  login(){
    this.userService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/');
      this.toastr.success('You are logged in.');
    })
  }
}
