import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { UserProfile } from './userProfile';
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';
import { FullUser } from '../models/fullUser';
import { DialogProfileComponent } from '../dialog-profile/dialog-profile.component';
import { MatDialog } from '@angular/material';



@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
  person: string;
  userProfile: UserProfile;
  imie: string;
  nazwisko: string;
  ocena: number;
  id: number;
  languages: string[];
  userLanguages;
  specializations: string[];
  userSpec;
  software: string[];
  userSoftware;
  certifications: string[];
  userCertifications;
  compName:string;
  NIP:string;
  compCity:string;
  pracodawca: any;
  user: FullUser;
  categories: string[];
  userCategories;

  dialogResult: string;
  
  
  constructor(private _profileService: ProfileService, private _authService: AuthService, private _router: Router, public dialog: MatDialog){}

  ngOnInit(): void {
      this._profileService.getIdentity().subscribe(userProfile => {
        this.user = userProfile;
        this.imie = userProfile["user"].first_name;
        this.nazwisko = userProfile["user"].last_name;
        this.ocena = userProfile["user"].rate;
        this.id = userProfile['user'].status;
        

        if(this.id==0){
          this.person = "Freelancer";
        this._profileService.getLanguagesNames().subscribe(languages => this.languages = languages);
        this._profileService.getUserLanguages().subscribe(userLanguages => { 
          this.userLanguages = userLanguages.employee.languages });
        this._profileService.getSpecializationsNames().subscribe(specializations => this.specializations = specializations)
        this._profileService.getUserSpec().subscribe(userSpec => this.userSpec = userSpec.employee.specs);
        this._profileService.getSoftwareNames().subscribe(software => this.software = software);
        this._profileService.getUserSoftware().subscribe(userSoftware => this.userSoftware = userSoftware.employee.software);
        this._profileService.getCertificationsNames().subscribe(certifications => this.certifications = certifications);
        this._profileService.getUserCertifications().subscribe(userCertifications => this.userCertifications = userCertifications.employee.certifications);
        this._profileService.getCategoriesNames().subscribe(categories => this.categories = categories);
        this.userCategories = this.user.employee.categories;
        }else if(this.id==1){
          this.person = "Pracodawca";
          console.log("Firmy: "+ JSON.stringify(this.user.employer.company));
        } 

      });
  }


  logout() {
    this._authService.logout();
  }


confirmLang(lang): void{
  
  this._profileService.setLanguages(lang).subscribe()
  
}

confirmSpec(spec): void{
  this._profileService.setSpecializations(spec).subscribe()
}

confirmSoftware(software): void{
  this._profileService.setSoftware(software).subscribe()
}

confirmCertifications(certifications): void{
  this._profileService.setCertifications(certifications).subscribe()
}

confirmCategories(categories): void{
  
  this._profileService.setCategories(categories).subscribe()
  
}

createComp(): void{
  let comp = {"name": this.compName,
              "NIP": this.NIP,
              "city": this.compCity};
  this._profileService.company.create(comp).subscribe();
  this.user.employer.company.push(comp);
}

deleteComp(data: string): void{
  this._profileService.company.delete(data).subscribe();
  //console.log("wybrales NIP: "+data)
  let pos = this.user.employer.company.map(function(e) { return e.NIP }).indexOf(data);
  if(pos > -1)
    this.user.employer.company.splice(pos,1);
}

openDialog(tytul: string, tab, jsonName: string, tabNames: string[]) {
  let dialogRef = this.dialog.open(DialogProfileComponent, {
    width: '600px',
    data: {title: tytul, content: {presents: tab},jsonName: jsonName, tabNames: tabNames}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog closed: ${result}`);
    this.dialogResult = result;
    
    if(result == "Confirm")
    {
      switch(jsonName){
        case 'categories': {
          let nowy = {"categories": new Array()};
          for(let userCat of this.userCategories)
            {
              console.log("Nazwa: "+userCat.name)
              nowy.categories.push(userCat.name);}
          this.confirmCategories(nowy);
          // console.log(JSON.stringify(nowy))
          break;
        }
        case 'languages': {
          let nowy = {"languages": new Array()};
          for(let userLang of this.userLanguages)
            {
              console.log("Nazwa: "+userLang.name)
              nowy.languages.push(userLang.name);}
          this.confirmLang(nowy);
          // console.log(JSON.stringify(nowy))
          break;
        }
        case 'software': {
          let nowy = {"software": new Array()};
          for(let userSoft of this.userSoftware)
            {
              console.log("Nazwa: "+userSoft.name)
              nowy.software.push(userSoft.name);}
          this.confirmSoftware(nowy);
          // console.log(JSON.stringify(nowy))
          break;
        }
        case 'specs': {
          let nowy = {"specs": new Array()};
          for(let userSp of this.userSpec)
            {
              console.log("Nazwa: "+userSp.name)
              nowy.specs.push(userSp.name);}
          this.confirmSpec(nowy);
          // console.log(JSON.stringify(nowy))
          break;
        }
        case 'certifications': {
          let nowy = {"certifications": new Array()};
          for(let userCert of this.userCertifications)
            {
              console.log("Nazwa: "+userCert.name)
              nowy.certifications.push(userCert.name);}
          this.confirmCategories(nowy);
          // console.log(JSON.stringify(nowy))
          break;
        }
        default: console.log("Błąd");
      }
    }
      
  });
}
}
