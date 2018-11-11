import {Table, Column, Model, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {User} from './user.model';

@Table
export class Company extends Model<Company> {

    @ForeignKey(() => User)
    @Column
    userId!: number;

    @Column
    companyName!: string;

    @Column
    companyStreet!: string;

    @Column
    companyZIP!: string;

    @Column
    companyCity!: string;

    @Column
    companyPhone!: string;

    @Column
    companyPerson!: string;

    @BelongsTo(() => User, {onDelete: 'cascade'})
    user!: User;

    toSimplification(): any {
        return {
            'id': this.id,
            'userId': this.userId,
            'companyName': this.companyName,
            'companyStreet': this.companyStreet,
            'companyZIP': this.companyZIP,
            'companyCity': this.companyCity,
            'companyPhone': this.companyPhone,
            'companyPerson': this.companyPerson
        };
    }

    fromSimplification(simplification: any): void {
        this.userId = simplification['userId'];
        this.companyName = simplification['companyName'];
        this.companyStreet = simplification['companyStreet'];
        this.companyZIP = simplification['companyZIP'];
        this.companyCity = simplification['companyCity'];
        this.companyPhone = simplification['companyPhone'];
        this.companyPerson = simplification['companyPerson'];
    }

}