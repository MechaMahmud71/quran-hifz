
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('audio', { static: true }) public audio!: ElementRef<HTMLAudioElement>

  public title = 'Quran Hifz & Najera App';

  public showModal: boolean = false;

  public loopCount = 1;

  public surah: any = "001";

  public ayah: any = "001";

  public isLoop = false;


  public url: string = "";

  public timeOut: any;

  public newTimeOut: any;

  public duration: any;

  public isPaused: boolean = false;

  public ayahString!: string;

  public DOMSurahString!: number;

  public DOMAyahString!: number;


  constructor(private readonly ayahService: AppService) { }

  ngOnInit(): void {
    this.showModal = true;
    if (localStorage.getItem('surah') && localStorage.getItem('ayah')) {
      this.showModal = false;
    }

    this.surah = localStorage.getItem('surah') !== null ? localStorage.getItem('surah') : "001"
    this.ayah = localStorage.getItem('ayah') !== null ? localStorage.getItem('ayah') : "001"
    this.loopCount = localStorage.getItem('loopCount') !== null ? Number(localStorage.getItem('loopCount')) : 1
    this.isLoop = this.loopCount === 1 ? false : true;

    this.url = `https://verse.mp3quran.net/arabic/saud_alshuraim/64/${this.surah}${this.ayah}.mp3`


    this.ayahService.fetchAyah(Number(this.ayah)).subscribe(res => {
      this.ayahString = res.data[0].text;
      this.DOMAyahString = res.data[0].numberInSurah;
      this.DOMSurahString = res.data[0].surah.englishName
      console.log(res.data[0])
    })
  }

  showSettings() {
    this.showModal = true
  }

  playAudio(isStop = false, duration?: any) {
    console.log(this.loopCount)
    if (!duration) {
      this.duration = Math.floor(this.audio.nativeElement.duration) * 1000 * Number(this.loopCount)
    }
    this.timeOut = setTimeout(() => {
      this.playAudio(true)
    }, this.duration)

    this.audio.nativeElement.play()

    if (isStop === true) {
      console.log("paused")
      console.log(this.timeOut)
      console.log(this.duration)
      clearTimeout(this.timeOut);
      this.audio.nativeElement.pause();
    }
    // if (!this.isPaused) {
    //   this.
    // }
  }

  onSubmit(form: NgForm) {
    if (form.value.surah.length === 1) {
      form.value.surah = "00" + form.value.surah
    }
    if (form.value.surah.length === 2) {
      form.value.surah = "0" + form.value.surah
    }
    if (form.value.ayah.length === 1) {
      form.value.ayah = "00" + form.value.ayah
    }
    if (form.value.ayah.length === 2) {
      form.value.ayah = "0" + form.value.ayah
    }
    this.surah = form.value.surah;
    this.ayah = form.value.ayah;
    this.loopCount = form.value.repeat;
    this.isLoop = false;
    if (this.loopCount > 1) {
      this.isLoop = true;
    }

    localStorage.setItem('surah', this.surah)
    localStorage.setItem('ayah', this.ayah)
    localStorage.setItem('loopCount', String(this.loopCount))
    clearTimeout(this.timeOut)

    this.url = `https://verse.mp3quran.net/arabic/saud_alshuraim/64/${this.surah}${this.ayah}.mp3`

    this.ayahService.fetchAyah(Number(this.ayah)).subscribe(res => {
      this.ayahString = res.data[0].text;
      this.DOMAyahString = res.data[0].numberInSurah;
      this.DOMSurahString = res.data[0].surah.englishName
      console.log(res.data[0])
    })

    this.hideModal()
  }

  hideModal() {
    this.showModal = false;
  }

  // pauseAudio() {
  //   this.audio.nativeElement.pause();
  //   this.isPaused = true;
  //   this.newTimeOut = this.timeOut;
  //   this.duration = this.duration - this.newTimeOut * 1000;
  //   console.log(this.duration)
  //   clearTimeout(this.timeOut);
  // }


  nextAudio() {
    clearTimeout(this.timeOut);

    const newAyah = Number(this.ayah) + 1;
    const newAyahString = String(newAyah);
    console.log(newAyahString)
    if (newAyahString.length === 1) {
      this.ayah = "00" + newAyahString
    }
    if (newAyahString.length === 2) {
      this.ayah = "0" + newAyahString
    } else {
      this.ayah = newAyahString
    }
    localStorage.setItem('ayah', this.ayah)
    localStorage.setItem('loopCount', String(this.loopCount))

    console.log(this.ayah.length)

    this.url = `https://verse.mp3quran.net/arabic/saud_alshuraim/64/${this.surah}${this.ayah}.mp3`

    this.ayahService.fetchAyah(Number(this.ayah)).subscribe(res => {
      this.ayahString = res.data[0].text;
      this.DOMAyahString = res.data[0].numberInSurah;
      this.DOMSurahString = res.data[0].surah.englishName
      console.log(res.data[0])
    })

    console.log(this.url)
  }

  prevAudio() {
    clearTimeout(this.timeOut);

    const newAyah = Number(this.ayah) - 1;
    const newAyahString = String(newAyah);
    if (newAyahString.length === 1) {
      this.ayah = "00" + newAyahString
    }
    if (newAyahString.length === 2) {
      this.ayah = "0" + newAyahString
    }
    else {
      this.ayah = newAyahString
    }
    localStorage.setItem('ayah', this.ayah)
    localStorage.setItem('loopCount', String(this.loopCount))

    this.url = `https://verse.mp3quran.net/arabic/saud_alshuraim/64/${this.surah}${this.ayah}.mp3`

    this.ayahService.fetchAyah(Number(this.ayah)).subscribe(res => {
      this.ayahString = res.data[0].text;
      this.DOMAyahString = res.data[0].numberInSurah;
      this.DOMSurahString = res.data[0].surah.englishName
      console.log(res.data[0])
    })
  }



}
