import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../../services/category.service";
import { Category } from "../../../models/category";

@Component({
  selector: "app-topics",
  templateUrl: "./topics.component.html",
  styleUrls: ["./topics.component.css"],
})
export class TopicsComponent implements OnInit {
  title = "Topics";
  subtitle = "A comprehensive list of all the topics covered in this system!";
  categories: Category[];
  topLevelCategories: Category[];
  expanded: {} = {};
  subcats: Category[];

  constructor(public categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((categories) => {
        this.topLevelCategories = categories.filter(c => c.parentName === '');
        this.categories = categories;
      });
  }

  toggleChildTopics(category: Category): void {
    this.expanded[category.name] = !this.expanded[category.name];
    this.subcats = this.categories.filter(c => c.parentName == category.name);
    console.log(this.subcats);
    console.log(this.expanded);
  }
}
