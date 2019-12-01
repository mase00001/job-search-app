import { Injectable } from '@angular/core';
import { Job } from './job.model';
import { Subject } from 'rxjs';
import { JobSearch } from '../job-search/job-search.model';

@Injectable({providedIn: 'root'})
export class JobService {
  jobsChange = new Subject<Job[]>();
  jobTotal = new Subject<number>();
  jobSearchChange = new Subject<JobSearch>();

  private jobs: Job[] = [];
  private jobNumber: number;
  private jobSearch: JobSearch;

  constructor() {}

  setJobs(jobs: Job[], jobSearch: JobSearch) {
    this.jobs = jobs;
    this.jobSearch = jobSearch;
    this.jobsChange.next(this.jobs.slice());
    this.jobSearchChange.next(this.jobSearch);
  }

  setJobTotal(jobNumber: number){
    this.jobNumber = jobNumber;
    this.jobTotal.next(this.jobNumber)
  }

  getJobs() {
    return this.jobs.slice();
  }
}