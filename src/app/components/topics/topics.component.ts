import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-topics",
  templateUrl: "./topics.component.html",
  styleUrls: ["./topics.component.css"],
})
export class TopicsComponent implements OnInit {
  title = 'Topics';
  subtitle = 'A comprehensive list of all the topics covered in this system!';
  topicsArray = [
    {
      name: "Basics",
      numQues: 22,
      avgSuccess: 98,
    },
    {
      name: "Arrays",
      numQues: 17,
      avgSuccess: 85,
    },
    {
      name: "Loops",
      numQues: 11,
      avgSuccess: 82,
    }
  ];

  constructor() {}

  ngOnInit(): void {

  }
}
