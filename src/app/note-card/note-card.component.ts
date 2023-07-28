import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @ViewChild('truncator', {static: true}) truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText', {static: true}) bodyText!: ElementRef<HTMLElement>;
  constructor() { }

  ngOnInit(): void {
    //check for text overflow
    let style = window.getComputedStyle(this.bodyText.nativeElement,null);
    let viewableHeight = parseInt(style.getPropertyValue("height"),10);

  }

}
