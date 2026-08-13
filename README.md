# Serper Search Worker

A Cloudflare Worker that proxies search requests to [Serper.dev](https://serper.dev) (Google Search API).  
Supports both web and image search.

## Features

- 🔍 Web search (default)  
- 🖼️ Image search (via `?type=images`)  
- JSON response with title, snippet, URL, and optional metadata  
- Lightweight and fast (serverless)

## Deployment

1. Create a Cloudflare Worker.
2. Copy the code from `worker.js` into the Cloudflare dashboard or use Wrangler.
3. Set the required environment variable (see below).

## Environment Variables (Cloudflare)

| Variable         | Description                               |
|------------------|-------------------------------------------|
| `SERPER_API_KEY` | Your Serper.dev API key (get from serper.dev) |

### How to set in Cloudflare

- Go to your Worker → **Settings** → **Variables**
- Add a new **Environment Variable** named `SERPER_API_KEY` with your key value.
- You can mark it as **Secret** for security.

## Usage

### Web search (default)
https://your-worker.workers.dev/?q=Yourtext


### Image search
https://your-worker.workers.dev/?q=Yourtext&type=images


## Response Example (Image Search)

```json
{
  "query": "cat",
  "type": "images",
  "totalResults": 1200000,
  "results": [
    {
      "title": "Cute cat",
      "imageUrl": "https://...",
      "sourceUrl": "https://...",
      "width": 800,
      "height": 600,
      "snippet": "A beautiful cat photo"
    }
  ]
}
```


## 🧪 Test It Yourself

After deploying your Worker, you can test it using the following endpoints:

### Web Search
https://searchweb.webserviceamir.workers.dev/?q=YOUR_QUERY


### Image Search
https://searchweb.webserviceamir.workers.dev/?q=YOUR_QUERY&type=images


### Using cURL
```bash
# Web search
curl "https://searchweb.webserviceamir.workers.dev/?q=YOUR_QUERY"

# Image search
curl "https://searchweb.webserviceamir.workers.dev/?q=YOUR_QUERY&type=images"
```


## 📋 Requirements

To run this Worker successfully, you'll need:

- A **Cloudflare account** (the free tier of Workers is fully sufficient for this project).
- A **Serper.dev API key** – you can get one for free at [serper.dev](https://serper.dev).  
  *(The free tier includes **2,500 searches per month**, which is great for personal projects and testing.)*
- (Optional) Basic familiarity with Cloudflare Workers dashboard or **Wrangler CLI** if you prefer deploying via the command line.

## 📄 License

This project is distributed under the **MIT License**.  
That means you are free to use, modify, distribute, and even incorporate it into commercial projects, as long as you retain the original copyright notice. See the `LICENSE` file for full details.

## 🤝 Contributing

Contributions, bug reports, and feature suggestions are always welcome!  
Feel free to open an **Issue** or submit a **Pull Request** to help improve this project.

## 👤 Author

**Amir Cia**  
[![Telegram](https://img.shields.io/badge/Telegram-@Ciahshi-26A5E4?style=flat-square&logo=telegram&logoColor=white)](https://t.me/Ciahshi)

Have questions or ideas? I'd love to hear from you!  
Open an issue or ping me on Telegram.
