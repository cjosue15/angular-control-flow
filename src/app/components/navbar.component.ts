import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <div class="container">
      <nav>
        <ul class="navbar">
          <li><a routerLink="/">Home</a></li>
          <li><a routerLink="/search">Search</a></li>
        </ul>
      </nav>
    </div>
  `,
  standalone: true,
  imports: [RouterModule],
})
export class NavbarComponent {}
