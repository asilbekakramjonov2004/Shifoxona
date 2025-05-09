import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Patient } from "src/patients/models/patient.model"

interface IFeedbackCreationAttr{
    patientId: number
    rating: string
    comment: string
}

@Table({tableName: "feedbacks"})
export class Feedback extends Model<Feedback, IFeedbackCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number

    @ForeignKey(() => Patient)
    @Column({
        type: DataType.INTEGER
    })
    declare patientId: number
    @BelongsTo(() => Patient)
    patient: Patient

    @Column({
        type: DataType.STRING
    })
    declare rating: string

    @Column({
        type: DataType.STRING
    })
    declare comment: string
}
