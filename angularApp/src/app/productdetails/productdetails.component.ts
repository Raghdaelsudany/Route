import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})

export class ProductdetailsComponent implements OnInit{
  productDetails:any;
  productId:any;

  constructor(private activatedRoute: ActivatedRoute,private productService:ProductsService){}

  ngOnInit():void{
    this.activatedRoute.paramMap.subscribe((params)=>{
      this.productId = params.get('id')
    });

    this.productService.getProductDetails(this.productId).subscribe(
      {
        next:(response) => {
          this.productDetails = response.data;
        },
      });
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }

}


