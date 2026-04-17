import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseStateService } from '../../../../core/services/expense-state.service';

@Component({
  selector: 'app-payee-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card bg-[#1e293b] shadow-2xl border border-slate-700/50 overflow-hidden">
      <div class="bg-[#1e293b] border-b border-slate-700 px-6 py-4 flex justify-between items-center">
        <h2 class="font-bold text-white text-base flex items-center gap-3 tracking-widest uppercase">
          <div class="p-1 bg-primary rounded-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a7 7 0 00-7 7v1h11v-1a7 7 0 00-7-7z" />
            </svg>
          </div>
          受款人資訊
        </h2>
        <button class="btn btn-xs btn-outline btn-primary font-bold" (click)="addPlaceholderPayee()">
          + 新增受款人
        </button>
      </div>
      
      <div class="p-6 space-y-4">
        <!-- Unified Amount Display (Centered) -->
        <div class="flex flex-col items-center justify-center bg-[#0f172a] p-3 border border-slate-700">
           <span class="text-primary font-bold text-lg tracking-widest">{{ state.amountInChinese() }}</span>
        </div>

        <!-- Payee Table -->
        <div class="overflow-x-auto border border-slate-700">
          <table class="table w-full border-collapse">
            <thead>
              <tr class="bg-[#0f172a] text-white border-b border-slate-700 uppercase text-xs tracking-widest font-bold">
                <th class="py-3 px-4 w-16">編號</th>
                <th class="py-3 px-4">受款人名稱</th>
                <th class="py-3 px-4">匯入銀行</th>
                <th class="py-3 px-4">匯入帳號</th>
                <th class="py-3 px-4 text-right">付款金額(NT$)</th>
                <th class="py-3 px-4 w-16"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700">
              <tr *ngFor="let p of state.payees(); let i = index" class="hover:bg-slate-800 transition-colors">
                <td class="px-4 py-2 font-mono text-[10px] text-slate-500">{{ p.id }}</td>
                <td class="px-2 py-2">
                  <input type="text" [(ngModel)]="p.name" class="bg-transparent border-none text-white w-full text-sm font-bold focus:bg-slate-900 px-2 py-1 outline-none" />
                </td>
                <td class="px-2 py-2">
                  <input type="text" [(ngModel)]="p.bankCode" placeholder="銀行代碼" class="bg-transparent border-none text-white w-full text-sm focus:bg-slate-900 px-2 py-1 outline-none" />
                </td>
                <td class="px-2 py-2">
                  <input type="text" [(ngModel)]="p.accountNo" placeholder="銀行帳號" class="bg-transparent border-none text-white w-full text-sm font-mono focus:bg-slate-900 px-2 py-1 outline-none" />
                </td>
                <td class="px-2 py-2 text-right">
                  <input 
                    type="number" 
                    [(ngModel)]="p.amount" 
                    (keydown.enter)="addPlaceholderPayee()"
                    class="bg-transparent border-none text-white w-32 text-right font-mono text-base focus:bg-slate-900 px-2 py-1 outline-none font-bold text-primary" 
                  />
                </td>
                <td class="px-4 py-2 text-right">
                  <div class="flex gap-1 justify-end">
                    <button 
                      class="w-6 h-6 flex items-center justify-center bg-primary/20 text-primary hover:bg-primary hover:text-white transition-colors rounded-sm"
                      (click)="addPlaceholderPayee()"
                      title="新增下一筆"
                    >
                      <span class="text-xs font-bold">+</span>
                    </button>
                    <button 
                      class="w-6 h-6 flex items-center justify-center bg-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors rounded-sm"
                      (click)="state.removePayee(p.id)"
                      title="移除此筆"
                    >
                      <span class="text-sm">×</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr *ngIf="state.payees().length === 0">
                <td colspan="6" class="text-center py-6 text-slate-500 text-xs italic tracking-widest uppercase">
                  目前無受款人資料
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class PayeeSectionComponent {
  protected readonly state = inject(ExpenseStateService);

  addPlaceholderPayee() {
    this.state.addPayee({
      id: Math.random().toString(36).substring(2, 6).toUpperCase(),
      name: '',
      bankCode: '',
      accountNo: '',
      amount: 0
    });
  }
}
