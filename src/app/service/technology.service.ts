import { Injectable } from '@angular/core';
import { FactoryService } from './factory.service';
import { Technology } from '../model/Technology';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService extends FactoryService<Technology> {

  route = 'technology';

  
}
