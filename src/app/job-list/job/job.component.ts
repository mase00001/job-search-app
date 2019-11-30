import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/app/job-list/job.model';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() job: Job

}
