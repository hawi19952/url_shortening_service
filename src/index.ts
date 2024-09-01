import express, { Request, Response } from 'express';
import bp from 'body-parser'
import { db, up } from './schema.js';
import { Count, Url } from './query.js';
const { json, urlencoded } = bp;

const {
  PORT,
  NODE_ENV
} = process.env;

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`App is running ${NODE_ENV} in port ${PORT}`)
})


app.get('/shorten/:shortCode', async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;
    if (!shortCode) {
      return res.redirect('https://delante.co/wp-content/uploads/2021/01/home-page-definition.png')
    }
    const foundUrl = await Url.findUrl(shortCode);
    if (!foundUrl) {
      throw new Error(`Short URL ${shortCode} doesn't exists`)
    }
    await Count.addCount(shortCode);
    return res.redirect(foundUrl.url);
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: `Some Error Happend, check the logs`
    })
  }
})

app.get('/shorten/:shortCode/stats', async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;
    if(!shortCode) {
      throw new Error("short code is not provided, please provide it in the url");
    }
    let foundShortCode = await Url.findUrl(shortCode) as any; 
    if(!foundShortCode) {
      return res.status(404).send({
        message: `Short-Code ${shortCode} does not exist in the system`
      })
    }
    const urlCount = await Count.getCount(shortCode)
    foundShortCode.access_count = urlCount;
    return res.status(200).send(JSON.stringify(foundShortCode))
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: `Some Error Happend, check the logs`
    })
  }
})

app.post('/shorten', async (req: Request, res: Response) => {
  try {
    const bodyUrl = req.body.url;
    if (!bodyUrl) {
      return res.status(400).send({
        message: "Please, send the param url in the body for the link you wanna shorten"
      })
    }
    const inserted = await Url.createUrl(bodyUrl);

    return res.status(201).send(JSON.stringify(inserted))
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: `Some Error Happend, check the logs`
    })
  }
})

app.put('/shorten/:shortCode', async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    const { shortCode } = req.params;

    if (!shortCode) {
      throw new Error(`you didn't send the short-code in the url`)
    }
    if (!url) {
      throw new Error(`you didn't send the new url in the body`)
    }

    const updated = await Url.updateUrl(shortCode, url);
    return res.status(200).send(JSON.stringify(updated));
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      message: `Some Error Happend, check the logs`,
      error
    })
  }
})

app.delete('/shorten/:shortCode', async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params; 
    if(!shortCode) {
      return res.status(404).send({
        message: `No short URL exists to be deleted`
      })
    }
    await Url.deleteUrl(shortCode);
    return res.status(204);
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: `Some Error Happend, check the logs`
    })
  }
})