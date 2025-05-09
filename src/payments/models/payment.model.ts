import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Appointment } from "src/appointments/models/appointment.model";
import { Insurance } from "src/insurance/models/insurance.model";
import { Patient } from "src/patients/models/patient.model";

interface IPaymentCreationAttr {
    patientId: number;
    appointmentId: number;
    insuranceId: number;
    amount: number;
    paymentMethod: string;
    status: string;
}

@Table({ tableName: "payment" })    
export class Payment extends Model<Payment, IPaymentCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ForeignKey(() => Patient)
    @Column({type: DataType.INTEGER})
    declare patientId: number;
    @BelongsTo(() => Patient)
    patient: Patient;

    @ForeignKey(() => Appointment)
    @Column({type: DataType.INTEGER})
    declare appointmentId: number;
    @BelongsTo(() => Appointment)
    appointment: Appointment;

    @ForeignKey(() => Insurance)
    @Column({type: DataType.INTEGER})
    declare insuranceId: number;
    @BelongsTo(() => Insurance)
    insurance: Insurance;

    @Column({type: DataType.FLOAT})
    declare amount: number;

    @Column({type: DataType.STRING})
    declare paymentMethod: string;

    @Column({type: DataType.STRING})
    declare status: string;
}
