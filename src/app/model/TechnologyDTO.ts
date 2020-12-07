import { Technology } from './Technology';

export class TechnologyDTO {

    technology: Technology;
    checked: boolean;

    constructor(tech: Technology) {
        this.technology = tech
        this.checked = false

    }


}