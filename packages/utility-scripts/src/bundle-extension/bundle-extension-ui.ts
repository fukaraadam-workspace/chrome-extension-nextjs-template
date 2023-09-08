import * as fs from 'fs-extra';
import * as path from 'path';

const uiDirectory = '../app-ui/out';
const outDirectory = '../../out';

async function BundleExtensionUi() {
  await fs.copy(uiDirectory, outDirectory);
  console.log(
    `bundle-extension-ui: Directory ${uiDirectory} copied to ${outDirectory}`,
  );

  const directoryToRename = path.join(outDirectory, '/_next');
  const newDirectoryName = path.join(outDirectory, '/next');

  // Remove old directory
  await fs.remove(newDirectoryName);
  console.log(`bundle-extension-ui: Removed ${newDirectoryName}`);

  // Rename the directory
  await fs.rename(directoryToRename, newDirectoryName);
  console.log(
    `bundle-extension-ui: Directory ${directoryToRename} renamed to ${newDirectoryName}`,
  );

  // Search and replace in HTML files
  await searchAndReplaceInFiles(outDirectory, /\/_next/g, '/next');
  console.log('bundle-extension-ui: Search and Replace is done');
}

async function searchAndReplaceInFiles(
  directory: string,
  searchPattern: string | RegExp,
  replaceText: string,
) {
  const files = await fs.readdir(directory);

  files.forEach(async (file) => {
    const filePath = path.join(directory, file);

    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      // Recursively search and replace in subdirectories
      await searchAndReplaceInFiles(filePath, searchPattern, replaceText);
    } else if (stats.isFile()) {
      // Process HTML files
      const data = await fs.readFile(filePath, 'utf8');

      let isFoundInFile = false;
      const updatedData = data.replaceAll(searchPattern, function (_match) {
        isFoundInFile = true;
        return replaceText;
      });

      if (isFoundInFile) {
        await fs.writeFile(filePath, updatedData, 'utf8');
        console.log(`bundle-extension-ui: Updated file: ${filePath}`);
      }
    }
  });
}

// Self-invocation async function
(async () => {
  await BundleExtensionUi();
})().catch((err) => {
  console.error(err);
  throw err;
});
