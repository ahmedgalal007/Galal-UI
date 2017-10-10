import {Routes, RouterModule} from "@angular/router";
import {RoleComponent} from "./role.component";
import {RoleStartComponent} from "./role-start.component";
import {RoleEditComponent} from "./role-detail/role-edit.component";
import {RoleDetailComponent} from "./role-detail/role-detail.component";


export const ROLE_ROUTES:Routes=[{path:'',component:RoleComponent, children:[
  {path:'', component:RoleStartComponent},
  {path:'new', component:RoleEditComponent},
  {path:':id', component:RoleDetailComponent},
  {path:':id/edit', component:RoleEditComponent},
]}];

export const  RoleRouting = RouterModule.forChild(ROLE_ROUTES);
