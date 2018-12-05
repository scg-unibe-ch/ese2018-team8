import {Table, Column, Model, Unique, HasOne} from 'sequelize-typescript';
import {Company} from './company.model';



@Table
export class User extends Model<User> {

    @Unique
    @Column
    email!: string;

    @Column
    password!: string;

    @Column
    role!: string;

    @Column
    isVerified!: boolean;

    @HasOne(() => Company)
    company!: Company;

    @Column
    comment!: string;

    toSimplification(): any {
        return {
            'id': this.id,
            'email': this.email,
            'role': this.role,
            'isVerified': this.isVerified,
            'comment': this.comment
        };
    }

    fromSimplification(simplification: any): void {
        this.email = simplification['email'];
        this.password = simplification['password'];
        this.role = simplification['role'];
        this.isVerified = simplification['isVerified'];
        this.comment = simplification['comment'];
    }
}
