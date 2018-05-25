import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[jfcElevateOnHover]',
})
export class ElevateOnHoverDirective {
  private el: HTMLElement;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.classList.add('mat-elevation-z8');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.classList.remove('mat-elevation-z8');
  }

  private highlight(color: string) {
    this.el.style.backgroundColor = color;
  }
}
