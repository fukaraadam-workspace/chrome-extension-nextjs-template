import { writeFile, readFile } from 'fs/promises';
import toIco from 'to-ico';
import { createCanvas, loadImage } from 'canvas';

const sourceIcon = './src/icon-generator/icon.png';

const uiIconDirectory = '../app-ui/public';

const extensionIconDirectory = '../extension-specific/public/assets';
const extensionSizes = [16, 48, 128];
const extensionIconType = 'image/png' as const;

async function resizeImageToFile(
  sourceData: Buffer,
  destination: string,
  targetWidth: number,
  targetHeight: number,
) {
  const canvas = createCanvas(targetWidth, targetHeight);
  const ctx = canvas.getContext('2d');

  const sourceImage = await loadImage(sourceData);
  // params: image, position.x, position.y, size.width, size.height
  ctx.drawImage(sourceImage, 0, 0, targetWidth, targetHeight);
  const resizedData = canvas.toBuffer(extensionIconType);

  // Save resized image to a file
  await writeFile(destination, resizedData);
}

async function generateIcoToFile(sourceData: Buffer, destination: string) {
  const icoData = await toIco(sourceData, {
    resize: true,
    sizes: [32],
  });

  // Save favicon to a file
  await writeFile(destination, icoData);
}

// Self-invocation async function
(async () => {
  const sourceData = await readFile(sourceIcon);
  let generatedJobs: Promise<void>[] = [];
  // Icons for extension
  for (const size of extensionSizes) {
    generatedJobs.push(
      resizeImageToFile(
        sourceData,
        `${extensionIconDirectory}/icon${size}.png`,
        size,
        size,
      ),
    );
  }
  // Icons for UI
  generatedJobs.push(
    generateIcoToFile(sourceData, `${uiIconDirectory}/favicon.ico`),
  );

  await Promise.all(generatedJobs);
  console.log('Icon generation completed');
})().catch((err) => {
  console.error(err);
  throw err;
});
