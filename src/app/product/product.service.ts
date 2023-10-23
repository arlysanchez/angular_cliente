import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private urlEndPoint:string ='http://localhost:8080/api/products'
  private httpHeaders = new   HttpHeaders({'Content-type': 'application/json'})

  constructor(private http:HttpClient) { }

  getProduct():Observable<Product[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Product[])
    );
  }

  delete(id: any) : Observable<Product>{
    return this.http.delete<Product>(`${this.urlEndPoint}/${id}`,{headers:this.httpHeaders})
  }
  //service para crear un producto
  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.urlEndPoint,product,{headers:this.httpHeaders})
  }
  //service para traer un producto
  getProductsByid(id:any): Observable<Product>{
    return this.http.get<Product>(`${this.urlEndPoint}/${id}`)
  }
  //servicio para actualizar un producto
   update(product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.urlEndPoint}/${product.id}`,product,{headers:this.httpHeaders})
   }
}
