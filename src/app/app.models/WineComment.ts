import { User } from './User';

export class WineComment{
    private id: number;
    private date: Date;
    private comment: string;
    private user: User;
    private wineId: number;

    constructor(
         id: number,
         date: Date,
         comment: string,
         user: User)
    {
            this.id = id;
            this.date = date;
            this.comment = comment;
            this.user = user;
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

    public getUser(): User {
        return this.user;
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