import { Injectable } from '@angular/core';
import { Job } from './job.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class JobService {
  jobsChange = new Subject<Job[]>();
  jobTotal = new Subject<number>();

  private jobs: Job[] = [];
  private jobNumber: number;

  constructor() {}

  setJobs(jobs: Job[]) {
    this.jobs = jobs
    this.jobsChange.next(this.jobs.slice());
  }

  setJobTotal(jobNumber: number){
    this.jobNumber = jobNumber;
    this.jobTotal.next(this.jobNumber)
  }

  getJobs() {
    return this.jobs.slice();
  }
}