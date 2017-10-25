import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Routing} from './app.routes';

import {ACLService} from './shared/acl.service';
import { UserService, RoleService} from './user';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppHeaderComponent } from './app-header.component';

import {GalalUIModule} from './shared/galal-UI/galalUI.module';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppHeaderComponent
  ],
  entryComponents: [ ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    Routing,
    ModalModule.forRoot([]),
    BootstrapModalModule,
    BrowserAnimationsModule,
    GalalUIModule,
  ],
  providers: [UserService, RoleService, ACLService],
  bootstrap: [AppComponent]
})
export class AppModule { }

