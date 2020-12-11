import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserStatsService} from '../../services/api/user-stats.service';
import {UserStats} from '../../../models/user_stats';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {
  categoryId: number;
  userId: number;
  userStats: UserStats;
  constructor(private route: ActivatedRoute, private userStatsService: UserStatsService) {
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId');
    this.userId = +this.route.snapshot.paramMap.get('userId');
  }

  ngOnInit(): void {
    this.userStatsService.getUserStats(this.userId, this.categoryId).subscribe(stats => {
      console.log(stats);
      this.userStats = stats;
    });
  }

}
