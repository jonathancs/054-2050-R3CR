const fs = require('fs').promises;
const puppeteer = require('puppeteer')
const credentials = require('./generalConfigs/credentials.json')
const cookies = require('./generalConfigs/cookies.json')
const candidates = require('./1backBone/namesToBeChecked.js')


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

	async function lookCandidates() {
		for (let i = 0; i < candidates.length; i++) {
			let loopedName = candidates[i]

			await waitThreeSeconds()

			await page.waitForSelector("#qIconDiv > table > tbody > tr > td:nth-child(2)")
			await page.click("#qIconDiv > table > tbody > tr > td:nth-child(2)")

			await page.type('#gsearchTextBox', loopedName, { delay: 30 })

			await waitThreeSeconds()
			await waitTwoSeconds()

			try {

				result0 = await page.evaluate(`document.querySelectorAll('strong')[0].innerText`)
				result1 = await page.evaluate(`document.querySelectorAll('strong')[1].innerText`)
				result2 = await page.evaluate(`document.querySelectorAll('strong')[2].innerText`)
				result3 = await page.evaluate(`document.querySelectorAll('strong')[3].innerText`)
				result4 = await page.evaluate(`document.querySelectorAll('strong')[4].innerText`)
				result5 = await page.evaluate(`document.querySelectorAll('strong')[5].innerText`)
				result6 = await page.evaluate(`document.querySelectorAll('strong')[6].innerText`)
				result7 = await page.evaluate(`document.querySelectorAll('strong')[7].innerText`)
				
			} catch (error) { 1 + 1 }


			if (result0.match(loopedName)) {

				await page.screenshot({ path: `./1backBone/prints/${numeroDaScreenshot}a.png`}, { delay: 4000 })
				await numeroDaScreenshot++

				match0 = await page.evaluate(`document.querySelectorAll('a[class="ss-view-profile"]')[0].href`)
				await fs.appendFile('./1backBone/results', `possible matches for ${loopedName}` + ' ' + `${numeroDaScreenshot}` + '\n')
				await fs.appendFile('./1backBone/results',  `${match0}` + '\n\n')

			}

			if (result1.match(loopedName)) {

				await page.screenshot({ path: `./1backBone/prints/${numeroDaScreenshot}a.png`}, { delay: 4111 })
				await numeroDaScreenshot++

				match1 = await page.evaluate(`document.querySelectorAll('a[class="ss-view-profile"]')[1].href`)
				await fs.appendFile('./1backBone/results', `possible matches for ${loopedName}` + ' ' + `${numeroDaScreenshot}` + '\n')
				await fs.appendFile('./1backBone/results',  `${match1}` + '\n\n')

			}

			if (result2.match(loopedName)) {

				await page.screenshot({ path: `./1backBone/prints/${numeroDaScreenshot}a.png`}, { delay: 4111 })
				await numeroDaScreenshot++

				match2 = await page.evaluate(`document.querySelectorAll('a[class="ss-view-profile"]')[2].href`)
				await fs.appendFile('./1backBone/results', `possible matches for ${loopedName}` + ' ' + `${numeroDaScreenshot}` + '\n')
				await fs.appendFile('./1backBone/results',  `${match2}` + '\n\n')

			}

			if (result3.match(loopedName)) {

				await page.screenshot({ path: `./1backBone/prints/${numeroDaScreenshot}a.png`}, { delay: 4111 })
				await numeroDaScreenshot++

				match3 = await page.evaluate(`document.querySelectorAll('a[class="ss-view-profile"]')[3].href`)
				await fs.appendFile('./1backBone/results', `possible matches for ${loopedName}` + ' ' + `${numeroDaScreenshot}` + '\n')
				await fs.appendFile('./1backBone/results',  `${match3}` + '\n\n')

			}

			if (result4.match(loopedName)) {

				await page.screenshot({ path: `./1backBone/prints/${numeroDaScreenshot}a.png`}, { delay: 4111 })
				await numeroDaScreenshot++

				match4 = await page.evaluate(`document.querySelectorAll('a[class="ss-view-profile"]')[4].href`)
				await fs.appendFile('./1backBone/results', `possible matches for ${loopedName}` + ' ' + `${numeroDaScreenshot}` + '\n')
				await fs.appendFile('./1backBone/results',  `${match4}` + '\n\n')

			}

			if (result5.match(loopedName)) {

				await page.screenshot({ path: `./1backBone/prints/${numeroDaScreenshot}a.png`}, { delay: 4111 })
				await numeroDaScreenshot++

				match5 = await page.evaluate(`document.querySelectorAll('a[class="ss-view-profile"]')[5].href`)
				await fs.appendFile('./1backBone/results', `possible matches for ${loopedName}` + ' ' + `${numeroDaScreenshot}` + '\n')
				await fs.appendFile('./1backBone/results',  `${match5}` + '\n\n')

			}

			if (result6.match(loopedName)) {

				await page.screenshot({ path: `./1backBone/prints/${numeroDaScreenshot}a.png`}, { delay: 4111 })
				await numeroDaScreenshot++

				match6 = await page.evaluate(`document.querySelectorAll('a[class="ss-view-profile"]')[6].href`)
				await fs.appendFile('./1backBone/results', `possible matches for ${loopedName}` + ' ' + `${numeroDaScreenshot}` + '\n')
				await fs.appendFile('./1backBone/results',  `${match6}` + '\n\n')

			}

			if (result7.match(loopedName)) {

				await page.screenshot({ path: `./1backBone/prints/${numeroDaScreenshot}a.png`}, { delay: 4111 })
				await numeroDaScreenshot++

				match7 = await page.evaluate(`document.querySelectorAll('a[class="ss-view-profile"]')[7].href`)
				await fs.appendFile('./1backBone/results', `possible matches for ${loopedName}` + ' ' + `${numeroDaScreenshot}` + '\n')
				await fs.appendFile('./1backBone/results',  `${match7}` + '\n\n')

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


	async function loginWithCookies() {

		const cookiesString = await fs.readFile('./generalConfigs/cookies.json');
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