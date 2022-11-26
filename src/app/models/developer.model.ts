import { Location } from "./location.model";
import { Technology } from "./technology.model";

export class Developer {
  id!: number;
  name!: string;
  email!:string;
  phoneNumber!:number;
  locationId!:number;
  technologyId!:number;
  location!:Location;
  technology!:Technology;
  pricePerHour!:number;
  yearsOfExperience!:number;
  nativeLanguage!:string;
  profilePictureURL?:string;
  description?:string;
  linkedinProfileLink?:string;

}
