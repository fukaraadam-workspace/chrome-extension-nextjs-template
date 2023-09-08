import * as fs from 'fs-extra';

const sourceDirectory = '../extension-specific/out';
const outDirectory = '../../out';

async function bundleExtensionSpecific() {
  await fs.copy(sourceDirectory, outDirectory);
  console.log(
    `bundle-extension-specific: Directory ${sourceDirectory} copied to ${outDirectory}`,
  );
}

// Self-invocation async function
(async () => {
  await bundleExtensionSpecific();
})().catch((err) => {
  console.error(err);
  throw err;
});
