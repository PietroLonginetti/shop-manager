import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideFooter]'
})
export class HideFooterDirective {
  @Input('appHideFooter') footer: any;
  @Input('hideSpeed') scale: number = 1;

  constructor(private render: Renderer2, private domCtrl: DomController) { }

  ngOnInit(){
    this.footer = this.footer.el;
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event){
    const scrollTop = $event.detail.scrollTop;
    let newPosition = (scrollTop * this.scale);
    let newOpacity = 1-(scrollTop / 100);

    this.domCtrl.write(()=>{
      this.render.setStyle(this.footer, 'transform', `translateY(${newPosition}px)`);
      this.render.setStyle(this.footer, 'opacity', newOpacity);
    })
  }

}
