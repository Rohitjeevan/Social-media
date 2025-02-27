import path from 'node:path';
import i18n from 'i18n';

i18n.configure({
  locales: ['en-US', 'ja-JP', 'fr-FR'],
  defaultLocale: 'en-US',
  syncFiles: true,
  autoReload: true,
  directory: path.join(__dirname, '../locals'),
});

export { i18n };
