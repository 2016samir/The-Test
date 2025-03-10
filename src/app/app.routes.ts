import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './features/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './features/layout/main-layout/main-layout.component';
import { NotfoundComponent } from './features/additional/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { logged } from './core/guards/logged.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    
    {
        path: '',
        component: AuthLayoutComponent,
        canActivate : [logged],
        children: [
            {
                path: 'login',
                loadComponent: () => import('./features/auth/login/login.component')
                    .then(m => m.LoginComponent),
                title: 'Login'
            },
            {
                path: 'registeration',
                loadComponent: () => import('./features/auth/registeration/registeration.component')
                    .then(m => m.RegisterationComponent),
                title: 'Registeration'
            },
            {
                path: 'resetPassword',
                loadComponent: () => import('./features/auth/reset-password/reset-password.component')
                    .then(m => m.ResetPasswordComponent),
                title: 'Reset Password'
            }
        ]
    },

    {
        path: '',
        component: MainLayoutComponent,
        canActivate : [authGuard],
        children: [
            {
                path: 'home',
                loadComponent: () => import('./features/pages/home/home.component')
                    .then(m => m.HomeComponent),
                title: 'Home'
            },
            {
                path: 'cart',
                loadComponent: () => import('./features/pages/cart/cart.component')
                    .then(m => m.CartComponent),
                title: 'Cart'
            },
            {
                path: 'wishlist',
                loadComponent: () => import('./features/pages/wish-list/wish-list.component')
                    .then(m => m.WishListComponent),
                title: 'Wishlist'
            },
            {
                path: 'products',
                loadComponent: () => import('./features/pages/products/products.component')
                    .then(m => m.ProductsComponent),
                title: 'Products'
            },
            {
                path: 'categories',
                loadComponent: () => import('./features/pages/categories/categories.component')
                    .then(m => m.CategoriesComponent),
                title: 'Categories'
            },
            {
                path: 'brands',
                loadComponent: () => import('./features/pages/brands/brands.component')
                    .then(m => m.BrandsComponent),
                title: 'Brands'
            },
            {
                path: 'productDetails/:id',
                loadComponent: () => import('./features/pages/product-details/product-details.component')
                    .then(m => m.ProductDetailsComponent),
                title: 'Product Details'
            },
            {
                path: 'checkout/:id',
                loadComponent: () => import('./features/pages/checkout/checkout.component')
                    .then(m => m.CheckoutComponent),
                title: 'checkout'
            },
            {
                path: 'cashCheckout/:id',
                loadComponent: () => import('./features/pages/cash-checkout/cash-checkout.component')
                    .then(m => m.CashCheckoutComponent),
                title: 'checkout'
            },
            {
                path: 'allorders',
                loadComponent: () => import('./features/pages/allorders/allorders.component')
                    .then(m => m.AllordersComponent),
                title: 'allorders'
            },
            { path: '**', component: NotfoundComponent }
        ]
    }
];
