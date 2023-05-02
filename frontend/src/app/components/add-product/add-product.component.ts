import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AppServiceService } from 'src/app/service/app-service.service';

type FormProps = {
  name: string,
  description: string
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  
  constructor(
    private fb: FormBuilder,
    private api: AppServiceService,
    private toast: HotToastService
    ) {}

  @Output() addProductModal = new EventEmitter();

  loading: boolean = false;

  newProductForm = this.fb.group({
      name: ['', [Validators.required]],
      price: [0],
      description: ['', [Validators.required]],
    });
    
  
  onSubmit(){
    event?.preventDefault();
    this.loading = true;
    if(this.newProductForm.value.name && this.newProductForm.value.price && this.newProductForm.value.description){
      this.api.postProduct(this.newProductForm.value.name,this.newProductForm.value.price, this.newProductForm.value.description)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.newProductForm.value.name = "" ;
          this.newProductForm.value.price = 0;
          this.newProductForm.value.description = "";
          this.toast.success('Product added successfully!')
          this.addProductModal.emit();
        },
        error: (err) => { 
        this.loading = false;
        this.toast.error(err.error.message);
        }
      })
    }
  }

  get name(){
    return this.newProductForm.get('name');
  }
  get description(){
    return this.newProductForm.get('description');
  }


}