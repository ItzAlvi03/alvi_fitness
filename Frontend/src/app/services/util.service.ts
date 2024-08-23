import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  // Pop Up variables
  private showPopUp$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private popUpMessage$: BehaviorSubject<string> = new BehaviorSubject("");
  private popUpType$: BehaviorSubject<string> = new BehaviorSubject("");

  // Loading variables
  private loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private loadingMessage$: BehaviorSubject<string> = new BehaviorSubject("");

  constructor() { }

  getShowPopUp() {
    return this.showPopUp$.asObservable();
  }

  getPopUpMessage() {
    return this.popUpMessage$.asObservable();
  }

  getPopUpType() {
    return this.popUpType$.asObservable();
  }

  getLoading() {
    return this.loading$.asObservable();
  }

  // Shows the pop up 3 seg and then hide it
  showPopUp(message: string, type: string) {
    if(!this.showPopUp$.value) {
      this.popUpMessage$.next(message);
      this.popUpType$.next(type);
      this.showPopUp$.next(true);
      setTimeout(() => {
        this.showPopUp$.next(false);
      })
    }
  }

  showLoading(show: boolean, message?: string) {
    if(message) {
      this.loadingMessage$.next(message);
    }
    this.loading$.next(show);
  }

}
