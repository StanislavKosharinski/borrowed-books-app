/**
 * Created by strukov on 15.11.16.
 */
export class Constants{
  private static get API_URL():string {return 'https://books.strukov.eu/api/books'}
  public static get GoogleAPI():string {return 'https://www.googleapis.com/books/v1/volumes'}
  public static get OAuthURL():string {return this.API_URL + '/oauth/token'}
  public static get LogoutURL():string {return this.API_URL + '/v1/user/logout'}
  public static get LoggedInUser():string{return this.API_URL + '/v1/user/me'}
  public static get Register():string{return this.API_URL + '/register'}
  public static get Books():string{return this.API_URL + '/v1/owned'}
  public static get API_KEY():string {return 'AIzaSyBfeYjfXYq_kccfOb-wRPnRw5f_ED5hpaA'}
  public static get CheckOwnedBook():string {return this.API_URL + '/v1/owned/check'}
  public static get LoginModal():JQuery {return $('#login') }
  public static get BookInfoModal():JQuery {return $('#bookinfo') }
}
