const fs = require('fs').promises;
const puppeteer = require('puppeteer')
const credentials = require('./configs/credentials.json')
const cookies = require('./configs/cookies.json')
const listOfCVsToUpload = require('./configs/3CVsToUpload.js')
const uploadPage = 'https://recruit.zoho.com/recruit/org4314466/ImportParser.do?module=Candidates&type=importfromdocument'

let numeroDaScreenshot = 1
let positionNumber = '908'
let jobFit = 'HR Recruiter'

/* 
	back-end dev

	QA
	QA automation

	front-end dev

	project manager
	business analyst

	HR Recruiter
*/


async function uploadCVs() {

	let browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] })
	let page = await browser.newPage()
	await page.setViewport({ width: 1920, height: 950, deviceScaleFactor: 1, }) // greater monitor
	// await page.setViewport({ width: 1270, height: 600, deviceScaleFactor: 1, }); // notebook screen



	/*    function-calls to be done    */
	await standardConfigurations()

	await loginWithoutCookies()

	/* 
	
		separate the login option.
		have the mainstream option of with_cookies & without_cookies
			AND
		also the option of logging in automatically, without cookies, 
		let's see how it behaves.

	*/

	await CVs_upload()

	// await browser.close()



	// await browser.close()
	/*   End of the calls   */

	/*   below is the base script   */







	async function CVs_upload() {

		for (let i = 0; i < listOfCVsToUpload.length; i++) {

			let loopedCV = listOfCVsToUpload[i]

			if (await page.url() != uploadPage) { await page.goto(uploadPage, { waitUntil: 'networkidle0' }).catch(e => void 0) }

			/* 
				//backend
				if (loopedCV.match('dot net')) {let jobFit = 'back-end dev'}
				if (loopedCV.match('python')) {let jobFit = 'back-end dev'}
				if (loopedCV.match('java')) {let jobFit = 'back-end dev'}
				
				// QA
				if (loopedCV.match('qa')) {let jobFit = 'QA'}
				if (loopedCV.match('qa aut')) {let jobFit = 'QA automation'}
				
				// front
				if (loopedCV.match('fe')) {let jobFit = 'front-end dev'}
				if (loopedCV.match('angular')) {let jobFit = 'front-end dev'}
				if (loopedCV.match('react')) {let jobFit = 'front-end dev'}
				
				// leading
				if (loopedCV.match('pm')) {let jobFit = 'project manager'}
				if (loopedCV.match('ba')) {let jobFit = 'business analyst'}
	
			*/

			let fileToUpload = loopedCV

			await page.waitForSelector('input[type=file]', { timeout: 0 })

			const inputUploadHandle = await page.$('input[type=file]', { timeout: 0 })

			await inputUploadHandle.uploadFile(fileToUpload)

			await waitThreeSeconds()
			await waitThreeSeconds()

			try { // dismiss the reminders
				await page.evaluate('document.querySelector("#reminderContent").children[0].children[1].children[0].click()')
				await waitOneSecond()
				await page.evaluate('document.querySelector("#reminder_bulkdismiss > label > span").click()')
				await waitOneSecond()
				await page.evaluate('document.querySelector("#reminder_bulkdismiss > input").click()')
				await waitOneSecond()

			} catch (err) { console.log("could'nt press the minimze reminder tab" + '\n\n') }

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

			// second import page
			await page.waitForSelector('#Crm_Leads_FIRSTNAME_label', { timeout: 0 })

			await page.select('select#Crm_Leads_LEADSOURCE', 'LinkedIn')

			await page.select('select#Crm_Leads_LEADCF13', 'BRL')
			await page.click('#Crm_Leads_COUNTRY')
			await waitTwoSeconds()
			await page.type('#Crm_Leads_COUNTRY', 'Brazil')
			await page.keyboard.press('Backspace')
			await page.keyboard.press('Backspace')
			await page.keyboard.press('Backspace')
			await page.keyboard.press('Backspace')
			await page.keyboard.press('Backspace')
			await page.keyboard.press('Backspace')
			await page.keyboard.press('Backspace')
			await page.keyboard.press('Backspace')
			await page.keyboard.press('Backspace')
			await page.keyboard.press('Backspace')
			await page.keyboard.press('Backspace')
			await page.keyboard.press('Backspace')
			await page.keyboard.press('Backspace')
			await page.keyboard.press('Backspace')
			await page.keyboard.press('Backspace')
			await page.keyboard.press('Backspace')
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
			await waitOneSecond()
			await page.evaluate('document.querySelector("#calHeader > tbody > tr:nth-child(2) > td.sel").click()') // change the NTH-CHILD weekly
			await page.select('select#Crm_Leads_LEADCF1', 'MD')
			await page.select('select#Crm_Leads_STATUS', 'sent email')

			await waitThreeSeconds()

			try { await page.click('#saveLeadsBtn') } catch (err) { console.log("could'nt press the IMPORT button" + '\n\n') }

			await waitThreeSeconds()
			await waitThreeSeconds()

			await page.screenshot({ path: `./prints/${numeroDaScreenshot}.png` }, { delay: 2000 })
			await numeroDaScreenshot++

			let currentURL = page.url()

			await fs.appendFile('./results/linkstoCheck', (numeroDaScreenshot - 1) + '\n')
			await fs.appendFile('./results/linkstoCheck', currentURL + '\n\n')

		}

	}

	async function standardConfigurations() {

		await page.setDefaultNavigationTimeout(0)
		const context = browser.defaultBrowserContext()
		context.overridePermissions(uploadPage, ["geolocation", "notifications"]) // An array of permissions

	}

	async function login_with_or_without_cookies() {

		try { } catch (error) { console.log('\n' + error) }

		if (Object.keys(cookies).length) { loginWithCookies() } else { loginWithoutCookies() }

	}

	async function loginWithCookies() {

		const cookiesString = await fs.readFile('./configs/cookies.json');
		const cookies = JSON.parse(cookiesString);
		await page.setCookie(...cookies);
		await page.goto(uploadPage, { waitUntil: 'networkidle0' })

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

}

uploadCVs()