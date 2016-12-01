import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {InfiniteScrollModule} from "angular2-infinite-scroll";
import {LoginRegisterModal} from "./directives/login.directive";
import {Routes, RouterModule} from "@angular/router";
import {UserBooks} from "./directives/userbooks.directive";
import {Authentication} from "./utils/Authentication";
import {CanActivateViaAuth} from "./utils/CanActivateViaAuth";
import {SearchBooks} from "./directives/searchbooks.directive";
import {BookService} from "./service/BookService";
import {UserService} from "./service/UserService";

const appRoutes: Routes = [
  {path: '', redirectTo: 'library', pathMatch: 'full'},
  {path: 'search', component:SearchBooks},
  {path: 'library', component: UserBooks, canActivate: [CanActivateViaAuth]}
];


@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterModal,
    UserBooks,
    SearchBooks
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [Authentication, CanActivateViaAuth, BookService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
