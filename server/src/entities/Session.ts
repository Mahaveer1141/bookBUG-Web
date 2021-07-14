import { ISession } from "connect-typeorm";
import { Column, Entity, Index, PrimaryColumn } from "typeorm";
@Entity()
export class Session implements ISession {
  @Index()
  @Column("bigint")
  public expiredAt = Date.now() + 315360000000;

  @PrimaryColumn("varchar", { length: 255 })
  public id = "";

  @Column("text")
  public json = "";
}
