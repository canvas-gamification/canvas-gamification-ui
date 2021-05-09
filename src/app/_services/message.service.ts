import {Injectable} from '@angular/core';
import {AlertMessage} from '@app/_models';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    // Example of a message object: {type: MESSAGE_TYPES.WARNING,
    //                               message: 'This is an example warning message'}
    messages: AlertMessage[] = [];
    successMessages: string[] = [];

    constructor() {
        this.messages = [];
        this.successMessages = [];
    }

    add(type: string, message: string): void {
        this.messages.push({
            type,
            message,
        });
    }

    addSuccess(message: string): void {
        this.successMessages.push(message);
    }

    clear(): void {
        this.messages = [];
        this.successMessages = [];
    }
}
