import IParseMailTemplateDTO from '@shared/container/providers/MailTemplatesProvider/dtos/IParseMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateDate: IParseMailTemplateDTO;
}
