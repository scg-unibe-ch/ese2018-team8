import { Document, Paragraph, Packer, TextRun } from 'docx';
import {JobListing} from '../models/joblisting';
import {User} from '../models/user';
import {Company} from '../models/company';
import {CompanyService} from '../company/company.service';


export class ApplyingformGenerator {

  joblisting = new JobListing(null, '', '', '', false, '', 0, 0,
      0, null, 0, '', '', '', '', false);

  company = new Company(null, '', '', '', '',
      '', '', '', '');

  // companyService = new CompanyService();

  jobTitle = '';
  jobCompanyId = 0;

  createForm(jobTitle: string, jobCompanyId: number) {
    this.jobTitle = jobTitle;
    this.jobCompanyId = jobCompanyId;

    const document = new Document();

    // document.addParagraph(this.createContactInfo());
    // document.addParagraph(this.createHeading());

  }

  createCompanyAddress() {



    const paragraph = new Paragraph().center();
    // const contactInfo = new TextRun(`Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`);
    // const address = new TextRun("Address: 58 Elm Avenue, Kent ME4 6ER, UK").break();

    // paragraph.addRun(contactInfo);
    // paragraph.addRun(address);

    return paragraph;
  }

  createHeading(text) {
    return new Paragraph(text).heading1().thematicBreak();
  }

  createSubHeading(text) {
    return new Paragraph(text).heading2();
  }

  createInstitutionHeader(institutionName, dateText) {
    const paragraph = new Paragraph().maxRightTabStop();
    const institution = new TextRun(institutionName).bold();
    const date = new TextRun(dateText).tab().bold();

    paragraph.addRun(institution);
    paragraph.addRun(date);

    return paragraph;
  }

  createRoleText(roleText) {
    const paragraph = new Paragraph();
    const role = new TextRun(roleText).italic();

    paragraph.addRun(role);

    return paragraph;
  }

  createBullet(text) {
    return new Paragraph(text).bullet();
  }

  createSkillList(skills) {
    const paragraph = new Paragraph();
    // const skillConcat = skills.map((skill) => skill.name).join(", ") + ".";

    // paragraph.addRun(new TextRun(skillConcat));

    return paragraph;
  }

  createAchivementsList(achivements) {
    const arr = [];

    for (const achievement of achivements) {
      arr.push(new Paragraph(achievement.name).bullet());
    }

    return arr;
  }

  createInterests(interests) {
    const paragraph = new Paragraph();

    paragraph.addRun(new TextRun(interests));
    return paragraph;
  }

  splitParagraphIntoBullets(text) {
    return text.split("\n\n");
  }

  createPositionDateText(startDate, endDate, isCurrent) {
    const startDateText = this.getMonthFromInt(startDate.month) + ". " + startDate.year;
    const endDateText = isCurrent ? "Present" : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;

    return `${startDateText} - ${endDateText}`;
  }

  getMonthFromInt(value) {
    switch (value) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sept";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
    }
  }
}
