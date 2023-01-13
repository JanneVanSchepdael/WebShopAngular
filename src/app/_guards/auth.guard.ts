import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
    ){}

  canActivate(): Observable<boolean>{
    return this.userService.currentUser$.pipe(
      map(user => {
        if (user) return true;
        this.router.navigateByUrl('/login');
        this.toastr.error("You need to be logged in to access this page!")
        return false;
      })
    )
  }

}
