import { RoleModel } from "./Role.Model";

export class UtilisateurModel{
    public id: number | undefined;
    public nom: string | undefined;
    public prenom: string | undefined;
    public login: string | undefined;
    public password: string | undefined;
    public telephone: string | undefined;
    public email: string | undefined;
    public archive: boolean | undefined;
    public passwordChange: boolean | undefined;
    public RoleModel: RoleModel | undefined;
}