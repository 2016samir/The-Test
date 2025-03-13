import { Component, computed, inject, input, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/service/auth/auth.service';
import { CartService } from '../../../core/service/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  isLogin = input<boolean>(true)        //signals   
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);

  countNumber:Signal<number> = computed( ()=> this.cartService.cartNumber() );
  
ngOnInit(): void {

this.cartService.getLoggedUserCart().subscribe({
  next:(res)=>{
  this.cartService.cartNumber.set(res.numOfCartItems);
  
}
})
    // BehaviourSubject
    // this.cartService.cartNumber.subscribe({
    //   next:(data)=>{
    //     this.countNumber = data;
    //   }
    // })

}


  signOut():void{
    this.authService.logOut();
  }

}
