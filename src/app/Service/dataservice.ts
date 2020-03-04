import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export class dataservice {

  @Input()allowDays:number
  get in(): any {
    return this.allowDays;
  }
  set in(val) {
    console.log('allowDays = '+val);
    this.allowDays = val;
  }

}