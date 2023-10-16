import { Component } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products: Product[] = [];
  private productService: ProductService

  constructor(productService: ProductService) {
    this.productService = productService
  }
  ngOnInit(){
    this.productService.getProduct().subscribe(
      products  => this.products = products
    )
  }

  delete(product: Product): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que deseas eliminar al producto ${product.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete(product.id).subscribe(
          response => {
            this.products = this.products.filter(cli => cli !==product)
            swalWithBootstrapButtons.fire(
              'Prodcuto Eliminado!',
              `¿Producto ${product.name} eliminado con éxito`,
              'success'
            )
          }
        )
       
      }
    })
  }

}
