export class User {

  constructor(
    public id: number,
    public prename: string,
    public name: string,
    public email: string,
    public role: string,
    public isVerified: boolean
  ) {
  }

}
