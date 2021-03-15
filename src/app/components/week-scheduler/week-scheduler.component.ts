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

  valuesChanged(i: number) {
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
        let fromH = parseInt(schedule[t - 1].slice(schedule[t - 1].indexOf('T') + 1, schedule[t - 1].indexOf(':')))
        let toH = parseInt(schedule[t].slice(schedule[t].indexOf('T') + 1, schedule[t].indexOf(':')))
        let fromM = parseInt(schedule[t - 1].slice(schedule[t - 1].indexOf(':') + 1, schedule[t - 1].indexOf(':') + 3))
        let toM = parseInt(schedule[t].slice(schedule[t].indexOf(':') + 1, schedule[t].indexOf(':') + 3))
        if (fromH < toH || (fromH == toH && fromM < toM)) {
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
    if (this.emptyTurn) {
      await this.removeEmptyTurn()
    }
    this.days[i].push({ from: '', to: '' });
    this.emptyTurn = { day: i, turn: this.days[i].length - 1 }
  }
  async removeTurn(i: number, t: number) {
    if (this.emptyTurn && i === this.emptyTurn.day && t === this.emptyTurn.turn) {
      this.emptyTurn = null; //Case: click remove on empty turn
    }
    await this.animationCtrl.create()
      .addElement(document.getElementById('day' + i).getElementsByTagName('ion-row')[t])
      .duration(100)
      .fromTo('opacity', '1', '0')
      .fromTo('height', '35.3px', '0')
      .easing('ease-out')
      .play()
    this.days[i].splice(t, 1);
    this.valuesChanged(i);
    setTimeout(() => { this.checkInvalidData(i); })
  }
  async removeEmptyTurn() {
    if (!this.emptyTurn) {
      //Do nothing
    }
    else {
      let i = this.emptyTurn.day;
      let t = this.emptyTurn.turn;
      await this.animationCtrl.create()
        .addElement(document.getElementById('day' + i).getElementsByTagName('ion-row')[t])
        .duration(100)
        .fromTo('opacity', '1', '0')
        .fromTo('height', '35.3px', '0')
        .easing('ease-out')
        .play()
      this.days[i].splice(t, 1);
      this.emptyTurn = null;
    }
  }

  // Stili
  cssFocus(ev){
    ev.target.style.backgroundColor = 'rgb(197, 197, 197, .4)'
  }

  cssBlur(ev){
    if(ev.target.classList.contains('invalid-turn') || ev.target.classList.contains('invalid-cross-turn')){
      ev.target.style.backgroundColor = 'rgb(235, 68, 90, .05)'
    } else ev.target.style.backgroundColor = 'initial'
  }
}
