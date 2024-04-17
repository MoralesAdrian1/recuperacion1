export class animalesModel {
    _id?: string;
    tipoAnimal:string="";
}
export class razaModel {
    _id?: string;
    tipoAnimal:string="";
    nombreRaza:string="";
}
export class vacunasModel {
    _id?: string;
    nombreVacuna:string="";
    fechaVacuna:String="";
}

export interface HistorialModel {
    _id?: string;
    duenio:String;
    nombreMascota: string;
    tipoAnimal: string;
    nombreRaza: string;
    vacunas: { nombreVacuna: string,fechaVacuna:String}[];
    consultas: { tipoConsulta: string, observaciones: String}[];
  }