import {Table, Column, Model} from 'sequelize-typescript';

@Table
export class Company extends Model<Company> {

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

    toSimplification(): any {
        return {
            'id': this.id,
            'companyName': this.companyName,
            'companyStreet': this.companyStreet,
            'companyZIP': this.companyZIP,
            'companyCity': this.companyCity,
            'companyPhone': this.companyPhone,
            'companyPerson': this.companyPerson
        };
    }

    fromSimplification(simplification: any): void {
        this.companyName = simplification['companyName'];
        this.companyStreet = simplification['companyStreet'];
        this.companyZIP = simplification['companyZIP'];
        this.companyCity = simplification['companyCity'];
        this.companyPhone = simplification['companyPhone'];
        this.companyPerson = simplification['companyPerson'];
    }

}