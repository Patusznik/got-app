import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { House } from 'src/app/models';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.scss'],
})
export class HousesComponent implements OnInit {
  house: House = this.route.snapshot.data.house;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
