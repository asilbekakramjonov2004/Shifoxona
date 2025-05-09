import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Appointment } from "src/appointments/models/appointment.model";
import { Prescription } from "src/prescriptions/models/prescription.model";

interface IMedicalRecordCreationAttr {
    appointmentId: number;
    description: string;
    diagnosis: string;
}

@Table({ tableName: "medical_record" })
export class MedicalRecord extends Model<MedicalRecord, IMedicalRecordCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;
    
    @ForeignKey(() => Appointment)
    @Column({
        type: DataType.INTEGER,
    })
    declare appointmentId: number;
    @BelongsTo(() => Appointment)
    appointment: Appointment;
    
    @Column({
        type: DataType.STRING,
    })
    declare description: string;

    @Column({
        type: DataType.STRING,
    })
    declare diagnosis: string;

    @HasMany(() => Prescription)
    prescriptions: Prescription[];
}
