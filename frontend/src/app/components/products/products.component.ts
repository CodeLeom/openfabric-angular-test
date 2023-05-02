import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { AppServiceService } from 'src/app/service/app-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products!: any;
  loading = false;
  localToken!: string | null;
  p_id!: string;
  p_name!: string;
  p_price!: number;
  p_desc!: string;
  displayAddProductModal: boolean = false; //display button when user records exists in db
  displayEditProductModal: boolean = false;
  displayDeleteProductModal: boolean = false;


  constructor( 
    private api: AppServiceService,
    private router: Router,
    private toast: HotToastService
    ){}




  // toggle 'add product' modal
  addProductModal(value: boolean){ 
    this.displayAddProductModal = value;
  }

 // toggle 'edit product' modal 
  showEditModal(id: string, name: string, price: number, description: string){
    this.displayEditProductModal = true;
    this.p_id = id;
    this.p_name = name;
    this.p_price = price;
    this.p_desc = description;
  }
  closeEditModal(){
    this.displayEditProductModal = false;
    this.p_id = '';
    this.p_name = '';
    this.p_price = 0;
    this.p_desc = '';
  }
  // handle edit action 
  handleEdit(){
    event?.preventDefault();
    this.toast.loading('updating product...')
    this.api.editProduct(this.p_id, this.p_name, this.p_price, this.p_desc)
    .subscribe({
      next: () => {
        this.toast.success('Update Successful');
        this.closeEditModal;
      },
      error: (err) => {
        this.toast.error(err.error.message);
      }
    })
  }

  // toggle 'delete product' modal
  showDeleteModal(id: string, name: string){
    this.displayDeleteProductModal = true;
    this.p_id = id;
    this.p_name = name;
  }
  closeDeleteModal(){
    this.displayDeleteProductModal = false;
    this.p_id = '';
    this.p_name = '';
  }

  // handle prodcut delete
  handleDelete(){
    // const token = localStorage.getItem('select_user');
    this.toast.loading('deleting product...');
    if(this.p_id){
      this.api.deleteProduct(this.p_id).subscribe({ 
        next: (res) => {
        this.toast.success(this.p_name + ' deleted successfully');
        this.closeDeleteModal();
      },
      error: () => {
        this.toast.error('Could not delete ' + this.p_name)
      }
    })
    }
  }




  ngOnInit(): void {
    this.loading = true;

    this.localToken = localStorage.getItem('user_token');

    if(!this.localToken){
      this.loading = false;
    }

    this.api.getAllProducts().subscribe(data => {
      this.loading = false;
      setTimeout(() => {
        this.products = data
      }, 100);
    })

  }





}
