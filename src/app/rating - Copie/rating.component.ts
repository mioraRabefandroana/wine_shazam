import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {

  @Input() rating: number;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  rate(index: number)
  {
    this.rating = index;
    this.ratingChange.emit(this.rating);
    console.log("rate : ",index)
  }

  getColor(index: number)
  {
    return "yelow";
  }

  isAboveRating(index: number): boolean
  {
    //TODO: optional
    return false;
  }

}
