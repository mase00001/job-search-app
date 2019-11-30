import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Job } from 'src/app/job-list/job.model';
import { JobService } from 'src/app/job-list/job.service';
import { JobSearch } from 'src/app/job-search/job-search.model';

@Injectable({providedIn: 'root'})
export class DataService {
  constructor(private http: HttpClient, private jobService: JobService) {}
  
  languageFilter() {

  }
  
  fetchJobList(jobSearch: JobSearch) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
      })
    };
    this.http
      .post(
        'https://nl.jooble.org/api/ab8e0f3a-39fb-4afd-9053-0588421abc1a',
        jobSearch,
        httpOptions
      )
      .pipe(
        tap(jobs => {
          this.jobService.setJobTotal(jobs['totalCount']);
        }),
        map(jobs => {
          console.log(jobs);
          return jobs['jobs']
          .filter(job => {
            const testCase = /\been\b|\bhet\b|\bvoor\b|\ben\b/;
            return !testCase.test(job.snippet);
          })
          .map(job => {
              return new Job(job.title, job.location, job.company, job.snippet, job.updated, job.link);
          })
        }),
        tap(jobs => {
          this.jobService.setJobs(jobs);
        })
      )
      .subscribe(jobs => {
        console.log(jobs);
      })
  }

}