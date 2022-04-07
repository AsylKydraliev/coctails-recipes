import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cocktail, CocktailData, CocktailModel, CocktailPublish } from '../models/cocktail.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Cocktail[]>(environment.apiUrl + '/cocktails').pipe(
      map(response => {
        return response.map(cocktails => {
          return new CocktailModel(
            cocktails._id,
            cocktails.user,
            cocktails.title,
            cocktails.image,
            cocktails.recipe,
            cocktails.isPublished,
            cocktails.ingredients,
          )
        });
      }),
    )
  };

  getCocktailsByUser(id: string) {
    return this.http.get<Cocktail[]>(environment.apiUrl + `/cocktails?user=${id}`).pipe(
      map(response => {
        return response.map(cocktails => {
          return new CocktailModel(
            cocktails._id,
            cocktails.user,
            cocktails.title,
            cocktails.image,
            cocktails.recipe,
            cocktails.isPublished,
            cocktails.ingredients,
          )
        });
      }),
    )
  };

  addCocktail(cocktailData: CocktailData) {
    const formData = new FormData();

    Object.keys(cocktailData).forEach(key => {
      if(cocktailData[key] !== null){
        if(key !== 'ingredients'){
          formData.append(key, cocktailData[key]);
        }else {
          formData.append(key, JSON.stringify(cocktailData[key]));
        }
      }
    })

    return this.http.post(environment.apiUrl + '/cocktails', formData);
  }

  published(cocktailPublish: CocktailPublish, id: string) {
    return this.http.post(environment.apiUrl + '/cocktails/' + id + '/publish', cocktailPublish);
  }

  remove(id: string) {
    return this.http.delete(environment.apiUrl + '/cocktails/' + id);
  }
}
