import * as fs from 'fs-extra';
import * as path from 'path';

const uiDirectory = '../app-ui/out';
const outDirectory = '../../out';

fs.copy(uiDirectory, outDirectory, (err) => {
  if (err) {
    console.error('--Error copying directory--');
    throw err;
  } else {
    console.log(`Directory ${uiDirectory} copied to ${outDirectory}`);

    const directoryToRename = path.join(outDirectory, '/_next');
    const newDirectoryName = path.join(outDirectory, '/next');
    // Rename the directory
    fs.rename(directoryToRename, newDirectoryName, (err) => {
      if (err) {
        console.error('--Error renaming directory--');
        throw err;
      } else {
        console.log(
          `Directory ${directoryToRename} renamed to ${newDirectoryName}`,
        );

        // Search and replace in HTML files
        searchAndReplaceInFiles(outDirectory, /\/_next/g, '/next');
      }
    });
  }
});

function searchAndReplaceInFiles(
  directory: string,
  searchPattern: string | RegExp,
  replaceText: string,
) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('--Error reading directory--');
      throw err;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);

      fs.stat(filePath, (statErr, stats) => {
        if (statErr) {
          console.error('--Error getting file stats--');
          throw statErr;
        }

        if (stats.isDirectory()) {
          // Recursively search and replace in subdirectories
          searchAndReplaceInFiles(filePath, searchPattern, replaceText);
        } else if (stats.isFile()) {
          // Process HTML files
          fs.readFile(filePath, 'utf8', (readErr, data) => {
            if (readErr) {
              console.error('--Error reading file--');
              throw readErr;
            }

            let isFoundInFile = false;
            const updatedData = data.replaceAll(
              searchPattern,
              function (_match) {
                isFoundInFile = true;
                return replaceText;
              },
            );

            if (isFoundInFile) {
              fs.writeFile(filePath, updatedData, 'utf8', (writeErr) => {
                if (writeErr) {
                  console.error('--Error writing file--');
                  throw writeErr;
                } else {
                  console.log(`Updated file: ${filePath}`);
                }
              });
            }
          });
        }
      });
    });
  });
}
