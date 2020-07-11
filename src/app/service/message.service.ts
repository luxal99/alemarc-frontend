import { Injectable } from '@angular/core';
import { FactoryService } from './factory.service';
import { Message } from "../model/Message";
@Injectable({
  providedIn: 'root'
})
export class MessageService extends FactoryService<Message>{

  route = 'message';

  
}

