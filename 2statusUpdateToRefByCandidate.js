const fs = require('fs').promises;
const puppeteer = require('puppeteer')
const credentials = require('./2statusUpdateToRefByCandidateConfig/credentials.json')
const cookies = require('./2statusUpdateToRefByCandidateConfig/cookies.json')
const refByCandidateList = require('./2statusUpdateToRefByCandidateConfig/refByCandidateList.js')
let numeroDaScreenshot = 1

async function checkHistoric() {

	// log current time console.log()
	let browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] })
	let page = await browser.newPage()



	//// function calls to be done ////

	await miscConfigurations()

	await login()

	await updateStatusToRefByCandidate()

	// await browser.close()


	/*  End of the calls  */

	/*  below is the documentation  */









	async function miscConfigurations() {

		await page.setDefaultNavigationTimeout(0)
		const context = browser.defaultBrowserContext()
		context.overridePermissions("https://recruit.zoho.com/recruit/org4314466/ShowTab.do?module=Candidates", ["geolocation", "notifications"]) // An array of permissions
		await page.setViewport({ width: 1920, height: 1200, deviceScaleFactor: 1, }) // greater monitor
		// await page.setViewport({ width: 1270, height: 768, deviceScaleFactor: 1, }); // medium monitor
		// await page.setViewport({ width: 1270, height: 768, deviceScaleFactor: 1, }); // notebook screen
	}


	async function login() {

		if (Object.keys(cookies).length) { loginWithCookies() } else { loginWithoutCookies() }

	}


	async function loginWithCookies() {

		const cookiesString = await fs.readFile('./2statusUpdateToRefByCandidateConfig/cookies.json');
		const cookies = JSON.parse(cookiesString);
		await page.setCookie(...cookies);
		await page.goto(`https://recruit.zoho.com/recruit/org4314466/ShowTab.do?module=Candidates`, { waitUntil: 'networkidle0', timeout: 0 })

	}


	async function loginWithoutCookies() {

		await page.goto('https://recruit.zoho.com/recruit/org4314466/ShowTab.do?module=Candidates', { waitUntil: 'networkidle0', timeout: 0 })

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
		await console.log(page.cookies)
		const cookies = await page.cookies();
		await fs.writeFile('./2statusUpdateToRefByCandidateConfig/cookies.json', JSON.stringify(cookies, null, 2));

	}


	async function waitOneSecond() {

		const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
		const element = async () => {
			await sleep(1000)

		}

		await element()

	}

	async function waitThreeSeconds() {
		await waitOneSecond()
		await waitOneSecond()
		await waitOneSecond()
	}


	async function updateStatusToRefByCandidate() {
		for (let i = 0; i < refByCandidateList.length; i++) {
			let loopedName = refByCandidateList[i]

			await page.waitForSelector("#qIconDiv > table > tbody > tr > td:nth-child(2)")
			await page.click("#qIconDiv > table > tbody > tr > td:nth-child(2)")

			await page.type('#gsearchTextBox', loopedName, { delay: 30 })

			await waitThreeSeconds()

			await page.keyboard.press('ArrowDown')

			await page.screenshot({ path: `./prints/${numeroDaScreenshot}.png` }, { delay: 4000 })

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

			await page.type('#change-status-select-ssearch', "f by", { delay: 100 })
			await waitThreeSeconds()
			await page.keyboard.press('ArrowDown')
			await page.keyboard.press("Enter")

			await page.waitForSelector('#status-block-btn > input.updateBtn.primarybtn', { timeout: 0 })
			await page.click('#status-block-btn > input.updateBtn.primarybtn')

			await page.screenshot({ path: `./prints/${numeroDaScreenshot}.png` }, { delay: 2000 })

			numeroDaScreenshot++

			await page.goto('https://recruit.zoho.com/recruit/org4314466/ShowTab.do?module=Candidates', { waitUntil: 'networkidle0' })

		}
	}
}

checkHistoric()