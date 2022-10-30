import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginserviceService } from '../header/loginservice.service';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsserviceService {

  private urlAPI = "http://localhost:3000/products";

  addUrl! :string;

  // public urlAPIseacrh : string = "http://localhost:3000/products";

  constructor(private http: HttpClient, private servLogin: LoginserviceService) { }

  getProducts() {
    return this.http.get<Product[]>(this.urlAPI);
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${this.urlAPI}/${id}`);
  }

  searchProducts(recPage: number) {

    return this.http.get<Product[]>(`${this.urlAPI}?_limit=${recPage}`)

  }

  // console.log(`${this.urlAPI}?_limit=${recPage}${filter}`);
  // filterProducts(recPage: number, filter: string) {
  //   return this.http.get<Product[]>(`${this.urlAPI}?_limit=${recPage}${filter}`);
  // }

  filterProducts(filter: string, recPage?: number) {
    // console.log("recPage:");
    // console.log(`${this.urlAPI}?_limit=${recPage}${filter}`);

    if (recPage === undefined) {
      return this.http.get<Product[]>(`${this.urlAPI}?${filter}`);
    } else {
      return this.http.get<Product[]>(`${this.urlAPI}?_limit=${recPage}${filter}`);
    }
  }

  filterWishlist(){

    this.addUrl = "";

    for (let i = 0; i < this.servLogin.user.wishlist?.length!; i++) {
      this.addUrl += "&id=" + this.servLogin.user.wishlist![i];      
    };

    // console.log("url: "+`${this.urlAPI}?${this.addUrl}`);

    return this.http.get<Product[]>(`${this.urlAPI}?${this.addUrl}`);
  }

  //http://localhost:3000/products?tipo_de_produto=Calças&cor=Azul&_limit=100

  //http://localhost:3000/products?limit=6&tipo_de_produto=Calças&cor=Azul&cor=Laranja&tipo_de_produto=Casaco


  // pesquisaPhotos(pesquisa : string, initial : number, recPage: number) {
  //   return this.http.get<Photo[]>(`${this.urlAPI}?title_like=${pesquisa}&_start=${initial}&_limit=${recPage}`, { observe : 'response' })
  //     .pipe(
  //       catchError(this.processaErro)
  //     );
  // }

}
