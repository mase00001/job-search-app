import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/job-list/job.model';
import { JobService } from './job.service';
import { DataService } from 'src/shared/data.service';
import { Subscription } from 'rxjs';
import { JobSearch } from '../job-search/job-search.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobs: Job[];
  jobCount: number;
  jobSearch: JobSearch;

  jobSub: Subscription;
  jobCountSub: Subscription;
  jobSearchSub: Subscription;

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
    this.jobSearchSub = this.jobService.jobSearchChange
      .subscribe(
        (jobSearch: JobSearch) => {
          this.jobSearch = jobSearch;
      }
    )
  }

  pagination(pageNumber: number) {
    this.jobSearch.page = pageNumber;
    this.dataService.fetchJobList(this.jobSearch);
  }

  numberOfPages(jobCount) {
    const numberOfPages = Math.ceil(jobCount/20);
    console.log(numberOfPages);
    return new Array(numberOfPages).map((a, i) => {
      return i;
    })
  }
}
