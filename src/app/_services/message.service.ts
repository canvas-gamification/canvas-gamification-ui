import {Injectable} from '@angular/core';
import {AlertMessage, MESSAGE_TYPES} from '@app/_models';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    // Example of a message object: {type: MESSAGE_TYPES.WARNING,
    //                               message: 'Bruh'}
    messages: AlertMessage[] = [];
    successMessages: string[] = [];

    constructor() {
    }

    add(type: string, message: string) {
        this.messages.push({
            type,
            message,
        });
    }

    addSuccess(message: string) {
        this.successMessages.push(message);
    }

    clear() {
        this.messages = [];
        this.successMessages = [];
    }
}
