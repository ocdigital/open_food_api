import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import { createGunzip } from "zlib";
import * as readline from "readline";
import { ProductService } from "../services/productService";

const productService = new ProductService();
const MAX_PRODUCTS = 100;
const INDEX_URL = "https://challenges.coode.sh/food/data/json/index.txt";
const FILE_URL = "https://challenges.coode.sh/food/data/json/";
const TEMP_DIR = path.join(__dirname, "../../temp");

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
        status: json.status,
        imported_t: json.imported_t,
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
      console.error("Erro ao salvar produto:", err);
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
      console.log(`Arquivo salvo em: ${filePath}`);

      await decompressFile(filePath, unzippedFilePath);
      console.log(`Arquivo descompactado em: ${unzippedFilePath}`);

      await saveProductsToDatabase(unzippedFilePath, MAX_PRODUCTS);
      console.log("Primeiros 100 registros salvos no banco de dados");

      fs.unlinkSync(filePath);
      fs.unlinkSync(unzippedFilePath);
    }
  } catch (error) {
    console.error("Erro durante a importação de dados:", error);
  }
};

const ensureDirExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

export default importData;
