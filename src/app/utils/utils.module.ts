import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class UtilsModule {
  getUniqueId() {
    let d = new Date();
    
    return (
      d.getFullYear() +
      this.pad2(d.getMonth() + 1) +
      this.pad2(d.getDate()) +
      this.pad2(d.getHours()) +
      this.pad2(d.getMinutes()) +
      this.pad2(d.getSeconds())
    );
  }

  private pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }
}
