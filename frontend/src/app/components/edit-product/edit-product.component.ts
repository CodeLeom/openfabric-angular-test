import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AppServiceService } from 'src/app/service/app-service.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  @Output() closeEditModal = new EventEmitter();
  @Output() handleEdit = new EventEmitter();
  @Input() id!: string;
  @Input() name!: string;
  @Input() price!: number;
  @Input() description!: string;

  loading: boolean = false;


  constructor( 
    private fb: FormBuilder,
    private api: AppServiceService,
    private toast: HotToastService
   ){}

  editProductForm = this.fb.group({
    name: [this.name, [Validators.required]],
    price: [0],
    description: [this.name, [Validators.required]],
  });

  

  get product_name(){
    return this.editProductForm.get('name');
  }

  get product_description(){
    return this.editProductForm.get('description');
  }
  
}
