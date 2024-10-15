import { Component, inject, OnInit } from '@angular/core';
import { BG_IMG_URL, LOGO_URL } from '../../constants/config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    if (this.loginService.isLoggedIn) {
      this.router.navigateByUrl("/browse")
    }
  }
  
  bgUrl = BG_IMG_URL;

  email!: string;
  password!: string;
  loginService = inject(LoginService);
  router = inject(Router);
  toastrService = inject(ToastrService);

  onSubmit() {
    if (!this.email || !this.password) {
      this.toastrService.error("provide email or password");
      return;
    }
    this.loginService.login(this.email, this.password);
    this.toastrService.success("Login Successfully")
    this.router.navigateByUrl("/browse");
  }
}
