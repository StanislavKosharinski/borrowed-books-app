/**
 * Created by strukov on 22.11.16.
 */
import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {User} from "../model/User";
import {Constants} from "../utils/Constants";
import {Observable} from "rxjs";
@Injectable()
export class UserService{

  constructor(private http:Http){}

  register(user:User){
    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options       = new RequestOptions({ headers: headers });

    return this.http.post(Constants.Register, JSON.stringify(user), options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}