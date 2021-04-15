import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-week-scheduler',
  templateUrl: './week-scheduler.component.html',
  styleUrls: ['./week-scheduler.component.scss'],
})
export class WeekSchedulerComponent implements OnInit {
  @Input() days: any;
  @Output() dataChange = new EventEmitter();
  emptyTurn: any = null;
  weekDays: Array<Object> = [
    { day: 'Sun', valid: true },
    { day: 'Mon', valid: true },
    { day: 'Tue', valid: true },
    { day: 'Wed', valid: true },
    { day: 'Thu', valid: true },
    { day: 'Fri', valid: true },
    { day: 'Sat', valid: true }
  ];

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() { }

  valuesChanged() {
    this.dataChange.emit();
  }
  checkInvalidData(i: number) {
    let day = this.days[i];
    let dayHTML = document.getElementById('day' + i);

    let schedule = [];
    let scheduleHTML = dayHTML.getElementsByTagName('ion-datetime')
    if (scheduleHTML.length != 0) {
      for (let t = 0; t < day.length; t++) {
        schedule.push(day[t].from)
        schedule.push(day[t].to)
      }

      let invalidInputFound = false;
      for (let t = 1; t < schedule.length; t++) {
        let fromH = parseInt(schedule[t - 1].slice(0, 2))
        let toH = parseInt(schedule[t].slice(0,2))
        let fromM = parseInt(schedule[t - 1].slice(3,5))
        let toM = parseInt(schedule[t].slice(3,5))
        if (fromH < toH || (fromH == toH && fromM < toM)) {
          if(t == schedule.length-1){
            scheduleHTML[t].classList.remove('invalid-cross-turn');
          }
          if (t % 2 != 0) {
            scheduleHTML[t - 1].classList.remove('invalid-turn');
            scheduleHTML[t].classList.remove('invalid-turn');
          } else {
            scheduleHTML[t - 1].classList.remove('invalid-cross-turn');
            scheduleHTML[t].classList.remove('invalid-cross-turn');
          }
        }
        else {
          invalidInputFound = true;
          if (t % 2 != 0) {
            scheduleHTML[t - 1].classList.add('invalid-turn');
            scheduleHTML[t].classList.add('invalid-turn');
          } else {
            scheduleHTML[t - 1].classList.add('invalid-cross-turn');
            scheduleHTML[t].classList.add('invalid-cross-turn');
          }
        }
      }
      if (invalidInputFound) {
        this.weekDays[i]['valid'] = false;
      }
      else {
        this.weekDays[i]['valid'] = true;
      }
    }
  }
  validWeek(): boolean {
    let valid = true;
    this.weekDays.forEach(d => {
      if (!d['valid'])
        valid = false;
    })
    return valid;
  }
  async loadNewTurn(i: number) {
    console.log(this.days[i])
    console.log(this.days[i].length)
    console.log(this.days[i][this.days[i].length - 1])
    let closingTurn = this.days[i][this.days[i].length - 1];
    let newTurn = {from: '', to: '', dayOfWeek: this.weekDays[i]['day']}
    if(closingTurn){
      let closingHour = parseInt(closingTurn.to.slice(0, 2));
      newTurn.from = `${(closingHour + 1) %24}:00`;
      newTurn.to = `${(closingHour + 3) %24}:00`;
      if(newTurn.from.length < 5){
        newTurn.from = '0' + newTurn.from;
      }
      if(newTurn.to.length < 5){
        newTurn.to = '0' + newTurn.to;
      }
    } else {
      newTurn.from = '08:00';
      newTurn.to = '12:00';
    }
    console.log(newTurn)
    this.days[i].push(newTurn);
    this.valuesChanged();
  }
  async removeTurn(i: number, t: number) {
    await this.animationCtrl.create()
      .addElement(document.getElementById('day' + i).getElementsByTagName('ion-row')[t])
      .duration(100)
      .fromTo('opacity', '1', '0')
      .fromTo('height', '35.3px', '0')
      .easing('ease-out')
      .play()
    this.days[i].splice(t, 1);
    this.valuesChanged();
    setTimeout(() => { this.checkInvalidData(i); })
  }
}
