import { BaseEntity, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class RefreshToken extends BaseEntity {
  @PrimaryColumn()
  refreshToken: string;
}
