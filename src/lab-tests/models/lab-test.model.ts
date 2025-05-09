import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Doctor } from "src/doctors/models/doctor.model"
import { Patient } from "src/patients/models/patient.model"

interface ILabTestsCreationAttr{
    patientId: number
    test_type: string
    result: string
    doctorId: number
    test_date: Date
}

@Table({tableName: "lab-test"})
export class LabTest extends Model<LabTest, ILabTestsCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number

    @ForeignKey(() => Patient)
    @Column({
        type: DataType.INTEGER,
    })
    declare patientId: number
    @BelongsTo(() => Patient)
    patient: Patient

    @Column({
        type: DataType.STRING,
    })
    declare test_type: string

    @Column({
        type: DataType.STRING,
    })
    declare result: string

    @ForeignKey(() => Doctor)
    @Column({
        type: DataType.INTEGER,
    })
    declare doctorId: number
    @BelongsTo(() => Doctor)
    doctor: Doctor

    @Column({
        type: DataType.DATE,
    })
    declare test_date: Date
}
