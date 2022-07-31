import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public username: string = '';
  public password: string = '';

  constructor(
    public spinnerService: SpinnerService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinnerService.hide();
  }

  getX22Data(x22: string): any {
    try {
      return jwt_decode(x22);
    } catch (err) {
      return null;
    }
  }

  submit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (data) => {
        var fullName: string = this.getX22Data(data.token)["fullName"]
        this.authService.setToken(data.token);
        this.authService.setUsername(fullName);
        this.spinnerService.hide();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log('error: ' + err);
      },
    });
  }
}
