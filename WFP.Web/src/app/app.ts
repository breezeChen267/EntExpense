import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="container mx-auto py-6 px-4 md:px-8">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class App {
  protected readonly title = signal('WFP.Web');
}
