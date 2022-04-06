import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { HelpersService } from '../../services/helpers.service';
import { Router } from '@angular/router';
import {
  createCocktailFailure,
  createCocktailRequest, createCocktailSuccess,
  fetchCocktailsFailure,
  fetchCocktailsRequest,
  fetchCocktailsSuccess
} from './cocktails.actions';
import { CocktailsService } from '../../services/cocktails.service';

@Injectable()

export class CocktailsEffects {
  fetchCocktails = createEffect(() => this.actions.pipe(
    ofType(fetchCocktailsRequest),
    mergeMap(id => this.cocktailsService.getAll().pipe(
      map(cocktails => fetchCocktailsSuccess({cocktails})),
      catchError(() => of(fetchCocktailsFailure({
        error: 'Something went wrong'
      })))
    )
  )));

  createCocktail = createEffect(() => this.actions.pipe(
    ofType(createCocktailRequest),
    mergeMap(({cocktailData}) => this.cocktailsService.addCocktail(cocktailData).pipe(
        map(() => createCocktailSuccess()),
        tap(() => {
          this.helpers.openSnackbar('Cocktail added');
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
  ) {}
}
