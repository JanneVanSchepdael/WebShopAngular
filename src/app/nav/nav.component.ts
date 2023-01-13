import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  constructor(
    public userService: UserService,
    private router: Router,
    private toastr: ToastrService){}

  ngOnInit(): void {

  }

  logout(){
    this.userService.logout();
    this.toastr.success('You are logged out.')
  }

  notImplmented(){
    this.toastr.info('This page falls outside the scope of this thesis.')
  }

}
