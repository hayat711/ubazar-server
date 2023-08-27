import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../../common/entities/abstract.entitiy";


@Entity()
class PublicFile extends AbstractEntity<PublicFile>{

  @Column()
  public url : string

  @Column()
  public key: string

}

export default PublicFile;
