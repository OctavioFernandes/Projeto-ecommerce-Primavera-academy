import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../shared/product';
import { ProductsserviceService } from '../shared/productsservice.service';

@Component({
  selector: 'app-produts',
  templateUrl: './produts.component.html',
  styleUrls: ['./produts.component.css']
})
export class ProdutsComponent implements OnInit {

  colorsList: string[] = [];
  typesList: string[] = [];
  totalProducts!: number;
  recPage: number = 6;
  productsList: Product[] = [];
  seeMoreButton: boolean = true;
  url: string[] = [];
  addUrl: string = "";

  secoundImg: boolean = false;


  constructor(private servProd: ProductsserviceService, private router: Router) { }

  ngOnInit(): void {
    this.loadColorsAndTipes();
    this.getPaginateProducts();
    this.filterProducts("StartPage", "");

  }

  loadColorsAndTipes() {
    this.servProd.getProducts().subscribe(response => {
      for (let index = 0; index < response.length; index++) {

        if (!this.colorsList.includes(response[index].cor)) {
          this.colorsList.push(response[index].cor);
        }

        if (!this.typesList.includes(response[index].tipo_de_produto)) {
          this.typesList.push(response[index].tipo_de_produto);
        }
      }

      // this.totalProducts = response.length
      // console.log("totalProducts: "+this.totalProducts)
      this.colorsList.sort();
      this.typesList.sort();
      // console.log(this.colorsList);

      // console.log(this.typesList);
    })
  }

  getPaginateProducts() {
    this.servProd.searchProducts(this.recPage).subscribe(response => {

      this.productsList = response;
      // console.log(this.productsList);

    });
  }

  filterProducts(key: string, value: string) {

    let field: string = "";

    this.addUrl = "";

    switch (key) {

      case "Tipo":
        field = "&tipo_de_produto=" + value;
        // console.log(field);

        if (!this.url.includes(field)) {
          this.url.push(field);

        } else {
          this.url.splice(this.url.indexOf(field), 1);
        }
        break;

      case "Cor":
        field = "&cor=" + value;
        // console.log(field);

        if (!this.url.includes(field)) {
          this.url.push(field);

        } else {
          this.url.splice(this.url.indexOf(field), 1);
        }
        break;

      case "VerMais":
        if ((this.recPage + 6) >= this.totalProducts) {

          this.recPage = this.totalProducts;
          this.seeMoreButton = false;

        } else {
          this.recPage = this.recPage + 6;
        }
        break;

      case "StartPage":
        break;
      // default:
      //   break;
    }

    for (let i = 0; i < this.url.length; i++) {
      this.addUrl += this.url[i];
    }

    console.log(this.recPage);

    this.servProd.filterProducts(this.recPage, this.addUrl).subscribe(response => {
      this.productsList = response;
    });

    this.servProd.filterProductsNew(this.addUrl).subscribe(response => {
      this.totalProducts = response.length;

      console.log("total:produtos" + this.totalProducts);
      if (this.totalProducts <= 6) {
        this.seeMoreButton = false;
      } else if (this.recPage === this.totalProducts) {
        this.seeMoreButton = false;
      }
      else {
        this.seeMoreButton = true;
      }
    });

    //http://localhost:3000/products?limit=6&tipo_de_produto=Calças&cor=Azul&cor=Laranja&tipo_de_produto=Casaco
  }

  showProductInfo(id: number) {
    this.router.navigateByUrl(`/infoproducts/${id}`);
  }

  showSecondImage() {
    console.log("hover")
    // this.secoundImg=true;
  }

  showFirstImage() {
    console.log("out")
    this.secoundImg=false;
  }

}



// <img [src]="'/assets/Imagens/'+product.foto_principal" [alt]="product.nome" class="box">
