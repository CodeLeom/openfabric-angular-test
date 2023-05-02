import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/service/app-service.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {

  constructor( 
    private fb: FormBuilder,
    private api: AppServiceService,
    private router: Router,
    private toast: HotToastService
  ){}

  loading: boolean = false;

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit(){
    this.loading = true;
    if(this.registerForm.value.name && this.registerForm.value.email && this.registerForm.value.password){
      this.api.userRegistration(this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password)
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          localStorage.setItem('user_data', JSON.stringify(res));
          localStorage.setItem('user_token', res.token);
          this.router.navigate(['/all-products']);
          console.log(res);
        },
        error: (err) => {
          this.loading = false;
          console.log(err);
          this.toast.error(err.error.message);
          if(err.status === 400){
            this.router.navigate(['/login']);
          }
        }
      })
    }
  }

  get name(){
    return this.registerForm.get('name');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }
}
