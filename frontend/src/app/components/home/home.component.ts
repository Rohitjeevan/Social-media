import { Component } from '@angular/core';
import { LoginComponentComponent } from '../login-component/login-component.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
