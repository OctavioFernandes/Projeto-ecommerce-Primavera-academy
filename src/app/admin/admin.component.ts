import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../shared/product';
import { ProductsserviceService } from '../shared/productsservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  productForm!: FormGroup;
  productTypes: string[] = [];

  filterProducts: Product[] = [];
  recPage:number = 10;

  constructor(private servProd: ProductsserviceService) { }

  ngOnInit(): void {

    this.productForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      marca: new FormControl('', [Validators.required]),
      tipo_de_produto: new FormControl('', [Validators.required]),
      cor: new FormControl('', [Validators.required]),
      preco: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      foto_principal: new FormControl(' ', [Validators.required]),
      foto_secundaria: new FormControl(' ', [Validators.required]),
      destaque: new FormControl(false, [Validators.required])

    });

    this.loadTipes();

    this.getProducts("");

  }

  loadTipes() {
    this.servProd.getProducts().subscribe(response => {

      for (let index = 0; index < response.length; index++) {
        if (!this.productTypes.includes(response[index].tipo_de_produto)) {
          this.productTypes.push(response[index].tipo_de_produto);
        }}

        console.log(this.productTypes)
    });
  }

  insertProduct(){

    console.log(this.productForm);

    if (this.productForm.valid) {

      this.servProd.insertProduct(this.productForm.value).subscribe(response=>{
        // console.log("inserido produto");
        this.productForm.reset();
        // console.log(this.productForm);
      })      
    } 
    // else {      
    // }  
  }

  getProducts(searchedContent:string){

    let filter = `&nome_like=${searchedContent.trim()}`;

    this.servProd.filterProducts(filter, this.recPage).subscribe(response=>{
     this.filterProducts = response;
     console.log(this.filterProducts);
    });

  }


  deleteProduct(id : number){
    this.servProd.deleteProduct(id).subscribe(resposnse=>{
      this.getProducts("");
    });
  }


}