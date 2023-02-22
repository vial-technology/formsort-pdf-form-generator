# Answers PDF Generator

This example uses the [Puppeteer](https://pptr.dev) headless browser to render [Formsort](https://formsort.com) answer webhook payloads into PDF files, that are uploaded to Amazon [S3](https://aws.amazon.com/s3/).

## Usage

First, build the app:

```bash
yarn build
```

Then, run it like:

```
FORMSORT_API_URL=https://api.formsort.com/v1 \
FORMSORT_API_KEY={{FORMSORT_API_KEY}} \
AWS_PROFILE={{YOUR_AWS_PROFILE}} \
AWS_REGION={{YOUR_AWS_BUCKET_REGION}} \
AWS_BUCKET_NAME={{YOUR_AWS_BUCKET_NAME}} \
yarn start
```

At that point, you can POST [Formsort answers webhooks](https://docs.formsort.com/handling-data/integration-reference/webhooks) into `/api/generate-pdf`, and PDFs will be generated.

## Deployment

This app can be run as-is on Heroku, assuming that you have installed the [Heroku Puppeteer Buildpack](https://elements.heroku.com/buildpacks/jontewks/puppeteer-heroku-buildpack).

Deployment on serverless platforms such as Vercel might be possible, but is tricky due to the large size of the Puppeteer binaries. See [this issue](https://github.com/vercel/community/discussions/124) for some hints if you decide to go in that direction.

For performance reasons, you may cache the response from the Formsort variant revisions endpoint, since variant revisions are immutable once they are published.

## Development

Run the app locally with the above environment variables:

```
yarn dev
```

You may then want to use a tool like [ngrok](https://ngrok.com/) to expose your local server on the internet, so that you may send answer webhooks into the app.

## Customization

You will likely want to customize how the PDF itself is rendered, since you may want to have a table-like view or a list view that isn't implemented.

To make development easier, there is a page `/test` that renders the HTML that would be used by the PDF generator so that you can iterate on it.

## Notes

In a production environment, I would recommend separating out the receipt of the webhook from rendering the PDF, using a worker queue. This way, the system wouldn't get backed up if there is a spike in traffic.
