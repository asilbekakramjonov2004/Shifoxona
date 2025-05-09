import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { MedicalRecord } from "src/medical-records/models/medical-record.model";
import { Medication } from "src/medications/models/medication.model";

interface IPrescriptionCreationAttr {
    medicalRecordId: number;
    medicationId: number;
    dosage: number;
    frequency: string;
    duration: string;
}

@Table({ tableName: "prescription" })
export class Prescription extends Model<Prescription, IPrescriptionCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @ForeignKey(() => MedicalRecord)
    @Column({
        type: DataType.INTEGER,
    })
    declare medicalRecordId: number;
    @BelongsTo(() => MedicalRecord)
    medicalRecord: MedicalRecord;

    @ForeignKey(() => Medication)
    @Column({
        type: DataType.INTEGER,
    })
    declare medicationId: number;
    @BelongsTo(() => Medication)
    medication: Medication;

    @Column({
        type: DataType.INTEGER,
    })
    declare dosage: number;

    @Column({
        type: DataType.STRING,
    })
    declare frequency: string;

    @Column({
        type: DataType.STRING,
    })
    declare duration: string;
}
