import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, of } from "rxjs";
import { environment } from "../environment/environment";
import { Category, CategoryCreateInput } from "../data/category";

@Injectable()
export class CategoryService {
  private categoriesUrl = `${environment.apiUrl}v1/categories`;

  constructor(private http: HttpClient){}

  getAll() : Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl).pipe(catchError(this.handleError<Category[]>('getAll')));
  }
  
  create(category: CategoryCreateInput): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category);
  }

  update(category: Category): Observable<Category> {
    return this.http.put<Category>(this.categoriesUrl, category)
      .pipe(
        catchError(this.handleError<Category>('update', category))
      )
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error); // log to console
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  delete(category: Category): Observable<boolean> {
    return this.http.delete<boolean>(`${this.categoriesUrl}/${category.id}`);
  }
}