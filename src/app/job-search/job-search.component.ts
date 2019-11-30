import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/shared/data.service';
import { NgForm } from '@angular/forms';
import { JobSearch } from './job-search.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent implements OnInit {
  radiusRange = [10, 20, 50, 100];
  defaultRadius = 50;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    
  }

  onSubmit(form: NgForm) {
    const jobSearch = new JobSearch(form.value.jobSearch, form.value.location, form.value.radius, 2)
    this.dataService.fetchJobList(jobSearch)
    this.router.navigate(['/job-list'])
  }
}
