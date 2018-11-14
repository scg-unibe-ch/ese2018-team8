export class JobListing {

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public isVerified: boolean,
    public branche: string,
    public jobPensumFrom: number,
    public jobPensumTo: number,
    public payment: number,
    public companyId: number,
    public contactPerson: string,
    public contactPhone: string,
    public contactEmail: string

  ) {
  }

}
