import { NgIterable } from "@angular/core";
import { RoleModel } from "./Role.Model";

export class UtilisateurModel{
    public id: number | undefined;
    public nomUser: string | undefined;
    public prenomUser: string | undefined;
    public login: string | undefined;
    public passwordUser: string | undefined;
    public date_naissanceUser: string | undefined;
    public telephoneUser: string | undefined;
    public emailUser: string | undefined;
    public sexeUser: string | undefined;
    public adresseuser: string | undefined;
    public archive: boolean | undefined;
    public passwordChange: boolean | undefined;
    public numero_piece_identiteUser: boolean | undefined;
    public roles: RoleModel |  undefined;

   
}