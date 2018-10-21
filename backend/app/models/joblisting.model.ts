import {Table, Column, Model, HasMany, CreatedAt, DataType, UpdatedAt, ForeignKey} from 'sequelize-typescript';
import {Skill} from './skill.model';
import {Sector} from './sector.model';
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

    @ForeignKey(() => Sector)
    @Column
    brancheId!: number;

    @Column
    jobPensumFrom!: number;

    @Column
    jobPensumTo!: number;

    @Column
    payment!: number;

    @ForeignKey(() => Company)
    @Column
    companyId!: number;

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
            'isVerified': this.isVerified,
            'brancheId': this.brancheId,
            'jobPensum': {
                'pensumFrom': this.jobPensumFrom,
                'pensumTo': this.jobPensumTo
            },
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
        this.brancheId = simplification['brancheId'];
        this.jobPensumFrom = simplification['jobPensum']['pensumFrom'];
        this.jobPensumTo = simplification['jobPensum']['pensumTo'];
        this.payment = simplification['payment'];
        this.companyId = simplification['companyId'];
        this.contactPerson = simplification['contactPerson'];
        this.contactPhone = simplification['contactPhone'];
        this.contactEmail = simplification['contactEmail'];
    }

}