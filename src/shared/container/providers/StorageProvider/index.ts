import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import mailConfig from '@config/mail';


import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider
};


container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
);
