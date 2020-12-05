import { User } from './User';
import { Wine } from './Wine';

export class Rate{
    private id: number;
    private date: Date;
    private rate: EnumRate;
    private user: User;

    constructor(
         id: number,
         date: Date,
         rate: EnumRate,
         user: User){
        this.id = id;
        this.date = date;
        this.rate = rate;
        this.user = user;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getDate(): Date {
        return this.date;
    }

    public setDate(date: Date): void {
        this.date = date;
    }

    public getRate(): EnumRate {
        return this.rate;
    }

    public setRate(rate: EnumRate): void {
        this.rate = rate;
    }

    public getuser(): User {
        return this.user;
    }

    public setuser(user: User): void {
        this.user = user;
    }

    
}