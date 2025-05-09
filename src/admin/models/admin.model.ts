import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr{
    name: string
    email: string
    phone_number: string
    hashed_password: string
    role: string
    refresh_token?: string
}


@Table({tableName: "admin"})
export class Admin extends Model<Admin, IAdminCreationAttr> {
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
    declare email: string

    @Column({
        type: DataType.STRING
    })
    declare phone_number: string

    @Column({
        type: DataType.STRING
    })
    declare hashed_password: string

    @Column({
        type: DataType.ENUM("admin", "superadmin")
    })
    declare role: string

    @Column({
        type: DataType.STRING
    })
    declare hashed_refresh_token: string

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    declare is_active: boolean

    @Column({
        type: DataType.STRING(100),
        defaultValue: DataType.UUIDV4(),
    })
    declare activation_link: string;
}
