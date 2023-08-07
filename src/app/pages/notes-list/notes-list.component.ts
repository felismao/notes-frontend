import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations:[
    trigger('itemAnim', [
      //Entry animation
      transition('void => *', [
        //set state
        style({
          height : 0,
          opacity :0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,

          //need to expand the padding properties
          paddingTop:0,
          paddingBottom:0,
          paddingRight:0,
          paddingLeft:0
        }),
        // animate spacing
        animate('50ms',style({
          height: '*',
          'margin-bottom' : '*',
          paddingTop:'*',
          paddingBottom:'*',
          paddingRight:'*',
          paddingLeft:'*',
        })),
        // animate final state
        animate(200)
      ]),
      transition('* => void', [
        //scale up
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        // scale down to normal + start fade out
        animate(50, style({
          transform:'sale(1)',
          opacity: 0.75
        })),
        //scale down + fade out complete
        animate('120ms ease-out', style({
          opacity: 0,
          transform:'scale(0.68)'
        })),
        // animate spacing
        animate('150ms ease-out',style({
          height : 0,
          'margin-bottom': 0,
          paddingTop:0,
          paddingBottom:0,
          paddingRight:0,
          paddingLeft:0
        }))
      ])
    ]),
    trigger('listAnim',[
      transition('*=>*', [
        query(':enter', [
          style({
            opacity:0,
            height:0,
          }),
          stagger(100, [
            animate('0.2s ease')
          ])
        ], {
          optional:true
        })
      ] )
    ])
  ]
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>();
  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    // get all notes from NotesService
    this.notes = this.notesService.getAll();
  }

  deleteNote(id: number){
    this.notesService.delete(id);
  }

}
