export class Note{
    subscribe(arg0: (note: Note) => void) {
      throw new Error('Method not implemented.');
    }
    public title!: string;
    public body! : string;
}