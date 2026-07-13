import express from 'express';
import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.use(express.json());


app.get('/health', (req, res) => {
    res.json({ status: "ok" });
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}`)
})