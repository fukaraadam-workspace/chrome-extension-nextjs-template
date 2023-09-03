import * as fs from 'fs';
import * as path from 'path';

const sourceDirectory = '../extension/out';
const destinationDirectory = '../out';

// Rename the directory
fs.readdir(sourceDirectory, (err, files) => {
  if (err) {
    console.error('--Error reading extension directory--');
    throw err;
  } else {
    console.log(`Extension files to be moved: ${files}`);

    for (const file of files) {
      const sourceFilePath = path.join(sourceDirectory, file);
      const destinationFilePath = path.join(destinationDirectory, file);

      fs.rename(sourceFilePath, destinationFilePath, (err) => {
        if (err) {
          console.error('--Error renaming file--');
          throw err;
        } else {
          console.log(`Moved ${sourceFilePath} to ${destinationFilePath}`);
        }
      });
    }
  }
});
