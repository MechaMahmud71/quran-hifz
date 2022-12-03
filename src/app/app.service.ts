import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  private url = "https://api.alquran.cloud/v1/ayah/1/editions/quran-uthmani,bn.bengali"


  fetchAyah(ayahNumber: number) {
    this.setUrl(ayahNumber)
    return this.http.get<any>(this.getUrl())
  }

  private setUrl(ayahNumber: number) {
    const ayah = 7 + ayahNumber;
    console.log(ayah)
    this.url = `https://api.alquran.cloud/v1/ayah/${ayah}/editions/quran-uthmani,bn.bengali`

  }

  private getUrl() {
    return this.url;
  }


}
