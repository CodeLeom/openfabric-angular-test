import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
 
  private baseUrl = 'http://localhost:3005';
  constructor(private http: HttpClient) { }


  headers = { 'Authorization': 'Bearer bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDlhNDljMDJkMzk2YmM2MGIxMGQ1MCIsImlhdCI6MTY4MzAyNTYxNywiZXhwIjoxNjg1NjE3NjE3fQ.psFwVxZFTPuNS_X8YAeXDxOlIpKJGY8rxcGRFlOYnqs'}

  getLocalData(){
    const data = localStorage.getItem('user_data');
    if(data){
      return JSON.parse(data)
    }
  }

  // User service 
  userlogin(email: string, password: string){
    return this.http.post(`${this.baseUrl}/api/users/login`, {
      email,
      password
    })
  };

  userRegistration(name: string, email: string, password: string){
    return this.http.post(`${this.baseUrl}/api/users`, {
      name,
      email,
      password
    })
  }

  // products service 
  postProduct(name: string, price: number, description: string){
    return this.http.post(`${this.baseUrl}/api/products`, {
      name,
      price,
      description
    })
  }

  deleteProduct(id: string){
    return this.http.delete(`${this.baseUrl}/api/products/${id}`)
  }

  editProduct(id: string, name: string, price: number, description: string){
    return this.http.put(`${this.baseUrl}/api/products/${id}`, {
      name,
      price,
      description
    })
  }

  // getSingleProduct(id: string){
  //   return this.http.get(`${this.baseUrl}/api/products/${id}`)
  // }

  getAllProducts(): Observable<any>{
    return this.http.get(`${this.baseUrl}/api/products`);
  }






}
