import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-week-scheduler',
  templateUrl: './week-scheduler.component.html',
  styleUrls: ['./week-scheduler.component.scss'],
})
export class WeekSchedulerComponent implements OnInit {
  @Input() days: any
  @Output() invalidDataSpotted = new EventEmitter();
  @Output() valuesChangingSpotted = new EventEmitter()
  emptyTurn: any = null;

  valuesChanged(i: number) {
    this.valuesChangingSpotted.emit();
  }
  checkInvalidData(i: number) {
    let day = this.days[i];
    let dayHTML = document.getElementById('day' + i);

    let schedule = [];
    let scheduleHTML = dayHTML.getElementsByTagName('ion-datetime')
    if (scheduleHTML.length != 0) {
      console.log(scheduleHTML)
      for (let t = 0; t < day.length; t++) {
        schedule.push(day[t].from)
        schedule.push(day[t].to)
      } console.log(schedule)

      for (let t = 1; t < schedule.length; t++) {
        let fromH = parseInt(schedule[t - 1].slice(schedule[t - 1].indexOf('T') + 1, schedule[t - 1].indexOf(':')))
        let toH = parseInt(schedule[t].slice(schedule[t].indexOf('T') + 1, schedule[t].indexOf(':')))
        let fromM = parseInt(schedule[t - 1].slice(schedule[t - 1].indexOf(':') + 1, schedule[t - 1].indexOf(':') + 3))
        let toM = parseInt(schedule[t].slice(schedule[t].indexOf(':') + 1, schedule[t].indexOf(':') + 3))
        console.log(fromH + ':' + fromM + ', ' + toH + ':' + toM)
        if (fromH < toH || (fromH == toH && fromM < toM)) {
          if (t % 2 != 0){
            scheduleHTML[t - 1].classList.remove('invalid-turn');
            scheduleHTML[t].classList.remove('invalid-turn');
          } else{
            scheduleHTML[t - 1].classList.remove('invalid-cross-turn');
            scheduleHTML[t].classList.remove('invalid-cross-turn');
          }
        }
        else {
          if (t % 2 != 0) {
            scheduleHTML[t - 1].classList.add('invalid-turn');
            scheduleHTML[t].classList.add('invalid-turn');
          } else {
            scheduleHTML[t - 1].classList.add('invalid-cross-turn');
            scheduleHTML[t].classList.add('invalid-cross-turn');
          }
          console.error('invalid turn');
          this.invalidDataSpotted.emit(i)
        }
      }
    }
  }

  weekDays: Array<string> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() { }

  async loadNewTurn(i: number) {
    if (this.emptyTurn) {
      await this.removeTurn(this.emptyTurn.day, this.emptyTurn.turn);
    }
    this.days[i].push({ from: '', to: '' });
    this.emptyTurn = { day: i, turn: this.days[i].length - 1 }
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
    this.valuesChanged(i);
  }

}
