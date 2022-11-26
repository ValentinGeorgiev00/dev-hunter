import { DevelopersModule } from "../developers/developers.module";

export class Technology {
  id!: number;
  name!: string;
  image?: string;
  developers?:DevelopersModule[]
}
