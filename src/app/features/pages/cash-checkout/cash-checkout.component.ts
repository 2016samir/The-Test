import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from '../../../core/service/orders/orders.service';

@Component({
  selector: 'app-cash-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './cash-checkout.component.html',
  styleUrl: './cash-checkout.component.scss'
})
export class CashCheckoutComponent {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly ordersService = inject(OrdersService);
  private readonly toaster = inject(ToastrService);
  private readonly router = inject(Router);

  checkOutForm!:FormGroup ;
  cartId:string = "";


  ngOnInit(): void {
      this.initForm();
      this.getCartId();
  }

  initForm():void{
    this.checkOutForm = new FormGroup( {
      details:new FormControl(null, [Validators.required]),
      phone:new FormControl(null, [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)] ),
      city:new FormControl(null, [Validators.required])
    } )
  }

  getCartId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.cartId = param.get('id') !
        console.log(this.cartId);
       }
    })
  }


  cashSubmit():void{
    if(this.checkOutForm.valid){
      this.ordersService.createCashOrder(this.cartId , this.checkOutForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.router.navigate(['/home']);
          this.toaster.success("successful operation")
        }
      })
    }else{
      this.checkOutForm.markAllAsTouched();
    }
  }

  
}
