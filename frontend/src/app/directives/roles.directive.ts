import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../models/user.model';
import { AppState } from '../store/types';
import { Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[appRoles]'
})
export class RolesDirective implements OnInit, OnDestroy{
  user: Observable<User | null>;
  userSub!: Subscription;

  @Input('appRoles') roles!: string[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store<AppState>
  ) {
    this.user = store.select(state => state.users.user);
  }

  ngOnInit() {
    this.userSub = this.user.subscribe(user => {
      if (user && this.roles.includes(user.role)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  ngOnDestroy() {
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }
}
