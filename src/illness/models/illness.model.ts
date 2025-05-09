import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import { Appointment } from "src/appointments/models/appointment.model"

interface IIllnessCreationAttr{
    name: string
    description: string
}

@Table({tableName: "illness"})
export class Illness extends Model<Illness, IIllnessCreationAttr> {
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

    @HasMany(() => Appointment)
    appointments: Appointment[]
}
