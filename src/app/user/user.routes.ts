/**
 * Created by ahmedgalal on 2/24/17.
 */
import {Routes, RouterModule} from "@angular/router";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {UserEditComponent} from "./user-detail/user-edit.component";
import {UserStartComponent} from "./user-start.component";
import {UserComponent} from "./user.component";


export const USER_ROUTES:Routes=[{path:'',component:UserComponent, children:[
  {path:'', component:UserStartComponent},
  {path:'new', component:UserEditComponent},
  {path:':id', component:UserDetailComponent},
  {path:':id/edit', component:UserEditComponent},
]}];

export const  UserRouting = RouterModule.forChild(USER_ROUTES);

