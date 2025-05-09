import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Patient } from "src/patients/models/patient.model";
import { Payment } from "src/payments/models/payment.model";

interface IInsuranceCreationAttr {
    patientId: number;
    insuranceCompany: string;
    insuranceNumber: string;
    amountCovered: number;
    expirationDate: string;
}

@Table({ tableName: "insurance" })
export class Insurance extends Model<Insurance, IInsuranceCreationAttr> {
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
    
    @Column({
        type: DataType.STRING,
    })
    declare insuranceCompany: string;

    @Column({
        type: DataType.STRING,
    })
    declare insuranceNumber: string;

    @Column({
        type: DataType.FLOAT,
    })
    declare amountCovered: number;

    @Column({
        type: DataType.STRING,
    })
    declare expirationDate: string;

    @HasMany(() => Payment)
    patients: Payment[];
}
