// src/entity/Transfer.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Driver } from "./Driver";
import { Vehicle } from "./Vehicle";

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Driver, { nullable: true })
  fromDriver!: Driver | null;

  @ManyToOne(() => Driver, { nullable: true })
  toDriver!: Driver | null;

  @ManyToOne(() => Vehicle)
  vehicle!: Vehicle;

  @CreateDateColumn()
  transferDate!: Date;

  @Column({ nullable: true })
  toEntity!: string; // For future transfer to other entities

  @Column({ default: true })
  active!: boolean;
}
