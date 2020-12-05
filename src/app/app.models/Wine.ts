import { Rate } from './Rate';
import { WineComment } from './WineComment';

export class Wine{    
    private id: number;
    private name: string;
    private description: string;
    private bottling: string;
    private castle: string;
    private price: number;   
    private image: string = null;  

    private comments: WineComment[] = [];
    private rates: Rate[] = [];

    constructor(
        id: number,
        name: string,
        description: string,
        bottling: string,
        castle: string,
        price: number,
        image: string){
            
            this.id = id;
            this.name = name;
            this.description = description;
            this.bottling = bottling;
            this.castle = castle;
            this.price = price;
            this.image = image;
    }
    
    public getId(): number {
        return this.id;
    }

    /**
     * get comment and rate group by user
     */
    public getCommentsAndRates()
    {
        let res = [];
        for(let comment of this.comments)
        {
            // store comment to data
            let data = {
                'comment' : comment
            };

            for(let rate of this.rates)
            {
                // check if the comment and the rate are from the same user
                if(rate.getuser() == comment.getUser())
                {
                    // add rate into data
                    data['rate'] = rate;
                }
            }

            // add data into result array
            res.push(data);
        }

        // return result array
        return res;
    }


    /**
     * get wine image names
     */        
    public getImage(): string
    {
        return 'http://192.168.43.181/wine_shazam/public/images/wine_image_1.png';
        return this.image;
    }

    /**
     * does the wine has an image
     */        
    public hasImage(): string
    {
        return this.getImage() ;
    }
    /**
     * add comment
     * @param comment 
     */
    public addComment(comment)
    {
        this.comments.push(comment);
    }
        /**
         * remove comment
         * @param comment 
         */
        public removeComment(comment)
        {
            //TODO: supprimer un commentaire
            //this.comments.splice(comment);
        }

        
        public getComments()
        {
            return this.comments;
        }
        
        /**
         * add rate
         * @param rate 
         */
        public addRate(rate)
        {
            this.rates.push(rate);
        }
        /**
         * remove rate
         * @param rate 
         */
        public removeRate(rate)
        {
            //TODO: supprimer un rate
            //this.rates.splice(rate);
        }

        public setRates(rates)
        {
            this.rates = rates;
        }

        /**
         * get wine rate value (average rate)
         */
        public getRateValue()
        {
            // check if wine has been rated
            if( !this.hasBeenRated() )
                return null;

            /**
             * compute wine rate average
             */
            let r = 0
            for(let rate of this.rates )
            {
                r += parseInt( rate.getRate().toString() );
            }
            return ( r / this.rates.length );
        }

        /**
         * is the has been rated?s
         */
        public hasBeenRated()
        {
            return ( this.rates.length > 0 )
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

}