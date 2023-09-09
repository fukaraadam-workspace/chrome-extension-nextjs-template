import * as fs from 'fs-extra';

const outDirectory = '../../out';

async function bundleExtensionClean() {
  // Remove old directory
  await fs.remove(outDirectory);
  console.log(`bundle-extension-clean: Removed ${outDirectory}`);
}

// Self-invocation async function
(async () => {
  await bundleExtensionClean();
})().catch((err) => {
  console.error(err);
  throw err;
});
