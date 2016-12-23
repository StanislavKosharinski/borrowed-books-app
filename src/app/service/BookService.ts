import {Injectable} from "@angular/core";
import {Http, URLSearchParams, Response} from "@angular/http";
import {Constants} from "../utils/Constants";
import 'rxjs/Rx';
import {Book} from "../model/Book";
import {Authentication} from "../utils/Authentication";
import {OwnedBook} from "../model/OwnedBook";
import {Observable} from "rxjs";
import {BookItems} from "../model/BookItems";
import {BorrowedBook} from "../model/BorrowedBook";
/**
 * Created by strukov on 15.11.16.
 */

@Injectable()
export class BookService{
  public startIndex: any;
  public ownedBooks:Array<OwnedBook>;
  constructor(private http:Http, private auth:Authentication){}

  public getBooksByTitle(title:string):Observable<BookItems>{
    let params = new URLSearchParams();
    params.set('q', title);
    params.set('startIndex', this.startIndex);
    params.set('printType', 'books');
    params.set('filter', 'partial');
    params.set('projection', 'lite');
    params.set('key', Constants.API_KEY);
    return this.http.get(Constants.GoogleAPI, {search: params}).map(response => response.json());
  }

  public getBookWithCheck(id:string):Observable<any>{
    let params = new URLSearchParams();
    params.set("id", id);
    return Observable.forkJoin(
      this.http.get(Constants.GoogleAPI + '/' + id)
        .map(response => response.json()),
      this.http.get(Constants.CheckOwnedBook, {search: params, headers: this.auth.setAuthHeaders()})
        .map(response=>response.json())
    );
  }

  public getBookWithoutCheck(id:string):Observable<Book>{
    return this.http.get(Constants.GoogleAPI + '/' + id).map(response=>response.json());
  }

  public getUserBooks():Observable<Array<OwnedBook>>{
    return this.http.get(Constants.OwnedBooks, {headers: this.auth.setAuthHeaders()})
      .map(response => response.json());
  }

  public deleteUserBook(id:number):Observable<Response>{
    let params = new URLSearchParams();
    params.set("id", id.toString());
    return this.http.delete(Constants.OwnedBooks, {search: params, headers: this.auth.setAuthHeaders()});
  }

  public saveBook(ownedBook:OwnedBook):Observable<OwnedBook>{
    return this.http.post(Constants.OwnedBooks, JSON.stringify(ownedBook), {headers: this.auth.setAuthHeaders()})
      .map(response => response.json());
  }

  public borrowBook(borrowedBook:BorrowedBook):Observable<any>{
    return Observable.forkJoin(
      this.http.post(Constants.BorrowedBooks, JSON.stringify(borrowedBook), {headers: this.auth.setAuthHeaders()})
        .map(response => response.json()),
      this.http.put(Constants.OwnedBooks, JSON.stringify(borrowedBook.ownedBook), {headers: this.auth.setAuthHeaders()})
        .map(response => response.json()));
  }

  public updateUserBook(ownedBook:OwnedBook){
    return this.http.put(Constants.OwnedBooks, JSON.stringify(ownedBook), {headers: this.auth.setAuthHeaders()})
      .map(response=>response.json());
  }

}
