import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Payee {
  id: string;
  name: string;
  bankCode: string;
  accountNo: string;
  amount: number;
}

export interface ExpenseDetail {
  id: string;
  type: string;
  description: string;
  amount: number;
}

export interface Allocation {
  departmentId: string;
  departmentName: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseStateService {
  // Primary States
  totalAmount = signal<number>(0);
  payees = signal<Payee[]>([]);
  details = signal<ExpenseDetail[]>([]);
  allocations = signal<Allocation[]>([]);
  paymentMethod = signal<string>('0'); // 1 = Check
  checkMethod = signal<string>('');
  toa10 = signal<boolean>(false);
  toa10Reason = signal<string>('');
  attachments = signal<File[]>([]);
  
  // Computed balance checks (Triple Check)
  payeeSum = computed(() => this.payees().reduce((sum, p) => sum + p.amount, 0));
  detailSum = computed(() => this.details().reduce((sum, d) => sum + d.amount, 0));
  allocationSum = computed(() => this.allocations().reduce((sum, a) => sum + a.amount, 0));

  isPayeeBalanced = computed(() => this.payeeSum() === this.totalAmount());
  isDetailBalanced = computed(() => this.detailSum() === this.totalAmount());
  // Note: Allocation balance usually depends on individual detail amounts or total, 
  // based on spec: sum(WFPPAYED.ITEMAMT) = 明細金額 (detail amount)
  // For simplicity at root state, we check against total for now.
  isAllocationBalanced = computed(() => this.allocationSum() === this.totalAmount());

  isTripleCheckPassed = computed(() => 
    this.totalAmount() > 0 &&
    this.isPayeeBalanced() && 
    this.isDetailBalanced() && 
    this.isAllocationBalanced()
  );

  // Amount in Chinese (Upper case)
  amountInChinese = computed(() => this.convertToChineseCurrency(this.totalAmount()));

  private http = inject(HttpClient);
  isSaving = signal<boolean>(false);

  constructor() {}

  async saveExpense() {
    if (!this.isTripleCheckPassed()) {
      throw new Error('資料尚未平衡，無法送出。');
    }

    this.isSaving.set(true);
    try {
      const requestData = {
        totalAmount: this.totalAmount(),
        description: '前端申請單儲存測試',
        paymentMethod: this.paymentMethod(),
        checkMethod: this.checkMethod(),
        toa10: this.toa10(),
        toa10Reason: this.toa10Reason(),
        payees: this.payees(),
        details: this.details(),
        allocations: this.allocations()
      };

      const formData = new FormData();
      formData.append('requestJson', JSON.stringify(requestData));
      
      this.attachments().forEach(file => {
        formData.append('attachments', file, file.name);
      });

      const result = await firstValueFrom(
        this.http.post<{ success: boolean; aplNo: string }>('/api/expenses', formData)
      );

      if (result.success) {
        alert(`申請成功！單號：${result.aplNo}`);
        // 可以選擇重置狀態
      }
    } catch (error: any) {
      console.error(error);
      alert('儲存失敗：' + (error.error?.message || error.message));
    } finally {
      this.isSaving.set(false);
    }
  }

  updateTotalAmount(amount: number) {
    this.totalAmount.set(amount);
  }

  addPayee(payee: Payee) {
    this.payees.update(list => [...list, payee]);
  }

  removePayee(id: string) {
    this.payees.update(list => list.filter(p => p.id !== id));
  }

  addDetail(detail: ExpenseDetail) {
    this.details.update(list => [...list, detail]);
  }

  removeDetail(id: string) {
    this.details.update(list => list.filter(d => d.id !== id));
  }

  addAllocation(allocation: Allocation) {
    this.allocations.update(list => [...list, allocation]);
  }

  removeAllocation(departmentId: string) {
    this.allocations.update(list => list.filter(a => a.departmentId !== departmentId));
  }

  private convertToChineseCurrency(num: number): string {
    if (num === 0) return '零元整';
    
    const digits = ['零', '壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖'];
    const units = ['', '拾', '佰', '仟'];
    const bigUnits = ['', '萬', '億', '兆'];
    
    let str = Math.floor(num).toString();
    let result = '';
    let unitIdx = 0;
    let bigUnitIdx = 0;
    
    // Simplistic conversion for demo purposes (can be expanded for production accuracy)
    // For Taiwan specific format: NT$ 15,612 -> 壹萬伍仟陸佰壹拾貳元整
    
    // This is a placeholder for the full logic
    return `新台幣(大寫) ${num.toLocaleString()} 元整 (邏輯待完善)`; 
  }
}
