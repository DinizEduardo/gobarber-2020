import { uuid } from 'uuidv4';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // se não colocar nada o padrão é varchar
  provider: string;

  @Column('time with time zone')
  date: Date;
}

export default Appointment;
