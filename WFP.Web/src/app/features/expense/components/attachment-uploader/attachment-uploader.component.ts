import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseStateService } from '../../../../core/services/expense-state.service';

interface AttachedFile {
  name: string;
  size: number;
  type: string;
}

@Component({
  selector: 'app-attachment-uploader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card bg-[#1e293b] shadow-2xl border border-slate-700/50 overflow-hidden">
      <div class="bg-[#1e293b] border-b border-slate-700 px-6 py-4">
        <h2 class="font-bold text-white text-base flex items-center gap-3 tracking-widest uppercase">
          <div class="p-1 bg-primary rounded-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd" />
            </svg>
          </div>
          附件上傳
        </h2>
      </div>

      <div class="p-6 space-y-4">
        <!-- Drag & Drop Area -->
        <div 
          class="border border-dashed border-slate-700 p-6 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group bg-[#0f172a]"
          (dragover)="$event.preventDefault()"
          (drop)="onDrop($event)"
        >
          <div class="p-2 rounded-full bg-slate-800 group-hover:bg-primary/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-500 group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div class="text-center">
            <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">點擊或拖放檔案至此</p>
            <p class="text-[10px] text-slate-600 mt-1">單一檔案上限 100MB</p>
          </div>
        </div>

        <!-- File List -->
        <div class="space-y-1 mt-4">
          <div *ngFor="let file of state.attachments(); let i = index" class="flex items-center justify-between p-2 bg-[#0f172a] border border-slate-700 text-xs animate-fade-in">
            <div class="flex items-center gap-3 overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              <span class="truncate font-bold text-slate-300">{{ file.name }}</span>
              <span class="text-[10px] text-slate-600">({{ formatSize(file.size) }})</span>
            </div>
            <button class="text-slate-600 hover:text-rose-500 transition-colors font-bold text-[10px]" (click)="removeFile(i)">移除</button>
          </div>
 
          <div class="flex justify-between items-center text-[10px] font-bold text-slate-600 px-1 pt-2 uppercase tracking-widest">
            <span>已上傳: {{ state.attachments().length }} / 20</span>
            <span *ngIf="state.attachments().length >= 20" class="text-rose-500">已達上限</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class AttachmentUploaderComponent {
  state = inject(ExpenseStateService);

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  handleFiles(fileList: FileList) {
    const currentFilesCount = this.state.attachments().length;
    if (currentFilesCount >= 20) return;

    const newFiles = Array.from(fileList)
      .filter(f => f.size <= 100 * 1024 * 1024) // 100MB limit
      .slice(0, 20 - currentFilesCount);

    this.state.attachments.update(all => [...all, ...newFiles]);
  }

  removeFile(index: number) {
    this.state.attachments.update(all => all.filter((_, i) => i !== index));
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
