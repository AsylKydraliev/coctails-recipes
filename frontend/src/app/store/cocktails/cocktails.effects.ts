import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';
import { HelpersService } from '../../services/helpers.service';
import { Router } from '@angular/router';
import {
  createCocktailFailure,
  createCocktailRequest, createCocktailSuccess,
  fetchCocktailsFailure,
  fetchCocktailsRequest,
  fetchCocktailsSuccess, fetchCocktailsUserFailure, fetchCocktailsUserRequest, fetchCocktailsUserSuccess
} from './cocktails.actions';
import { CocktailsService } from '../../services/cocktails.service';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { User } from '../../models/user.model';

@Injectable()

export class CocktailsEffects {
  user: Observable<User | null>;
  userRole!: string | undefined;

  fetchCocktails = createEffect(() => this.actions.pipe(
    ofType(fetchCocktailsRequest),
    mergeMap(() => this.cocktailsService.getAll().pipe(
      map(cocktails => fetchCocktailsSuccess({cocktails})),
      catchError(() => of(fetchCocktailsFailure({
        error: 'Something went wrong'
      })))
    )
  )));

  fetchCocktailsByUser = createEffect(() => this.actions.pipe(
    ofType(fetchCocktailsUserRequest),
    mergeMap(({userId}) => this.cocktailsService.getCocktailsByUser(userId).pipe(
        map(cocktails => fetchCocktailsUserSuccess({cocktails})),
        catchError(() => of(fetchCocktailsUserFailure({
          error: 'Something went wrong'
        })))
      )
    )));

  createCocktail = createEffect(() => this.actions.pipe(
    ofType(createCocktailRequest),
    mergeMap(({cocktailData}) => this.cocktailsService.addCocktail(cocktailData).pipe(
        map(() => createCocktailSuccess()),
        tap(() => {
          if(this.userRole === 'admin'){
            this.helpers.openSnackbar('Cocktail added');
          }else {
            this.helpers.openSnackbar('Your cocktail is being reviewed by a moderator');
          }
          void this.router.navigate(['/']);
        }),
        catchError(() => of(createCocktailFailure({
          error: 'Something went wrong!'
        })))
      )
    ))
  );
  //
  // publishAlbum = createEffect(() => this.actions.pipe(
  //   ofType(publishAlbumRequest),
  //   mergeMap(({albumPublish, id}) => this.albumsService.publishAlbum(albumPublish, id).pipe(
  //       map(() => publishAlbumSuccess()),
  //       tap(() => {
  //         this.helpers.openSnackbar('Album published');
  //       }),
  //     )
  //   ))
  // );
  //
  // removeAlbum = createEffect(() => this.actions.pipe(
  //   ofType(removeAlbumRequest),
  //   mergeMap(({id}) => this.albumsService.removeAlbum(id).pipe(
  //       map(() => removeAlbumSuccess()),
  //       tap(() => {
  //         this.helpers.openSnackbar('Album deleted');
  //       }),
  //     )
  //   ))
  // );

  constructor(
    private cocktailsService: CocktailsService,
    private actions: Actions,
    private helpers: HelpersService,
    private router: Router,
    private store: Store<AppState>,
  ) {
    this.user = store.select(state => state.users.user);
    this.user.subscribe(user => {
      this.userRole = user?.role;
    })
  }
}
