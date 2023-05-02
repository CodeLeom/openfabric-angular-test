import { Component } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';
import { AppServiceService } from 'src/app/service/app-service.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  constructor( 
    private fb: FormBuilder,
    private api: AppServiceService,
    private router: Router,
    private toast: HotToastService
    ){}

  loading: boolean = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit(){
    this.loading = true;
    if(this.loginForm.value.email && this.loginForm.value.password){
      this.api.userlogin(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          // localStorage.setItem('user_data', JSON.stringify(res));
          localStorage.setItem('user_token', res.token);
          this.toast.success('Login successful')
          this.router.navigate(['/all-products']);
        },
        error:(err) => {
          this.loading = false
          this.toast.error(err.error.message);
        }
      })
    }
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }
}
