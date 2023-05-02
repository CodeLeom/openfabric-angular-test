import { Component, EventEmitter , Output, Input } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { AppServiceService } from 'src/app/service/app-service.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {

  @Output() closeDeleteModal = new EventEmitter();
  @Output() handleDelete = new EventEmitter();
  @Input() productId!: string;
  @Input() productName!: string;

  constructor(
    private api: AppServiceService,
    private toast: HotToastService
  ){}

  



}
