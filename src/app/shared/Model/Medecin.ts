import { Adresse } from "./Adresse";
import { Specialite } from "./Specialite";

export class Medecin{
    public id: number | undefined;
    public nomMedecin : string | undefined;
    public prenomMedecin:string | undefined ;
    public sexeMedecin:string | undefined ;
    public emailMedecin: string | undefined;
    public dateDeNaissanceMedecin: string | undefined;
    public lieuDeNaissanceMedecin: string | undefined;
    public numeroSecuriteSocialeMedecin: string | undefined;
    public telephoneMedecin_1 : string | undefined;
    public telephoneMedecin_2: string | undefined;
    public statutMedecin: string | undefined;
    public numeroRpps: string | undefined;
    public inscription_A_lordre: boolean | undefined;
    public adresse :Adresse | undefined; 
    public specialites :Specialite[] | undefined; 
}

