import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Doctor } from "src/doctors/models/doctor.model";
import { Illness } from "src/illness/models/illness.model";
import { MedicalRecord } from "src/medical-records/models/medical-record.model";
import { Patient } from "src/patients/models/patient.model";
import { Payment } from "src/payments/models/payment.model";

interface IAppointmentCreationAttr {
    patientId: number;
    doctorId: number;
    appointment_date: Date;
    illnessId: number;
    status: string;
    notes: string;
}

@Table({ tableName: "appointments" })
export class Appointment extends Model<Appointment, IAppointmentCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ForeignKey(() => Patient)
    @Column({ type: DataType.INTEGER })
    declare patientId: number;
    @BelongsTo(() => Patient)
    patient: Patient;
    
    @ForeignKey(() => Doctor)
    @Column({ type: DataType.INTEGER })
    declare doctorId: number;
    @BelongsTo(() => Doctor)
    doctor: Doctor;

    @Column({ type: DataType.DATE })
    declare appointment_date: Date;

    @ForeignKey(() => Illness)
    @Column({ type: DataType.INTEGER })
    declare illnessId: number;
    @BelongsTo(() => Illness)
    illness: Illness;

    @Column({ type: DataType.STRING })
    declare status: string;
    
    @Column({ type: DataType.STRING })
    declare notes: string;

    @HasMany(() => MedicalRecord)
    medicalRecords: MedicalRecord[];

    @HasMany(() => Payment)
    payments: Payment[];
}
