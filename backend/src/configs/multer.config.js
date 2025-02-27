import { memoryStorage } from 'multer';

/**
 * @type {import('multer').Options}
 */
export const multerConfig = {
  storage: memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
};


