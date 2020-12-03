export class WineImage{
    private id: number;
    private name: string;
    private dir: string;
    private comment: string;


    constructor(
         id: number,
         name: string,
         dir: string = null,
         comment: string = null){

        this.id = id;
        this.name = name;
        this.dir = dir;
        this.comment = comment;
    }

    
    public getId(): number {
        return this.id;
    }
/*
    public setId(id: number): void {
        this.id = id;
    }
*/
    public getName(): string {
        return this.name;
    }
/*
    public setName(name: string): void {
        this.name = name;
    }
*/
    public getDir(): string {
        return this.dir;
    }
/*
    public setDir(dir: string): void {
        this.dir = dir;
    }
*/
    public getComment(): string {
        return this.comment;
    }
/*
    public setComment(comment: string): void {
        this.comment = comment;
    }
*/

}