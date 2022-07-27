import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public username: string = ""
  public password: string = ""

  constructor(public spinnerService: SpinnerService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.spinnerService.hide();
  }

  submit() {
    this.authService.login(this.username, this.password).subscribe(
      {
        next: (data) => {
          this.authService.setToken(data.token)
          this.spinnerService.hide()
          this.router.navigate(['/home'])
        },
        error: (err) => {
          console.log("error: " + err)
        }
      }
    )
  }

}
