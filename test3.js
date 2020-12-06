const fs = require('fs').promises;
const puppeteer = require('puppeteer')


async function test3() {

    let browser = await puppeteer.launch({ headless: false })
    let page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0)
    await page.setViewport({ width: 1920, height: 1200, deviceScaleFactor: 1, }) // greater monitor

    await page.goto('https://www.magazineluiza.com.br/', { waitUntil: 'networkidle0' })

    let url = await page.evaluate('document.querySelector("#__next > div:nth-child(2) > div > div.wrapper-main > div > div.wrapper-header > header > div > div:nth-child(1) > div > div > div.container-right-top-header > ul > li:nth-child(2) > a").href')

    await page.goto(url)


}

test3()

