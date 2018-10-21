import {Table, Column, Model} from 'sequelize-typescript';

@Table
export class JobPensum extends Model<JobPensum> {

    @Column
    pensumFrom!: number;

    @Column
    pensumTo!: number;

    toSimplification(): any {
        return {
            'id': this.id,
            'pensumFrom': this.pensumFrom,
            'pensumTo': this.pensumTo,
        };
    }

    fromSimplification(simplification: any): void {
        this.pensumFrom = simplification['pensumFrom'];
        this.pensumTo = simplification['pensumTo'];
    }

}