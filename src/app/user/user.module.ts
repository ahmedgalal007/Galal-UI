/**
 * Created by ahmedgalal on 2/25/17.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {UserRouting} from "./user.routes";

import {UserComponent} from "./user.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {UserListComponent} from "./user-list/user-list.component";
import {UserItemComponent} from "./user-list/user-item.component";
import {UserEditComponent} from "./user-detail/user-edit.component";
import {UserStartComponent} from "./user-start.component";

@NgModule({
  declarations:[
    UserComponent,
    UserDetailComponent,
    UserListComponent,
    UserItemComponent,
    UserEditComponent,
    UserStartComponent
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    //RoleModule,
    UserRouting

    ]
})
export class UserModule{

}
