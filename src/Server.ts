import {join} from "path";
import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/ajv";
import {config} from "./config/index";
import * as rest from "./controllers/rest/index";
import { diskStorage } from "multer";


function generateName(length: number) {
  let str = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    str += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return str;
}

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  componentsScan: false,
  mount: {
    "/rest": [
      ...Object.values(rest)
    ]
  },
  middlewares: [
    "cors",
    "cookie-parser",
    "compression",
    "method-override",
    "json-parser",
    { use: "urlencoded-parser", options: { extended: true }}
  ],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs"
    }
  },
  exclude: [
    "**/*.spec.ts"
  ],
  statics: {
    "/static": [
      {
        root: `./public`,
        // Optional
        hook: "$beforeRoutesInit" // Load statics on the expected hook. Default: $afterRoutesInit
        // ... statics options
      }
    ]
  },
  multer: {
    storage: diskStorage({
      destination: join(process.cwd(), "./public/uploads"),
      filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${generateName(15)}-${Date.now()}.${ext}`);
      }
    })
  },
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;
}
