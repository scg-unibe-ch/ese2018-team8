import {Table, Column, Model} from 'sequelize-typescript';

@Table
export class Contact extends Model<Contact> {

    @Column
    CompanyName!: string;

    @Column
    CompanyStreet!: string;

    @Column
    CompanyZIP!: string;

    @Column
    CompanyCity!: string;

    @Column
    CompanyPhone!: string;

    @Column
    CompanyPerson!: string;

    toSimplification(): any {
        return {
            'id': this.id,
            'CompanyName': this.CompanyName,
            'CompanyStreet': this.CompanyStreet,
            'CompanyZIP': this.CompanyZIP,
            'CompanyCity': this.CompanyCity,
            'CompanyPhone': this.CompanyPhone,
            'CompanyPerson': this.CompanyPerson
        };
    }

    fromSimplification(simplification: any): void {
        this.CompanyName = simplification['CompanyName'];
        this.CompanyStreet = simplification['CompanyStreet'];
        this.CompanyZIP = simplification['CompanyZIP'];
        this.CompanyCity = simplification['CompanyCity'];
        this.CompanyPhone = simplification['CompanyPhone'];
        this.CompanyPerson = simplification['CompanyPerson'];
    }

}