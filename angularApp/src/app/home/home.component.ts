import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

  products:any[]=[];

  constructor(private productService : ProductsService){}

  ngOnInit():void {
    this.productService.getProduct().subscribe(
      {
        next:(response) => {
          this.products = response.data;
        },
      });
  }

}
