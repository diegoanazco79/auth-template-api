import "dotenv/config";
import express, {Request, Response} from "express";
import cors from "cors";

const PORT = process.env.PORT || 3001
const app = express();
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  return res.send('Express Typescript on Vercel')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));