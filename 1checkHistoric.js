const fs = require('fs').promises;
const puppeteer = require('puppeteer')
const credentials = require('./configs/credentials.json')
const cookies = require('./configs/cookies.json')
const candidates = require('./configs/1checkHistoricConfigs.js')

// site for keyboard keys 
// https://github.com/puppeteer/puppeteer/blob/main/src/common/USKeyboardLayout.ts

let numeroDaScreenshot = 1

async function checkHistoric() {

	// launch application
	let browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] })
	let page = await browser.newPage()


	/*    function-calls to be done    */

	await standardConfigurations()

	await login()

	await lookCandidates()

	await browser.close()


	/*   End of the calls   */

	/*   below is the base script   */









	async function standardConfigurations() {

		await page.setDefaultNavigationTimeout(0)
		const context = browser.defaultBrowserContext()
		context.overridePermissions("https://recruit.zoho.com/recruit/org4314466/ImportParser.do?module=Candidates&type=importfromdocument", ["geolocation", "notifications"]) // An array of permissions
		// await page.setViewport({ width: 1920, height: 1200, deviceScaleFactor: 1, }) // greater monitor
		await page.setViewport({ width: 1270, height: 768, deviceScaleFactor: 1, }); // notebook screen
	}

	async function login() {

		if (Object.keys(cookies).length) { loginWithCookies() } else { loginWithoutCookies() }

		let landingPage = 'https://recruit.zoho.com/recruit/org4314466/ImportParser.do?module=Candidates&type=importfromdocument'

		await page.goto(landingPage, {waitUntil : 'networkidle2' }).catch(e => void 0)

	}

	async function loginWithCookies() {

		const cookiesString = await fs.readFile('./configs/cookies.json');
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
		await console.log(page.cookies)
		const cookies = await page.cookies();
		await fs.writeFile('./configs/cookies.json', JSON.stringify(cookies, null, 2));

	}
	
	async function lookCandidates() {
		for (let i = 0; i < candidates.length; i++) {
			let loopedName = candidates[i]

			await waitThreeSeconds()

			await page.waitForSelector("#qIconDiv > table > tbody > tr > td:nth-child(2)")
			await page.click("#qIconDiv > table > tbody > tr > td:nth-child(2)")

			await page.type('#gsearchTextBox', loopedName, { delay: 30 })

			await waitThreeSeconds()
			await waitTwoSeconds()

			let checkIfPossibleMatches = await page.evaluate(`document.querySelectorAll('strong')[0].innerText`)

			if (checkIfPossibleMatches) {

				await page.screenshot({ path: `./prints/${numeroDaScreenshot}a.png`}, { delay: 4000 })
				await numeroDaScreenshot++

				match1 = await page.evaluate(`document.querySelectorAll('a[class="ss-view-profile"]')[0].href`)
				await fs.appendFile('./results/linksToCheck', `possible matches for ${numeroDaScreenshot}` + '\n')
				await fs.appendFile('./results/linksToCheck',  `${match1}` + '\n')
				
				try {
					
					match2 = await page.evaluate(`document.querySelectorAll('a[class="ss-view-profile"]')[1].href`)
					await fs.appendFile('./results/linksToCheck',  `${match2}` + '\n')

				} catch (error) { 1 + 1 }

				try {
					
					match3 = await page.evaluate(`document.querySelectorAll('a[class="ss-view-profile"]')[2].href`)
					await fs.appendFile('./results/linksToCheck',  `${match3}` + '\n')
					
				} catch (error) { 1 + 1 }

				await fs.appendFile('./results/linksToCheck',  '\n\n\n')


			}

			await page.click('#gsearchTextBox')
			await page.click('#gsearchTextBox')
			await page.click('#gsearchTextBox')
			await backspaceALot()

			// await ifHasHistoric()

			// await page.waitForSelector('#closenewsearchbar')
			// await page.click('#closenewsearchbar')

			// 🔽 documentation below 🔽

			async function backspaceALot() {

				for (let backSpaceloopCounter = 0; backSpaceloopCounter < 50; backSpaceloopCounter++) {
					
					await page.keyboard.press('Backspace')
					
				}


			}

		}


	}

	async function ifHasHistoric() {

		let matchedName = await page.evaluate('document.querySelector("#search_Leads").children[0].children[1].children[0].children[0].innerText')

		let candidatePageLink = await page.evaluate('document.querySelector("#search_Leads").children[0].children[2].href')

		if (matchedName) {
			// faced a javascript-code-structure problem
			// i can't refer LOOPEDNAME from the previous FOR loop.

			await page.goto(candidatePageLink, { waitUntil: 'networkidle0' })

			await page.screenshot({ path: `./prints/${numeroDaScreenshot}.png` }, { delay: 4000 })
			await numeroDaScreenshot++

			await page.click('#newleft_Notes')

			await page.screenshot({ path: `./prints/${numeroDaScreenshot}.png` }, { delay: 4000 })
			await numeroDaScreenshot++

			await page.click('#newleft_Activities')

			await waitThreeSeconds()

			await page.screenshot({ path: `./prints/${numeroDaScreenshot}.png` }, { delay: 4000 })
			await numeroDaScreenshot++

			await page.goto(`https://recruit.zoho.com/recruit/org4314466/ImportParser.do?module=Candidates&type=importfromdocument`, { waitUntil: 'networkidle0' })

		}
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

checkHistoric()