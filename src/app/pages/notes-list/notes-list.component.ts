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
  filteredNotes: Note[] = new Array<Note>();
  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    // get all notes from NotesService
    this.notes = this.notesService.getAll();
    this.filteredNotes = this.notes;
  }

  deleteNote(id: number){
    this.notesService.delete(id);
  }

  filter(query:string){
    query = query.toLowerCase().trim();

    let allResults: Note[] = new Array<Note>();
    // split to individual words
    let terms: string[] = query.split(' ');
    // remove duplicate search
    terms = this.removeDuplicates(terms);
    // compile all relevant results
    terms.forEach(term=>{
      let result = this.relavantNotes(term);
      // append
      allResults = [...allResults, ...result] // deconstructing array (basically merge the results)
    });
    // allResults includes duplicate notes because a particular notes can be a result of many search terms
    // we dont want to show duplicates and need tp remove in the UI
    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults; 

  }

  removeDuplicates(arr:Array<any>): Array<any>{
    let uniqueResults: Set<any> = new Set<any>();
    // loop through array and add items to the set
    arr.forEach(e=> uniqueResults.add(e));

    return Array.from(uniqueResults);
  }

  relavantNotes(query: string) : Array<Note>{
    query = query.toLowerCase().trim();
    let relavantNotes = this.notes.filter(note=>{
      if (note.body.toLowerCase().includes(query) || note.title.toLowerCase().includes(query)){
        return true;
      }
      return false;
    })
    return relavantNotes;

  }

}
