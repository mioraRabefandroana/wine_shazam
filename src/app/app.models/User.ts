export class User{
    private id: number = null;
    private name: string;
    private firstname: string;
    private gender: EnumGender;
    private email: string;


    constructor( id: number,
         name: string,
         firstname: string,
         gender: EnumGender,
         email: string){
            this.id = id;
            this.name = name;
            this.firstname = firstname;
            this.gender = gender;
            this.email = email
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getFirstname(): string {
        return this.firstname;
    }

    public setFirstname(firstname: string): void {
        this.firstname = firstname;
    }

    public getGender(): EnumGender {
        return this.gender;
    }

    public setGender(gender: EnumGender): void {
        this.gender = gender;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }


}