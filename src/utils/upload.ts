// @ts-nocheck
import shortid from 'shortid';
import fs from 'fs';
import * as admin from 'firebase-admin';

const UPLOAD_DIR = './dist/uploads';

export const storeFS = ({ stream }) => {
  const id = shortid.generate();
  const path = `${UPLOAD_DIR}/${id}`;
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated) fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path }))
  );
};

export const storeFB = ({ stream, mimetype }: any) => {
  const id = shortid.generate();
  const bucket = admin.storage().bucket();
  return new Promise((resolve, reject) => {
    if (!stream) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('No image file');
    }
    const fileUpload = bucket.file(id);

    stream
      .on('error', error => {
        // eslint-disable-next-line no-undef
        if (stream.truncated) fs.unlinkSync(path);
        reject(error);
      })
      .pipe(
        fileUpload.createWriteStream({
          metadata: {
            contentType: mimetype,
          },
        })
      )
      .on('error', error => reject(error))
      .on('finish', () => {
        const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
        resolve({ id, url });
      });
  });
};
