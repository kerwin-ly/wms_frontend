import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(private msg: NzMessageService) {}

  downloadFile(url: string, fileName: string): void {
    if (url && url.trim()) {
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', fileName || '未命名文件');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      this.msg.remove();
      this.msg.error('文件下载路径不能为空！');
    }
  }
}
