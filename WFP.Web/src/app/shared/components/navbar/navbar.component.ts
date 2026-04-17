import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="navbar bg-[#020617] text-slate-100 sticky top-0 z-50 shadow-2xl px-4 md:px-12 h-14 border-b border-white/10">
      <div class="flex-1">
        <a class="btn btn-ghost text-lg font-bold tracking-widest hover:bg-transparent">
          <span class="border-l-4 border-primary pl-3">
             WFP 費用申請管理系統
          </span>
        </a>
      </div>
      <div class="flex-none gap-2">
        <div class="form-control hidden md:block">
          <input type="text" placeholder="Search Application..." class="input input-bordered w-24 md:w-auto h-10" />
        </div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar border border-base-300">
            <div class="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="https://ui-avatars.com/api/?name=Lovel&background=0D8ABC&color=fff" />
            </div>
          </div>
          <ul tabindex="0" class="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200">
            <li>
              <a class="justify-between">
                Profile
                <span class="badge badge-primary">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a class="text-error">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class NavbarComponent {}
