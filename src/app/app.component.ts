import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { WorkerService } from '../service/worker.service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WorkerService],
})
export class AppComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'name', 'day', 'month'];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private http: WorkerService) {}

  ngOnInit(): void {
    this.loadWorker();
  }

  private loadWorker() {
    this.http
      .getWorker()
      .subscribe(
        (data: MatTableDataSource<any>) => (this.dataSource = data['workers']))
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
