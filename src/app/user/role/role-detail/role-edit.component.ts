import {Component, OnInit, OnDestroy} from '@angular/core';
import {Role} from "../../../shared/user-group";
import {Subscription} from "rxjs";
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {RoleService} from "../role.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styles: []
})
export class RoleEditComponent implements OnInit, OnDestroy {

  isNew=true;
  roleId: number = 0;
  currentRole: Role;
  subscription: Subscription = new Subscription();

  roleForm: FormGroup;
  constructor(private roleService: RoleService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) =>{
        if(params.hasOwnProperty('id')){
          this.isNew = false;
          this.roleId = params['id'];
          this.currentRole = this.roleService.getRoleById(this.roleId);
        }
      }
    );

    this.roleForm=this.createForm();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit(){
    if(this.isNew){
      this.roleService.addRole(this.roleForm.controls['name'].value);
    }else{
      this.roleService.putRole(new Role(this.roleId,this.roleForm.controls['name'].value));
    }
    this.navigateBack();
  }

  navigateBack(){
    this.router.navigate(['/roles']);
  }
  createForm(){
    let roleName: string ='';
    if(!this.isNew){
      roleName=this.currentRole.name;
    }
    let form:FormGroup = new FormGroup({
      name : new FormControl(roleName,Validators.required)
    });
    return form;
  }

}
