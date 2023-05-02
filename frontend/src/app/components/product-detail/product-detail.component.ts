import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AppServiceService } from 'src/app/service/app-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  productId!: string;
  productDetail: any;
  loading: boolean = false;
  constructor( 
    private router: Router,
    private actRoute: ActivatedRoute,
    private api: AppServiceService,
    private toast: HotToastService
    ){}

  getProductDetails(id: string){
    this.loading = true;
    this.api.getSingleProduct(id).subscribe({
      next: (res) => {
        this.loading = false;
        this.toast.success('fetch successful');
        this.productDetail = res;
      },
      error: (err) => {
        this.toast.error(err.error.message);
      }
    })
  }


  ngOnInit(){
    this. productId = this.actRoute.snapshot.params['id'];
    this.getProductDetails(this.productId);
  }

}
