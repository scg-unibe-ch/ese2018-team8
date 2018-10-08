import {Table, Column, Model, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript';
import {Skill} from './skill.model';


@Table
export class JobListing extends Model<JobListing> {

    @Column
    title!: string;

    @Column
    description!: string;

    @HasMany(() => Skill)
    necessarySkills!: Skill[];

    toSimplification(): any {
        return {
            'id': this.id,
            'title': this.title,
            'description': this.description
        };
    }

    fromSimplification(simplification: any): void {
        this.title = simplification['title'];
        this.description = simplification['description'];
    }

}