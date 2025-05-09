import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import { Prescription } from "src/prescriptions/models/prescription.model"

interface IMedicationCreationAtte{
    name: string
    description: string
    side_effects: string
}

@Table({tableName: "medication"})
export class Medication extends Model<Medication, IMedicationCreationAtte> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number

    @Column({
        type: DataType.STRING
    })
    declare name: string

    @Column({
        type: DataType.STRING
    })
    declare description: string

    @Column({
        type: DataType.STRING
    })
        declare side_effects: string

    @HasMany(() => Prescription)
    prescriptions: Prescription[]
}
