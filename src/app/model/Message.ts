export class Message {
    id:number;
    full_name:string;
    email:string;
    message:string;

    constructor(full_name,email,message){
        this.email = email;
        this.full_name = full_name;
        this.message = message;
    }
}