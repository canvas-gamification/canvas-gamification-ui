import { Component, OnInit } from '@angular/core';
import {ProgressBarMode} from "@angular/material/progress-bar";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  mode: ProgressBarMode;
  color: ThemePalette;
  value: number;

  constructor() { }

  ngOnInit(): void {
    this.mode = "determinate";
    this.color = "primary";
    this.value = 60;
  }

}
