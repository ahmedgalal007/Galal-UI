import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute,Router,RouterStateSnapshot} from "@angular/router";
import {User} from "../../shared/user";
import {UserService} from "../user.service";
import {FormArray, FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {Role} from "../../shared/user-group";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit, OnDestroy {
  isNew=true;
  userId: number = 0;
  currentUser: User;
  subscription: Subscription = new Subscription();

  userForm: FormGroup;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) =>{
        if(params.hasOwnProperty('id')){
          this.isNew = false;
          this.userId = params['id'];
          this.currentUser = this.userService.getUser(this.userId);
        }
      }
    );

    this.userForm=this.createForm();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit(){
    let userRoles: Role[] = [];
    for(let roleName of (<FormArray>this.userForm.controls['roles']).controls ){
      userRoles.push(this.userService.getRoleByName(roleName.value));
    }
    if(this.isNew){
      this.userService.addUser(this.userForm.controls['name'].value,this.userForm.controls['email'].value, userRoles);
    }else{
      this.userService.putUser(new User(this.userId,this.userForm.controls['name'].value,this.userForm.controls['email'].value, userRoles));
    }
    this.navigateBack();
  }

  onAddRole(){
    (<FormArray>this.userForm.controls['roles']).controls.push(new FormControl('', Validators.required));
  }

  navigateBack(){
    this.router.navigate(['/users']);
  }
  createForm(){
    let userName: string ='', email: string='', rolesArray: FormArray = new FormArray([]);
    if(!this.isNew){
      userName=this.currentUser.name;
      email=this.currentUser.email;
      for(let role of this.currentUser.userGroups){
        rolesArray.controls.push(
          new FormControl(role.name, Validators.required)
        )
      }
    }
    let form:FormGroup = new FormGroup({
      name : new FormControl(userName,Validators.required),
      email: new FormControl(email,[ Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      roles: rolesArray
    });
    return form;
  }

  getFormGroupCtl(CTL){
    return (<FormGroup> this.userForm.controls[CTL]).controls;
  }
}
