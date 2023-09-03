import * as fs from 'fs-extra';
import * as path from 'path';

const sourceDirectory = '../extension-specific/out';
const outDirectory = '../../out';

fs.copy(sourceDirectory, outDirectory, (err) => {
  if (err) {
    console.error('--Error copying directory--');
    throw err;
  } else {
    console.log(`Directory ${sourceDirectory} copied to ${outDirectory}`);
  }
});
