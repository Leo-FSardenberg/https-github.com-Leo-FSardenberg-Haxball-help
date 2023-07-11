import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
  } from 'typeorm';

@Entity({name: 'players'})
export class PlayerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'name', nullable: false, unique: true})
    name: string;

    @Column({name: 'senha', length: 255, nullable: false})
    senha: string
    
    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @DeleteDateColumn()
    deletedAt: string;
}

