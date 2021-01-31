import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserStatsService} from '@app/_services/api/user-stats.service';
import {CategoryService} from '@app/_services/api/category.service';
import {Category} from '@app/_models';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss']
})
export class UserStatsComponent implements OnInit {
  categoryId: number;
  category: Category;
  userId: number;
  userSuccessRate: number;

  constructor(private route: ActivatedRoute, private userStatsService: UserStatsService, private categoryService: CategoryService) {
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId');
    this.userId = +this.route.snapshot.paramMap.get('userId');
  }

  ngOnInit(): void {
    const userStatsObservable = this.userStatsService.getUserStats();
    const categoryObservable = this.categoryService.getCategory(this.categoryId);
    forkJoin([userStatsObservable, categoryObservable]).subscribe(result => {
      const userStats = result[0];
      this.category = result[1];

      for (const stats of userStats.successRateByCategory) {
        if (stats.category === this.categoryId) {
          this.userSuccessRate = stats.avgSuccess;
        }
      }

    });
  }

}
