import { WineImage } from './WineImage';

export class Wine{    
    private id: number;
    private name: string;
    private description: string;
    private bottling: string;
    private castle: string;
    private price: number;    

    private icons: WineImage[];    

    constructor(
        id: number,
        name: string,
        description: string,
        bottling: string,
        castle: string,
        price: number,
        icons: WineImage[]){
            this.id = id;
            this.name = name;
            this.description = description;
            this.bottling = bottling;
            this.castle = castle;
            this.price = price;
            this.icons = icons
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
        public getDescription(): string {
            return this.description;
        }
    /*
        public setDescription(description: string): void {
            this.description = description;
        }
    */
        public getbottling(): string {
            return this.bottling;
        }
    /*
        public setbottling(bottling: string): void {
            this.bottling = bottling;
        }
    */
        public getCastle(): string {
            return this.castle;
        }
    /*
        public setCastle(castle: string): void {
            this.castle = castle;
        }
    */
        public getPrice(): number {
            return this.price;
        }
    /*
        public setPrice(price: number): void {
            this.price = price;
        }    
    */   
        /**
         * set toString method which returns name and description
         */
        public toString(): string {
            return this.name + ': ' +this.description;
        }

        /**
         * get wine icon names
         */        
        public getWineIconsName(): string[]{
            let nameList = [];
            for(let icon of this.icons)
            {
                nameList.push( icon.getName() );
            }
            return nameList;
        }
}