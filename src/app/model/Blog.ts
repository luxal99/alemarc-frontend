import { Image } from './Image';
import { Technology } from './Technology';

export class Blog {
    header:string;
    shortText:string;
    longText:string;
    listOfTechnologies:Set<any>;
    listOfImages:Array<Image>;
}