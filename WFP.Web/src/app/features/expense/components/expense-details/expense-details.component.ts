import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseStateService } from '../../../../core/services/expense-state.service';

@Component({
  selector: 'app-expense-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card bg-[#1e293b] shadow-2xl border border-slate-700/50 overflow-hidden">
      <div class="bg-[#1e293b] border-b border-slate-700 px-6 py-4 flex justify-between items-center">
        <h2 class="font-bold text-white text-base flex items-center gap-3 tracking-widest uppercase">
          <div class="p-1 bg-primary rounded-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
            </svg>
          </div>
          費用明細
        </h2>
        <button class="btn btn-xs btn-outline btn-primary font-bold" (click)="addPlaceholderDetail()">
          + 新增費用明細
        </button>
      </div>

      <div class="p-6 space-y-4">
        <!-- List of Details -->
        <div class="space-y-1">
          <div *ngFor="let d of state.details(); let i = index" class="p-3 bg-[#0f172a] border border-slate-700 relative animate-fade-in group">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
              <div class="form-control md:col-span-3">
                <span class="text-xs font-bold text-slate-300 uppercase mb-1 tracking-wider">種類</span>
                <select [(ngModel)]="d.type" class="bg-slate-800 border border-slate-700 text-sm h-6 px-1 outline-none focus:border-primary font-bold text-white flex items-center">
                  <option value="">請選擇</option>
                  <option value="A0001">一般費用</option>
                  <option value="B0002">差旅費</option>
                </select>
              </div>
              <div class="form-control md:col-span-2">
                <span class="text-xs font-bold text-slate-300 uppercase mb-1 tracking-wider">金額</span>
                <input type="number" [(ngModel)]="d.amount" class="bg-slate-800 border border-slate-700 text-sm h-6 px-2 outline-none font-mono focus:border-primary font-bold text-white" />
              </div>
              <div class="form-control md:col-span-6">
                <span class="text-xs font-bold text-slate-300 uppercase mb-1 tracking-wider">費用摘要</span>
                <input 
                  type="text" 
                  [(ngModel)]="d.description" 
                  (keydown.enter)="addPlaceholderDetail()"
                  class="bg-slate-800 border border-slate-700 text-sm h-6 px-2 outline-none focus:border-primary w-full font-bold text-white" 
                />
              </div>
              <div class="flex gap-1 md:col-span-1 justify-end">
                <button 
                  class="w-6 h-6 flex items-center justify-center bg-primary/20 text-primary hover:bg-primary hover:text-white transition-colors rounded-sm"
                  (click)="addPlaceholderDetail()"
                  title="新增下一筆"
                >
                  <span class="text-sm font-bold">+</span>
                </button>
                <button 
                  class="w-6 h-6 flex items-center justify-center bg-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors rounded-sm"
                  (click)="state.removeDetail(d.id)"
                  title="移除此筆"
                >
                  <span class="text-sm">×</span>
                </button>
              </div>
            </div>
          </div>
          
          <div *ngIf="state.details().length === 0" class="text-center py-6 text-slate-500 text-xs italic bg-[#0f172a] border border-dashed border-slate-700">
            目前無費用明細資料
          </div>
        </div>

        <!-- Payment Logic -->
        <div class="bg-[#0f172a] p-4 border border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div class="form-control">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">核撥方式 PAYMENT-METHOD</span>
            <div class="flex gap-2">
              <button 
                class="btn btn-xs border-slate-700 border flex-1 rounded-none hover:bg-primary hover:text-white transition-colors"
                [class.bg-primary]="state.paymentMethod() === '0'"
                [class.text-white]="state.paymentMethod() === '0'"
                [class.bg-transparent]="state.paymentMethod() !== '0'"
                (click)="state.paymentMethod.set('0')"
              >銀行匯款</button>
              <button 
                class="btn btn-xs border-slate-700 border flex-1 rounded-none hover:bg-primary hover:text-white transition-colors"
                [class.bg-primary]="state.paymentMethod() === '1'"
                [class.text-white]="state.paymentMethod() === '1'"
                [class.bg-transparent]="state.paymentMethod() !== '1'"
                (click)="state.paymentMethod.set('1')"
              >支票</button>
            </div>
          </div>

          <div class="form-control" *ngIf="state.paymentMethod() === '1'">
            <span class="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-2">支票領取 CHECK-DELIVERY</span>
            <select [ngModel]="state.checkMethod()" (ngModelChange)="state.checkMethod.set($event)" class="bg-slate-800 border border-rose-500/50 text-rose-400 text-sm p-1 outline-none">
              <option value="">請選擇方式</option>
              <option value="郵寄">掛號郵寄</option>
              <option value="自領">親自領取</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ExpenseDetailsComponent {
  protected readonly state = inject(ExpenseStateService);

  addPlaceholderDetail() {
    this.state.addDetail({
      id: Math.random().toString(36).substring(2, 6).toUpperCase(),
      type: '',
      description: '',
      amount: 0
    });
  }
}
