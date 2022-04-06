import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';

@Directive({
  selector: '[appHasRoles]'
})
export class HasRolesDirective implements OnInit, OnDestroy{
  user: Observable<User | null>;
  userSub!: Subscription;

  @Input('appHasRoles') roles!: {
    role: string[],
    published?: boolean,
  };

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store<AppState>
  ) {
    this.user = store.select(state => state.users.user);
  }

  ngOnInit() {
    this.userSub = this.user.subscribe(user => {
      this.viewContainer.clear();

      if(user?.role === 'admin'){
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else if((user?.role === 'user' && this.roles.published === true) || (!user && this.roles.published === true)){
          this.viewContainer.createEmbeddedView(this.templateRef);
      }
    })
  }

  ngOnDestroy() {
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }
}
