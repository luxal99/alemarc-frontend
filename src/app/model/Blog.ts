import { Image } from './Image';
import { Technology } from './Technology';

export class Blog {
    id:number;
    header:string;
    shortText:string;
    longText:string;
    numberOfViews;
    listOfTechnologies:Array<any>;
    listOfImages:Array<Image>;
}