import { Component } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent {
  show: boolean = false;
  message!: string;
  type!: string;
  moveLeft: boolean = false;

  constructor(private utilService: UtilService) {
    this.utilService.getPopUpType().subscribe(type => this.type = type);
    this.utilService.getPopUpMessage().subscribe(message => this.message = message);
    this.utilService.getShowPopUp().subscribe(show => {
      if(!this.show && show) {
        this.show = true;

        // Wait a few ms to start the with the action of the pop up
        setTimeout(() => {
          this.moveLeft = true;
        }, 10);

        // Move action of the pop up to hide after 2 seg
        setTimeout(() => {
          this.moveLeft = false;
        }, 2000);

        // Hide the pop-up after 3 seg
        setTimeout(() => {
          this.show = false;
        }, 3000);
      }
    });
  }
}
