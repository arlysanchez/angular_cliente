import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit{
  product : Product ={
    id: undefined,
    name: "",
    description: "" ,
    price: 0
    
  }
  public titulo:string = "crear producto"

  constructor(private productService: ProductService, private router:Router, private activatedRoute: ActivatedRoute) {
  }; 
  ngOnInit() {
    this.loadProduct()
   }

  //crear un producto
  create() : void{
    this.productService.create(this.product).subscribe(
      product => {
      this.router.navigate(['/product'])
      Swal.fire('Nuevo producto',`producto ${product.name} creado con exito` , 'success')
    });
    //ver en consola el obj
    console.log("Clicked!")
    console.log(this.product)
  }
 //cargar un producto por Id
  loadProduct(): void{
    this.activatedRoute.params.subscribe(params => {
     let id = params['id']
     if(id){
       this.productService.getProductsByid(id).subscribe( (product) => this.product = product)
     }
    })
   }
   update(): void{
    //ver en consola el obj
    console.log(this.product)
this.productService.update(this.product)
.subscribe(product => {
this.router.navigate(['/product'])
Swal.fire(' producto Actualizado',`Producto ${product.name} actualizado con exito` , 'success')
});
console.log(this.product)
}
}
