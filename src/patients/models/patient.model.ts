import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import { Appointment } from "src/appointments/models/appointment.model"
import { Feedback } from "src/feedbacks/models/feedback.model"
import { Insurance } from "src/insurance/models/insurance.model"
import { LabTest } from "src/lab-tests/models/lab-test.model"
import { Payment } from "src/payments/models/payment.model"

interface IPatientCreationAttr{
    first_name: string
    last_name: string
    email: string
    hashed_password: string
    phone_number: string
    passport: string
    address: string
}

@Table({tableName: "patient"})
export class Patient extends Model<Patient, IPatientCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number

    @Column({
        type: DataType.STRING,
    })
    declare first_name: string

    @Column({
        type: DataType.STRING,
    })
    declare last_name: string

    @Column({
        type: DataType.STRING,
    })
    declare email: string

    @Column({
        type: DataType.STRING,
    })
    declare phone_number: string

    @Column({
        type: DataType.STRING,
    })
    declare passport: string

    @Column({
        type: DataType.STRING,
    })
    declare hashed_password: string

    @Column({
        type: DataType.STRING,
    })
    declare address: string

    @Column({
        type: DataType.STRING(100),
      })
    declare hashed_refresh_token: string;
    @Column({
      type: DataType.BOOLEAN,
      defaultValue: false,
    })
    declare is_active: boolean;

    @Column({
        type: DataType.STRING,
        defaultValue: "patient",
      })
      declare role: string;
    @Column({
      type: DataType.STRING(100),
      defaultValue: DataType.UUIDV4(),
    })
    declare activation_link: string;

    @HasMany(() => LabTest)
    labtest: LabTest[]

    @HasMany(() => Feedback)
    feedback: Feedback[]

    @HasMany(() => Appointment)
    appointments: Appointment[]

    @HasMany(() => Insurance)
    insurances: Insurance[]

    @HasMany(() => Payment)
    payments: Payment[]
}
