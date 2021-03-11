import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideFooter]'
})
export class HideFooterDirective {
  @Input('appHideFooter') footer: any;

  constructor(private render: Renderer2, private domCtrl: DomController) { }

  ngOnInit(){
    this.footer = this.footer.el;
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event){
    const scrollTop = $event.detail.scrollTop;
    let newPosition = -(scrollTop / 2);
    let newOpacity = 1-(scrollTop / 150);

    this.domCtrl.write(()=>{
      this.render.setStyle(this.footer, 'bottom', `${newPosition}px`);
      this.render.setStyle(this.footer, 'opacity', newOpacity);
    })
  }

}
