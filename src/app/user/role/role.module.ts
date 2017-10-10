/**
 * Created by ahmedgalal on 2/25/17.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RoleRouting} from "./role.routes";

import {RoleEditComponent} from "./role-detail/role-edit.component";
import {RoleStartComponent} from "./role-start.component";
import {RoleItemComponent} from "./role-list/role-item.component";
import {RoleListComponent} from "./role-list/role-list.component";
import {RoleDetailComponent} from "./role-detail/role-detail.component";
import {RoleComponent} from "./role.component";


@NgModule({
  declarations:[
    RoleComponent,
    RoleDetailComponent,
    RoleListComponent,
    RoleItemComponent,
    RoleStartComponent,
    RoleEditComponent],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    RoleRouting,
  ]
})
export class RoleModule{

}
