import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseStateService } from '../../../../core/services/expense-state.service';

@Component({
  selector: 'app-expense-allocation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card bg-[#1e293b] shadow-2xl border border-slate-700/50 overflow-hidden">
      <div class="bg-[#1e293b] border-b border-slate-700 px-6 py-4 flex justify-between items-center">
        <h2 class="font-bold text-white text-base flex items-center gap-3 tracking-widest uppercase">
          <div class="p-1 bg-primary rounded-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          費用分攤
        </h2>
        <button class="btn btn-xs btn-outline btn-primary font-bold" (click)="addPlaceholderAllocation()">
          + 新增單位
        </button>
      </div>

      <div class="p-6 space-y-4">
        <!-- Allocation List -->
        <div class="space-y-1">
          <div *ngFor="let a of state.allocations(); let i = index" class="flex items-center gap-2 p-2 bg-[#0f172a] border border-slate-700/50 group animate-fade-in transition-colors hover:border-accent/40">
            <div class="flex-1">
              <input type="text" [(ngModel)]="a.departmentName" placeholder="部門名稱" class="bg-transparent border-none text-white text-base w-full outline-none px-1 font-bold" />
            </div>
            <div class="w-28">
              <input 
                type="number" 
                [(ngModel)]="a.amount" 
                (keydown.enter)="addPlaceholderAllocation()"
                class="bg-transparent border-none text-white text-base w-full text-right font-mono outline-none px-1 font-bold" 
              />
            </div>
            <div class="flex gap-1 px-1">
               <button 
                class="w-5 h-5 flex items-center justify-center bg-primary/20 text-primary hover:bg-primary hover:text-white transition-colors rounded-sm"
                (click)="addPlaceholderAllocation()"
                title="新增下一筆"
              >
                <span class="text-[10px] font-bold">+</span>
              </button>
              <button 
                class="w-5 h-5 flex items-center justify-center bg-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors rounded-sm"
                (click)="removeAllocation(i)"
                title="移除此筆"
              >
                <span class="text-xs">×</span>
              </button>
            </div>
          </div>
          
          <div *ngIf="state.allocations().length === 0" class="text-center py-6 text-slate-500 text-xs italic tracking-widest uppercase border border-dashed border-slate-700">
            目前無費用分攤資料
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="bg-[#0f172a] p-3 border border-slate-700 mt-2">
          <div class="flex justify-between items-end mb-1">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">分攤進度 PROGRESS</span>
            <span class="text-xs font-mono font-bold" [class.text-emerald-400]="state.isAllocationBalanced()" [class.text-warning]="!state.isAllocationBalanced()">
              {{ allocationPercentage() | number:'1.0-0' }}%
            </span>
          </div>
          <div class="h-1 w-full bg-slate-800">
            <div 
              class="h-full transition-all duration-500" 
              [class.bg-emerald-500]="state.isAllocationBalanced()"
              [class.bg-warning]="!state.isAllocationBalanced()"
              [style.width]="allocationPercentage() + '%'"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ExpenseAllocationComponent {
  protected readonly state = inject(ExpenseStateService);

  allocationPercentage() {
    const total = this.state.totalAmount();
    if (total === 0) return 0;
    return (this.state.allocationSum() / total) * 100;
  }

  addPlaceholderAllocation() {
    this.state.addAllocation({
      departmentId: '',
      departmentName: '',
      amount: 0
    });
  }

  removeAllocation(index: number) {
    this.state.allocations.update(list => list.filter((_, i) => i !== index));
  }
}
