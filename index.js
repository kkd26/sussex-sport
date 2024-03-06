import { launch } from "puppeteer";
import process from "process";

const bibNumber = process.argv[2];

const url = `https://uksp.photoshelter.com/search?I_DSC=${bibNumber}&I_DSC_AND=t&I_SORT=-DATE&_ACT=search&C_ID=C0000YRO85S9AIRg&utm_source=pic2go.co.uk&utm_medium=P2G-Shared-URL&utm_campaign=Cambridge+Half+Marathon+2024&utm_content=${bibNumber}`;

const browser = await launch();

const page = await browser.newPage();

await page.goto(url, { waitUntil: "networkidle2" });

const titles = await page.evaluate(() => {
  return [...document.querySelectorAll("ul.search_thumbs li img")].map((el) => {
    return {
      id: el.getAttribute("id").replace("img_", ""),
      src: JSON.parse(el.getAttribute("data-gal-img-thumb"))["I_FILE_NAME"],
    };
  });
});

await browser.close();

titles.forEach(({ id, src }) => {
  console.log(
    `https://gallery.sussexsportphotography.com/dnld-hires/${src}?I_ID=${id}&_ACT=dlhr&_EXEC=t&DLTYPE=JPG|1000|e`
  );
});
