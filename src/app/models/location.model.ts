import { DevelopersModule } from "../developers/developers.module";

export class Location {
  id!: number;
  name!: string;
  googleMapLink?: string;
  developers?:DevelopersModule[]
}
