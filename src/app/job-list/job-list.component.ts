import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/job-list/job.model';
import { JobService } from './job.service';
import { DataService } from 'src/shared/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobs: Job[];
  jobCount: number;

  jobSub: Subscription;
  jobCountSub: Subscription;

  constructor(private jobService: JobService, 
    private dataService: DataService) { }

  ngOnInit() {
    this.jobSub = this.jobService.jobsChange
      .subscribe(
        (jobs: Job[]) => {
          this.jobs = jobs
        }
      )
    this.jobCountSub = this.jobService.jobTotal
      .subscribe(
        (num: number) => {
          this.jobCount = num;
        }
      )
  }

}
