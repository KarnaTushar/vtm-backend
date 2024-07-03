import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  vehicleNumber!: string;

  @Column()
  vehicleType!: string;

  @Column({ nullable: true })
  puc_certificate!: string;

  @Column({ nullable: true })
  insurance_certificate!: string;
}
