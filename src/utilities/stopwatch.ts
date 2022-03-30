export class Stopwatch {
  private mostRecentStartDate: number = null;
  private mostRecentStopDate: number = null;
  private isRunning: boolean = false;
  private elapsedTime: number = 0;


  startOrResume() {
    if (this.isRunning) return;
    this.mostRecentStartDate = window.performance.now();
    this.isRunning = true;
  }

  stop() {
    this.mostRecentStopDate = window.performance.now();
    this.isRunning = false;
  }

  reset() {
    this.mostRecentStartDate = null;
    this.mostRecentStopDate = null;
    this.isRunning = false;
    this.elapsedTime = 0;
  }

  getElapsedTime() {
    const dateToUse = this.mostRecentStopDate?? window.performance.now();
    this.elapsedTime = (dateToUse - this.mostRecentStartDate);
    return this.elapsedTime;
  }


/*
  private mostRecentStartDate: Date = null;
  private mostRecentStopDate: Date = null;
  private isRunning: boolean = false;
  private elapsedTime: number = 0;

  startOrResume() {
    if (this.isRunning) return;
    this.mostRecentStartDate = new Date();
    this.isRunning = true;
  }

  stop() {
    this.mostRecentStopDate = new Date();
    this.isRunning = false;
  }

  reset() {
    this.mostRecentStartDate = null;
    this.mostRecentStopDate = null;
    this.isRunning = false;
    this.elapsedTime = 0;
  }

  getElapsedTime() {
    const dateToUse = this.mostRecentStopDate?? new Date();
    this.elapsedTime += (dateToUse.toUtcMs()) - this.mostRecentStartDate.toUtcMs();
    return this.elapsedTime;
  }

  getFormattedTime() {

  }*/
}




function binarySearch(arr, id) {
  let start = 0;
  let end = arr.length - 1;
  if (arr[start][0] > id || arr[end][0] < id)
    return null;
  //console([start, end]);
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (arr[mid][0] === id) 
      return arr[mid];
    else if (arr[mid][0] < id) 
      start = mid + 1;
    else
      end = mid - 1;
  }
 
  return null;
}