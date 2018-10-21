import {Table, Column, Model, HasMany, CreatedAt, DataType, UpdatedAt, ForeignKey} from 'sequelize-typescript';
import {Skill} from './skill.model';
import {Branche} from './branche.model';


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

    @ForeignKey(() => Branche)
    @Column
    brancheId!: number;

    @Column
    jobPensumFrom!: number;

    @Column
    jobPensumTo!: number;

    @Column
    ContactCompanyName!: string;

    @Column
    ContactStreet!: string;

    @Column
    ContactZIP!: string;

    @Column
    ContactCity!: string;

    @Column
    ContactPhone!: string;

    @Column
    ContactPerson!: string;

    toSimplification(): any {
        return {
            'id': this.id,
            'title': this.title,
            'description': this.description,
            'creationDate': this.creationDate.toISOString(),
            'updateDate': this.updateDate.toISOString(),
            'isVerified': this.isVerified,
            'brancheId': this.brancheId,
            'jobPensum': {'pensumFrom': this.jobPensumFrom,
                'pensumTo': this.jobPensumTo,
            },
            'contact': {'companyName': this.ContactCompanyName,
                'street': this.ContactStreet,
                'zip': this.ContactZIP,
                'city': this.ContactCity,
                'phone': this.ContactPhone,
                'person': this.ContactPerson
            }
        };
    }

    fromSimplification(simplification: any): void {
        this.title = simplification['title'];
        this.description = simplification['description'];
        this.isVerified = simplification['isVerified'];
        this.brancheId = simplification['brancheId'];
        this.jobPensumFrom = simplification['jobPensum']['pensumFrom'];
        this.jobPensumTo = simplification['jobPensum']['pensumTo'];
        this.ContactCompanyName = simplification['contact']['companyName'];
        this.ContactStreet = simplification['contact']['street'];
        this.ContactZIP = simplification['contact']['zip'];
        this.ContactCity = simplification['contact']['city'];
        this.ContactPhone = simplification['contact']['phone'];
        this.ContactPerson = simplification['contact']['person'];
    }

}