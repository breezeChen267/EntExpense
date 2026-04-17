import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseStateService } from '../../core/services/expense-state.service';
import { PayeeSectionComponent } from './components/payee-section/payee-section.component';
import { ExpenseDetailsComponent } from './components/expense-details/expense-details.component';
import { ExpenseAllocationComponent } from './components/expense-allocation/expense-allocation.component';
import { AttachmentUploaderComponent } from './components/attachment-uploader/attachment-uploader.component';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [
    CommonModule,
    PayeeSectionComponent,
    ExpenseDetailsComponent,
    ExpenseAllocationComponent,
    AttachmentUploaderComponent
  ],
  template: `
    <div class="flex flex-col gap-6 pb-20 animate-fade-in max-w-7xl mx-auto">
      <!-- Header Section -->
      <section class="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 bg-[#1e293b] px-8 border-b-2 border-primary shadow-2xl">
        <div>
          <h1 class="text-xl font-bold text-white tracking-widest uppercase">
            一般費用申請單 
          </h1>
          <p class="text-slate-400 text-xs mt-1">APL-GENERAL-EXPENSE | INTERNAL-ONLY</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-sm btn-ghost border-slate-700 text-slate-300 hover:bg-slate-800">儲存草稿 DRAFT</button>
          <button 
            class="btn btn-sm btn-primary px-6 shadow-lg shadow-blue-500/20 font-bold"
            [disabled]="!state.isTripleCheckPassed() || state.isSaving()"
            (click)="state.saveExpense()"
          >
            <span *ngIf="state.isSaving()" class="loading loading-spinner loading-xs"></span>
            確認送出 SUBMIT
          </button>
        </div>
      </section>

      <!-- KPI Status Bar -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-1">
        <div class="bg-[#1e293b] py-2 px-4 flex flex-col gap-0 border border-slate-700/50 relative">
          <div class="text-sm font-bold text-slate-300 tracking-widest">受款平衡</div>
          <div class="text-xl font-bold font-mono tracking-tighter" [class.text-emerald-400]="state.isPayeeBalanced()" [class.text-rose-500]="!state.isPayeeBalanced()">
            {{ state.payeeSum() | currency:'TWD':'symbol':'1.0-0' }} <span class="text-xs font-normal text-slate-500 mx-1">/</span> {{ state.totalAmount() | currency:'TWD':'symbol':'1.0-0' }}
          </div>
          <div class="text-[10px] uppercase font-bold" [class.text-emerald-500]="state.isPayeeBalanced()" [class.text-slate-500]="!state.isPayeeBalanced()">
             {{ state.isPayeeBalanced() ? '● VERIFIED' : '○ UNBALANCED' }}
          </div>
        </div>

        <div class="bg-[#1e293b] py-2 px-4 flex flex-col gap-0 border border-slate-700/50 relative">
          <div class="text-sm font-bold text-slate-300 tracking-widest">請款平衡</div>
          <div class="text-xl font-bold font-mono tracking-tighter" [class.text-emerald-400]="state.isDetailBalanced()" [class.text-rose-500]="!state.isDetailBalanced()">
            {{ state.detailSum() | currency:'TWD':'symbol':'1.0-0' }} <span class="text-xs font-normal text-slate-500 mx-1">/</span> {{ state.totalAmount() | currency:'TWD':'symbol':'1.0-0' }}
          </div>
          <div class="text-[10px] uppercase font-bold" [class.text-emerald-500]="state.isDetailBalanced()" [class.text-slate-500]="!state.isDetailBalanced()">
             {{ state.isDetailBalanced() ? '● VERIFIED' : '○ UNBALANCED' }}
          </div>
        </div>

        <div class="bg-[#1e293b] py-2 px-4 flex flex-col gap-0 border border-slate-700/50 relative">
          <div class="text-sm font-bold text-slate-300 tracking-widest">分攤平衡</div>
          <div class="text-xl font-bold font-mono tracking-tighter" [class.text-emerald-400]="state.isAllocationBalanced()" [class.text-rose-500]="!state.isAllocationBalanced()">
            {{ state.allocationSum() | currency:'TWD':'symbol':'1.0-0' }} <span class="text-xs font-normal text-slate-500 mx-1">/</span> {{ state.totalAmount() | currency:'TWD':'symbol':'1.0-0' }}
          </div>
          <div class="text-[10px] uppercase font-bold" [class.text-emerald-500]="state.isAllocationBalanced()" [class.text-slate-500]="!state.isAllocationBalanced()">
             {{ state.isAllocationBalanced() ? '● VERIFIED' : '○ UNBALANCED' }}
          </div>
        </div>
      </div>

      <!-- Form Sections Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left Column: Payee & Details -->
        <div class="lg:col-span-8 flex flex-col gap-8">
          <app-payee-section></app-payee-section>
          <app-expense-details></app-expense-details>
        </div>

        <!-- Right Column: Allocation & Attachments -->
        <div class="lg:col-span-4 flex flex-col gap-8">
          <app-expense-allocation></app-expense-allocation>
          <app-attachment-uploader></app-attachment-uploader>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ExpenseFormComponent {
  protected readonly state = inject(ExpenseStateService);
}
