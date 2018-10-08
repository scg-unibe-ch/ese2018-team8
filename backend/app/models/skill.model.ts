import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {JobListing} from './joblisting.model';

@Table
export class Skill extends Model<Skill> {

    @Column
    name!: string;

    @ForeignKey(() => JobListing)
    @Column
    jobListingId!: number;

    @BelongsTo(() => JobListing)
    jobListing!: JobListing;

    toSimplification(): any {
        return {
            'id': this.id,
            'name': this.name,
        };
    }

    fromSimplification(simplification: any): void {
        this.name = simplification['name'];
        this.jobListingId = simplification['jobListingId'];
    }

}