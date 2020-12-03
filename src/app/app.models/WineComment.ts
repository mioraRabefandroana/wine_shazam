export class WineComment{
    private id: number;
    private date: Date;
    private comment: string;
    private userId: number;
    private wineId: number;

    constructor(
         id: number,
         date: Date,
         comment: string,
         userId: number,
         wineId: number){
            this.id = id;
            this.date = date;
            this.comment = comment;
            this.userId = userId;
            this.userId = wineId;
    }

    public getId(): number {
        return this.id;
    }
    /*
    public setId(id: number): void {
        this.id = id;
    }
    */

    public getDate(): Date {
        return this.date;
    }

    public setDate(date: Date): void {
        this.date = date;
    }

    public getComment(): string {
        return this.comment;
    }

    public setComment(comment: string): void {
        this.comment = comment;
    }

    public getUserId(): number {
        return this.userId;
    }
    /*
    public setUserId(userId: number): void {
        this.userId = userId;
    }
*/
    public getWineId(): number {
        return this.wineId;
    }
/*
    public setWineId(wineId: number): void {
        this.wineId = wineId;
    }
*/

}