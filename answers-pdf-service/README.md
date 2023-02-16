# answers-pdf-service

## Usage

```
yarn build
FORMSORT_API_KEY={{your api key}} yarn serve
```

## TODO

9. Show what was chosen out from the choices
10. See if descriptions can be used
11. Verify formsort request signature
12. GCS upload
13. See if you can have a long-lived browser instance that's shared (does this help?)
14. One group per page mode

# Notes

Puppeteer is pinned to v18 due to [this issue](https://stackoverflow.com/questions/74385208/puppeteer-error-on-heroku-could-not-find-chromium)
