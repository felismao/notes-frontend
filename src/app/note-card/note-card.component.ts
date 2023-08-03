import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @Input() title!: string;
  @Input() body!: string;

  @ViewChild('truncator', {static: true}) truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText', {static: true}) bodyText!: ElementRef<HTMLElement>;
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    //check for text overflow
    let style = window.getComputedStyle(this.bodyText.nativeElement,null);
    let viewableHeight = parseInt(style.getPropertyValue("height"),10);

    if (this.bodyText.nativeElement.scrollHeight >  viewableHeight){
        // if there is no text overflow , show fade out
        this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    }
    else{
      // else hide fade out
      this.renderer.setStyle(this.truncator.nativeElement,'display', 'none');
    }
  }

}
