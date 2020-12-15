const fs = require('fs').promises;
const puppeteer = require('puppeteer')
const credentials = require('./configs/credentials.json')
const cookies = require('./configs/cookies.json')
const cvsFolder = 'C:/Users/Jonathan Casagrande/Downloads/cvs/toBeUploaded'
const candidates = require('./configs/candidates.js')

let numeroDaScreenshot = 1

let positionNumber = '990'
let cvType = 'angular'

async function checkHistoric() {

	// launch application
	let browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] })
	let page = await browser.newPage()


	/*    function-calls to be done    */

	await standardConfigurations()

	await login()

	/*   End of the calls   */

	/*   below is the base script   */









	async function standardConfigurations() {

		await page.setDefaultNavigationTimeout(0)
		const context = browser.defaultBrowserContext()
		context.overridePermissions("https://recruit.zoho.com/recruit/org4314466/ImportParser.do?module=Candidates&type=importfromdocument", ["geolocation", "notifications"]) // An array of permissions
		await page.setViewport({ width: 1920, height: 1070, deviceScaleFactor: 1, }) // greater monitor
		// await page.setViewport({ width: 1270, height: 768, deviceScaleFactor: 1, }); // notebook screen
	}

	async function login() {

		if (Object.keys(cookies).length) { loginWithCookies() } else { loginWithoutCookies() }

	}

	async function loginWithCookies() {

		const cookiesString = await fs.readFile('.configs/cookies.json');
		const cookies = JSON.parse(cookiesString);
		await page.setCookie(...cookies);
		await page.goto(`https://recruit.zoho.com/recruit/org4314466/ImportParser.do?module=Candidates&type=importfromdocument`, { waitUntil: 'networkidle0' })

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
		await page.waitForNavigation({ waitUntil: 'networkidle0' })

	}

	async function storeCookies() {

		await console.log(page.cookies())
		const cookies = await page.cookies()
		await fs.writeFile('./configs/cookies.json', JSON.stringify(cookies, null, 2))

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

	

	async function uploadCV() {

		fs.readdirSync(cvsFolder).forEach(file => {
			if (file.match(cvType)) {console.log(file)}
		})

		for (let i = 0; i < array.length; i++) {
			const element = array[i];

		}

		await page.waitForSelector('input[type=file]', { timeout: 0 })

		const inputUploadHandle = await page.$('input[type=file]', { timeout: 0 })

		let fileToUpload = 'C:/Users/Jonathan Casagrande/Downloads/angular.pdf'

		await inputUploadHandle.uploadFile(fileToUpload)

		await waitThreeSeconds()
		await waitThreeSeconds()

		await page.waitForSelector('#importsecondaryItem > p.newSubTitle.pT35.pB0.ns-advanced > a', { timeout: 0 })
		await page.click('#importsecondaryItem > p.newSubTitle.pT35.pB0.ns-advanced > a')

		await waitTwoSeconds()

		await page.click('#Crm_Import_Leads_POTENTIALID')

		await waitOneSecond()

		await page.waitForSelector('#entityLookupdiv > form > div.cvpadding.bB0 > table > tbody > tr > td:nth-child(2) > div > input', positionNumber)
		await page.type('#entityLookupdiv > form > div.cvpadding.bB0 > table > tbody > tr > td:nth-child(2) > div > input', positionNumber)

		await page.keyboard.press("Enter")

		await waitThreeSeconds()

		await page.waitForSelector('#entityLookupdiv > form > div.w100p > table > tbody > tr:nth-child(2) > td > div > div.popup-model-content.pB20 > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td:nth-child(1) > label > span', { timeout: 0 })
		await page.click('#entityLookupdiv > form > div.w100p > table > tbody > tr:nth-child(2) > td > div > div.popup-model-content.pB20 > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td:nth-child(1) > label > span')

		await waitOneSecond()

		await page.click('#resume_parser_import_id')

		await page.waitForSelector('#Crm_Leads_FIRSTNAME_label', { timeout: 0 })

		await page.screenshot({ path: './prints/verifyName' + `${numeroDaScreenshot}.png` }, { delay: 2000 })
		await numeroDaScreenshot++

		await page.select('select#Crm_Leads_LEADSOURCE', 'LinkedIn')

		await page.select('select#Crm_Leads_LEADCF13', 'BRL')
		await page.click('#Crm_Leads_COUNTRY')
		await page.keyboard.press('Backspace')

		await page.type('#Crm_Leads_COUNTRY', 'Brazil')

		await page.keyboard.press("Tab")
		await page.keyboard.press("Enter")
		await waitTwoSeconds()
		await page.type('select#Crm_Leads_LEADCF6', `${jobFit}`)
		await page.keyboard.press("Tab")
		await page.keyboard.press("Enter")
		await waitTwoSeconds()
		await page.type('select#Crm_Leads_LEADCF7', `${jobFit}`)
		await page.click('#Crm_Leads_LEADCF81')
		await page.click('#calHeader > tbody > tr:nth-child(3) > td.sel') // change the element weekly?
		await page.select('select#Crm_Leads_LEADCF1', 'MD')
		await page.select('select#Crm_Leads_STATUS', 'sent email')

		await page.screenshot(`./prints/${numeroDaScreenshot}`, '#secContent_Basic_Info > div.contInfoTab.floatL.singleColLayout.Leads', { delay: 2000 })
		await numeroDaScreenshot++

		// await page.click('#saveLeadsBtn')
	}

}

checkHistoric()