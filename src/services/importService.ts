import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import { createGunzip } from "zlib";
import * as readline from "readline";
import { ProductService } from "../services/productService";
import * as Sentry from "@sentry/node";
import { ImportHistoryService } from "./importHistoryService";

const productService = new ProductService();
const MAX_PRODUCTS = 100;
const INDEX_URL = "https://challenges.coode.sh/food/data/json/index.txt";
const FILE_URL = "https://challenges.coode.sh/food/data/json/";
const TEMP_DIR = path.join(__dirname, "../../temp");
const SENTRY_DSN = "https://d1a847e9dd10c1ee174ec641e0f78105@o4504663060578304.ingest.us.sentry.io/4507919120465920";

const importHistoryService = new ImportHistoryService();

Sentry.init({
  dsn: SENTRY_DSN  
});

const downloadFile = async (url: string, dest: string): Promise<void> => {
  const response = await axios.get<Buffer>(url, {
    responseType: "arraybuffer",
  });
  fs.writeFileSync(dest, response.data);
};

const decompressFile = (source: string, destination: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(source);
    const unzipStream = createGunzip();
    const writeStream = fs.createWriteStream(destination);

    fileStream.pipe(unzipStream).pipe(writeStream);

    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
};

const saveProductsToDatabase = async (
  inputPath: string,
  maxCount: number
): Promise<void> => {
  let count = 0;
  const inputStream = fs.createReadStream(inputPath);

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (count >= maxCount) break;

    try {
      const json = JSON.parse(line);
      const filteredProduct = {
        code: json.code.replace(/\"/g, ""),
        status: "published",
        imported_t: Date.now().toString(),
        url: json.url,
        creator: json.creator,
        created_t: json.created_t,
        last_modified_t: json.last_modified_t,
        product_name: json.product_name,
        quantity: json.quantity,
        brands: json.brands,
        categories: json.categories,
        labels: json.labels,
        cities: json.cities,
        purchase_places: json.purchase_places,
        stores: json.stores,
        ingredients_text: json.ingredients_text,
        traces: json.traces,
        serving_size: json.serving_size,
        serving_quantity: json.serving_quantity,
        nutriscore_score: json.nutriscore_score,
        nutriscore_grade: json.nutriscore_grade,
        main_category: json.main_category,
        image_url: json.image_url,
      };

      count++;
      await productService.createProduct(filteredProduct);
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  rl.close();
};

const importData = async () => {
  try {
    const indexUrl = INDEX_URL;
    const indexResponse = await axios.get<string>(indexUrl);
    const files = indexResponse.data.split("\n").filter(Boolean);

    if (files.length === 0) {
      throw new Error("Nenhum arquivo encontrado no índice");
    }

    for (const file of files) {
      const fileUrl = `${FILE_URL}${file}`;
      const downloadDir = path.join(TEMP_DIR);
      ensureDirExists(downloadDir);
      const filePath = path.join(downloadDir, path.basename(file));
      const unzippedFilePath = filePath.replace(".gz", "");

      await downloadFile(fileUrl, filePath);
      await decompressFile(filePath, unzippedFilePath);
      await saveProductsToDatabase(unzippedFilePath, MAX_PRODUCTS);
      await importHistoryService.createImportHistory(new Date(), file, MAX_PRODUCTS, "success");
      Sentry.captureMessage("Importação de dados realizada com sucesso");

      fs.unlinkSync(filePath);
      fs.unlinkSync(unzippedFilePath);
    }
  } catch (error) {
    await importHistoryService.createImportHistory(new Date(), "failure", 0, error.message);
    console.error("Erro durante a importação de dados:", error);
    Sentry.captureException(error);
  }
};

const ensureDirExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

export default importData;
