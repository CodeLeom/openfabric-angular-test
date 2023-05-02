import { Component, EventEmitter , Output, Input } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { AppServiceService } from 'src/app/service/app-service.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {
  loading: boolean = false;

  @Output() closeDeleteModal = new EventEmitter();
  @Input() productId!: string;
  @Input() productName!: string;

  constructor(
    private api: AppServiceService,
    private toast: HotToastService
  ){}

  

  handleDelete(){
    // const token = localStorage.getItem('select_user');
    this.loading = true;
    if(this.productId){
      this.api.deleteProduct(this.productId).subscribe({ 
        next: (res) => {
        this.loading = false;
        this.toast.success(this.productName + ' deleted successfully');
        this.closeDeleteModal.emit();
      },
      error: () => {
        this.loading = false;
        this.toast.error('Could not delete ' + this.productName)
      }
    })
    }
  }

}
