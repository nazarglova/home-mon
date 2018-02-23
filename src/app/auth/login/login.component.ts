import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: Message;

  constructor(private usersService: UsersService,
              private autghService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.message = new Message('danger', '');

    this.route.queryParams.subscribe((params: Params) => {
      if (params['nowCanLogin']) {
        this.showMessage({
          text: 'Now you can login in system',
          type: 'success'
        });
      }
    });
    this.form = new FormGroup({
      'email': new FormControl('wfm@mail.ru', [Validators.required, Validators.email]),
      'password': new FormControl('123123', [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            //logic
            this.autghService.login();
            window.localStorage.setItem('user', JSON.stringify(user));
            // this.router.navigate([''])
          } else {
            this.showMessage({
              text: 'Wrong Password!',
              type: 'danger'
            });
          }
        } else {
          this.showMessage({
            text: 'No user!',
            type: 'danger'
          });
        }
        console.log(user);
      });
  }
}
