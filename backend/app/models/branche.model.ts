import {Table, Column, Model} from 'sequelize-typescript';

@Table
export class Branche extends Model<Branche> {

    @Column
    brancheName!: string;


    toSimplification(): any {
        return {
            'id': this.id,
            'brancheName': this.brancheName,
        };
    }

    fromSimplification(simplification: any): void {
        this.brancheName = simplification['brancheName'];
    }

}