const fs = require('fs').promises;
const puppeteer = require('puppeteer')
const credentials = require('./configs/credentials.json')
const cookies = require('./configs/cookies.json')
const candidates = require('./configs/candidates.js')
const positionInfos = require('./configs/positionInfos.json')

// essa function da pra por em outro doc e chamar
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
const waitCustomMethod = async () => {
    await sleep(1000)
    await sleep(1000)
    await sleep(1000)
}


async function uploadCVs() {

    let browser = await puppeteer.launch({ headless: false })
    let page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 1300, height: 600, deviceScaleFactor: 1, }) // monitor esquerdo
    // await page.setViewport({ width: 1980, height: 1080, deviceScaleFactor: 1, }) // monitor central

    const context = browser.defaultBrowserContext();
    context.overridePermissions("https://recruit.zoho.com/recruit/org4314466/ImportParser.do?module=Candidates&type=importfromdocument", ["geolocation", "notifications"]); // An array of permissions

    if (Object.keys(cookies).length) {

        const cookiesString = await fs.readFile('./configs/cookies.json');
        const cookies = JSON.parse(cookiesString);
        await page.setCookie(...cookies);
        await page.goto(`https://recruit.zoho.com/recruit/org4314466/ImportParser.do?module=Candidates&type=importfromdocument`, { waitUntil: 'networkidle0' })

    } else {

        await page.goto('https://recruit.zoho.com/recruit/org4314466/ImportParser.do?module=Candidates&type=importfromdocument', { waitUntil: 'networkidle0' })

        // LOGIN PART
        // 1 insert login info
        await page.type('#login_id', credentials.email, { delay: 30 })

        // 2 Click next  Button
        await page.click('#nextbtn')

        // 3 insert password info
        await page.type('#password', credentials.password, { delay: 30 })

        // 4 Click login  Button
        await page.click('#nextbtn')

        // 5 Wait For Navigation To Finish
        await page.waitForNavigation({ waitUntil: 'networkidle0' })

        // store cookies
        await console.log(page.cookies())
        await console.log(page.cookies)
        const cookies = await page.cookies();
        await fs.writeFile('./configs/cookies.json', JSON.stringify(cookies, null, 2));
    }

    // wait for file upload
    await page.waitForSelector('#econid_1', { timeout: 0 })

    // advanced options
    await page.click('#importsecondaryItem > p.newSubTitle.pT35.pB0.ns-advanced > a', { delay: 2000 })


    // associate job opening

    // await page.click('#Crm_Import_Leads_POTENTIALID')
    // await page.waitForSelector('#entityLookupdiv > form > div.cvpadding.bB0 > table > tbody > tr > td:nth-child(2) > div > input', { timeout: 0 })
    // await waitCustomMethod()
    // await page.type('#entityLookupdiv > form > div.cvpadding.bB0 > table > tbody > tr > td:nth-child(2) > div > input', `${positionInfos.positionNumber}`, { delay: 1000 })
    // await page.type('#entityLookupdiv > form > div.cvpadding.bB0 > table > tbody > tr > td:nth-child(2) > div > input', String.fromCharCode(13), { delay: 1000 }) // press enter
    // await page.click('#entityLookupdiv > form > div.w100p > table > tbody > tr:nth-child(2) > td > div > div.popup-model-content.pB20 > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td:nth-child(1) > label > span')


    // Source
    await page.waitForSelector('#sourceDD > span > span.selection > span')
    await page.select('#sourceDD > span > span.selection > span', "Linkedin", {delay:1000})

    // maybe the command above is wrong.
    // try another selector on the page
    // 





    /*
    "positionNumber": "",
    "country": "",
    "dateOfApplying": "",
    "jobFit1": "",
    "status": ""
    */

}
uploadCVs()