export interface Cocktail {
  readonly _id: string,
  readonly user: {
    _id: string,
    displayName: string
  },
  readonly title: string,
  readonly image: string,
  readonly recipe: string,
  readonly isPublished: boolean,
  readonly ingredients: Ingredients[]
}

export interface Ingredients {
  readonly title: string,
  readonly amount: string
}

export class CocktailModel {
  constructor(
    public _id: string,
    public user: {
      _id: string,
      displayName: string
    },
    public title: string,
    public image: string,
    public recipe: string,
    public isPublished: boolean,
    public ingredients: Ingredients[]
  ) {}
}

export interface CocktailData {
  [key: string]: any,
  user: string,
  title: string,
  image: File | null,
  recipe: string,
  ingredients: Ingredients[]
}

export interface CocktailPublish {
  isPublished: boolean,
}
