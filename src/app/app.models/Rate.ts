export class Rate{
    private id: number;
    private date: Date;
    private rate: EnumRate;
    private userId: number;
    private wineId: number;

    constructor(
         id: number,
         date: Date,
         rate: EnumRate,
         userId: number,
         wineId: number ){
        this.id = id;
        this.date = date;
        this.rate = rate;
        this.userId = userId;
        this.wineId = wineId;
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

    public getUserId(): number {
        return this.userId;
    }

    public setUserId(userId: number): void {
        this.userId = userId;
    }

    public getWineId(): number {
        return this.wineId;
    }

    public setWineId(wineId: number): void {
        this.wineId = wineId;
    }
    
}