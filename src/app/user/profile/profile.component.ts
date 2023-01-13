import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { Order } from 'src/app/_models/order';
import { User } from 'src/app/_models/user';
import { OrderService } from 'src/app/_services/order.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  private _fetchOrders$: Observable<Order[]>
  public user!: User;
  public errorMessage: string = '';

  constructor(
    private _orderService: OrderService,
    private userService: UserService,
    private toastr: ToastrService,
    private _route: ActivatedRoute
  ){
    const userJson = localStorage.getItem('user');
    this.user = userJson !== null ? JSON.parse(userJson) : null;
    this._fetchOrders$ = this._orderService.getOrders$(this.user.id);
  }


  ngOnInit(): void {}

  get orders$(): Observable<Order[]> {
    return this._fetchOrders$;
  }

  updateUser(){
    console.log(this.user);
    this.userService.updateUser(this.user).subscribe(() => {
      console.log("test3");

      this.toastr.success("Profile updated succesfully.");
    })
  }

}
