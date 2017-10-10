import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Role} from "../../../shared/user-group";
import {Subscription} from "rxjs";
import {RoleService} from "../role.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styles: []
})
export class RoleDetailComponent implements OnInit, OnDestroy {

  @Input() roleItem:Role;
  @Input() roleId:number;
  subscription: Subscription = new Subscription();
  constructor(private roleService: RoleService,private router:Router,private route: ActivatedRoute ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) =>{
        this.roleId = params['id'];
        console.log(this.roleId);
        this.roleItem = this.roleService.getRoleById(this.roleId);
        console.log(this.roleItem);
      }
    )
  }

  onEdit(){
    this.router.navigate(['/roles', this.roleId, 'edit']);
  }

  onDelete(){
    this.roleService.deleteRole(this.roleItem);
    this.router.navigate(['/roles']);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
