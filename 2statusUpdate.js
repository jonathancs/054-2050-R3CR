const fs = require('fs').promises;
const puppeteer = require('puppeteer')
const credentials = require('./generalConfigs/credentials.json')
const cookies = require('./generalConfigs/cookies.json')
const setup = require('./2backBone/2configs.js')
let numeroDaScreenshot = 1

async function checkHistoric() {

    /*===== necessary configs to launch the application =====*/

    let browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] })
    let page = await browser.newPage()

    /*====== adjust scree size ======*/
    // await greaterMonitorView()
    await mediumMonitorView()
    // await notebookSizeView()


    /*==== function-calls to be done ====*/

    await standardConfigurations()

    await login()

    await updateStatus()

    await close()

    /*==== End of the calls ====*/

    /*==== below is the base script ====*/



    /*==== operative functions ====*/

    async function login() {

        if (Object.keys(cookies).length) { loginWithCookies() } else { loginWithoutCookies() }

        // 🔽 below is the documentation 🔽

        async function loginWithCookies() {
            
            const cookiesString = await fs.readFile('./generalConfigs/cookies.json');
            const cookies = JSON.parse(cookiesString);
            await page.setCookie(...cookies);
            await page.goto('https://recruit.zoho.com/recruit/org4314466/ImportParser.do?module=Candidates&type=importfromdocument', { waitUntil: 'networkidle2' })

        }

        async function loginWithoutCookies() {

            await page.goto('https://recruit.zoho.com/recruit/org4314466/ImportParser.do?module=Candidates&type=importfromdocument', { waitUntil: 'networkidle0' })

            await insertCredentials()

            await storeCookies()

        }

        async function insertCredentials() {



            // 1 insert login info
            await page.type('#login_id', credentials.email, { delay: 30 })

            // 2 Click next  Button
            await page.click('#nextbtn')

            // 3 insert password info
            await page.type('#password', credentials.password, { delay: 30 })

            // 4 Click login  Button
            await page.click('#nextbtn')

            // 5 Wait For Navigation To Finish
            await page.waitForNavigation({ waitUntil: 'networkidle2' })

        }

        async function storeCookies() {

            const cookies = await page.cookies()
            await fs.writeFile('./generalConfigs/cookies.json', JSON.stringify(cookies, null, 2))

        }

    }

    async function updateStatus() {

        for (let i = 0; i < setup.namesListToBeUpdated.length; i++) {
            let loopedName = setup.namesListToBeUpdated[i]

            await page.waitForSelector("#qIconDiv > table > tbody > tr > td:nth-child(2)")
            await page.click("#qIconDiv > table > tbody > tr > td:nth-child(2)")

            await page.type('#gsearchTextBox', loopedName, { delay: 30 })

            await waitThreeSeconds()

            await page.keyboard.press('ArrowDown')

            await waitThreeSeconds()

            await page.screenshot({ path: `./2backBone/prints/${numeroDaScreenshot}.png` })

            numeroDaScreenshot++

            await waitThreeSeconds()

            await page.waitForSelector('#changeStatusQV', { timeout: 0 })
            await page.click('#changeStatusQV')

            await waitThreeSeconds()

            await page.waitForSelector('#status-block')
            await page.click('#status-block')

            await waitThreeSeconds()

            await page.waitForSelector('#change-status-select-sbox', { timeout: 0 })
            await page.click("#change-status-select-sbox")

            await page.waitForSelector('#change-status-select-ssearch', { timeout: 0 })
            await page.click('#change-status-select-ssearch')

            await page.type('#change-status-select-ssearch', setup.statusToBeUpdated, { delay: 100 })
            await waitThreeSeconds()
            await page.keyboard.press('ArrowDown')
            await page.keyboard.press("Enter")

            await page.waitForSelector('#status-block-btn > input.updateBtn.primarybtn', { timeout: 0 })
            await page.click('#status-block-btn > input.updateBtn.primarybtn')

            await page.screenshot({ path: `./2backBone/prints/${numeroDaScreenshot}.png` }, { delay: 2000 })

            numeroDaScreenshot++

            await page.goto('https://recruit.zoho.com/recruit/org4314466/ShowTab.do?module=Candidates', { waitUntil: 'networkidle0' })

        }
    }

    

    /*========== standard utility functions ==========*/

    async function standardConfigurations() {

        await page.setDefaultNavigationTimeout(0)
        const context = browser.defaultBrowserContext()
        context.overridePermissions("https://recruit.zoho.com/recruit/org4314466/ImportParser.do?module=Candidates&type=importfromdocument", ["geolocation", "notifications"]) // An array of permissions

    }
    
    async function waitOneSecond() {

        const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
        const element = async () => {
            await sleep(1000)

        }

        await element()

    }

    async function waitTwoSeconds() {
        await waitOneSecond()
        await waitOneSecond()
    }

    async function waitThreeSeconds() {
        await waitOneSecond()
        await waitOneSecond()
        await waitOneSecond()
    }

    // opens the browser on a big size window
    async function greaterMonitorView() {
        await page.setViewport({ width: 1880, height: 920, deviceScaleFactor: 1, })

    }

    // opens the browser on a medium size window
    async function mediumMonitorView() {
        await page.setViewport({ width: 1300, height: 650, deviceScaleFactor: 1, })

    } 

    // opens the browser on a small size window
    async function notebookSizeView() {
        await page.setViewport({ width: 1240, height: 650, deviceScaleFactor: 1, })

    }

    async function close() {
        await browser.close()
    }

    
}

checkHistoric()