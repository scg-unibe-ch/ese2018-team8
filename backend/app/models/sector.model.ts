import {Table, Column, Model} from 'sequelize-typescript';

@Table
export class Sector extends Model<Sector> {

    @Column
    sectorName!: string;


    toSimplification(): any {
        return {
            'id': this.id,
            'sectorName': this.sectorName,
        };
    }

    fromSimplification(simplification: any): void {
        this.sectorName = simplification['sectorName'];
    }

}