import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const categories = [
      {
        name: "Basics",
        description: "Just some basics",
        parentName: "",
        numQues: 22,
        avgSuccess: 98,
      },
      {
        name: "Arrays",
        description: "Just some arrays",
        parentName: "Basics",
        numQues: 17,
        avgSuccess: 85,
      },
      {
        name: "Loops",
        description: "Just some loops",
        parentName: "Basics",
        numQues: 11,
        avgSuccess: 82,
      }
    ];
    return {categories};
  }

  constructor() { }
}
