import { container } from 'tsyringe';

import IMailTemplateProvider from './models/IMailTemplateProvider';

import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
  ses: container.resolve(HandlebarsMailTemplateProvider),
};


container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars
);
