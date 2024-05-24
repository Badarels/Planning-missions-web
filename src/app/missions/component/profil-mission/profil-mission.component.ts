import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Missions } from 'src/app/shared/Model/Missions';
import { MissionService } from '../../services/mission.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil-mission',
  templateUrl: './profil-mission.component.html',
  styleUrls: ['./profil-mission.component.css']
})
export class ProfilMissionComponent {
 mission?: Missions;
 subcription= [] as  Subscription[];
 missionid:number=0;

 constructor(private missionService: MissionService , private route:  ActivatedRoute){}

 ngOnInit(): void {
  this.route.params.subscribe(params => {
      this.missionid = +params['id']; // Convertir l'ID en nombre
      this.getmissionById();
    });
    console.log('ID Mission récupéré dans Oninit:',this.missionid )
  }

 getmissionById(){
    this.missionService.getMissionById(this.missionid).subscribe(
        (data: Missions)=>{
          this.mission=data;
        },
        (error)=>{
          console.log("Erreur lors de la récupération de la mission", error)
        }
        );
    }
   
 }

