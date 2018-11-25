import {Table, Column, Model, HasMany, CreatedAt, DataType, UpdatedAt, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Skill} from './skill.model';
import {Company} from './company.model';


@Table
export class JobListing extends Model<JobListing> {

    @Column
    title!: string;

    @Column
    description!: string;

    @CreatedAt
    @Column(DataType.DATE)
    creationDate!: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    updateDate!: Date;

    @Column
    isVerified!: boolean;

    @HasMany(() => Skill)
    necessarySkills!: Skill[];

    @Column
    branche!: number;

    @Column
    jobPensumFrom!: number;

    @Column
    jobPensumTo!: number;

    @Column
    payment!: number;

    @Column
    skills!: string;

    @Column(DataType.DATE)
    deadline!: Date;

    @ForeignKey(() => Company)
    @Column
    companyId!: number;

    @BelongsTo(() => Company, {onDelete: 'cascade'})
    company!: Company;

    @Column
    contactPerson!: string;

    @Column
    contactPhone!: string;

    @Column
    contactEmail!: string;

    toSimplification(): any {
        return {
            'id': this.id,
            'title': this.title,
            'description': this.description,
            'creationDate': this.creationDate.toISOString(),
            'updateDate': this.updateDate.toISOString(),
            'payment': this.payment,
            'skills': this.skills,
            'deadline': this.deadline.toISOString(),
            'isVerified': this.isVerified,
            'branche': this.branche,
            'jobPensumFrom': this.jobPensumFrom,
            'jobPensumTo': this.jobPensumTo,
            'companyId': this.companyId,
            'contactPerson': this.contactPerson,
            'contactPhone': this.contactPhone,
            'contactEmail': this.contactEmail,
        };
    }

    fromSimplification(simplification: any): void {
        this.title = simplification['title'];
        this.description = simplification['description'];
        this.isVerified = simplification['isVerified'];
        this.branche = simplification['branche'];
        this.jobPensumFrom = simplification['jobPensumFrom'];
        this.jobPensumTo = simplification['jobPensumTo'];
        this.payment = simplification['payment'];
        this.skills = simplification['skills'];
        this.deadline =  new Date (simplification['deadline']);
        this.companyId = simplification['companyId'];
        this.contactPerson = simplification['contactPerson'];
        this.contactPhone = simplification['contactPhone'];
        this.contactEmail = simplification['contactEmail'];
    }

}
