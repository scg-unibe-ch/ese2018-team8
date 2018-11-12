import {Table, Column, Model, Unique} from 'sequelize-typescript';



@Table
export class User extends Model<User> {

    @Unique
    @Column
    name!: string;

    @Unique
    @Column
    email!: string;

    @Column
    password!: string;

    @Column
    role!: string;

    @Column
    isVerified!: boolean;

    toSimplification(): any {
        return {
            'id': this.id,
            'name': this.name,
            'email': this.email,
            'role': this.role,
            'isVerified': this.isVerified
        };
    }

    fromSimplification(simplification: any): void {
        this.name = simplification['name'];
        this.email = simplification['email'];
        this.password = simplification['password'];
        this.role = simplification['role'];
        this.isVerified = simplification['isVerified'];
    }
}