/**
 * Created by ahmedgalal on 2/22/17.
 */

import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";


const APP_ROUTES_PROVIDERS: Routes = [
  { path:'users', loadChildren: 'app/user/user.module#UserModule'},
  { path:'roles', loadChildren: 'app/user/role/role.module#RoleModule'},
  { path:'Home', component:HomeComponent},
  { path:'', redirectTo:'/Home', pathMatch:'full'}
]

export const Routing = RouterModule.forRoot(APP_ROUTES_PROVIDERS);
