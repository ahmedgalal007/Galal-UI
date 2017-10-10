import {Component, OnInit, Input, OnChanges, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {User} from "../../shared/user";
import {UserService} from "../user.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Input() userItem:User;
  @Input() userId:number;
  subscription: Subscription = new Subscription();
  constructor(private userService: UserService,private router:Router,private route: ActivatedRoute ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) =>{
        this.userId = params['id'];
        console.log(this.userId);
        this.userItem = this.userService.getUser(this.userId);
        console.log(this.userItem);
      }
    )
  }
  ngOnChanges(){

  }
  onEdit(){
    this.router.navigate(['/users', this.userId, 'edit']);
  }

  onDelete(){
    this.userService.deleteUser(this.userItem);
    this.router.navigate(['/users']);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
