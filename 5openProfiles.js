
const fs = require('fs').promises;
const puppeteer = require('puppeteer')
const credentials = require('./configs/credentials.json')
const cookies = require('./configs/cookies.json')
const listOfCVsToUpload = require('./configs/3CVsToUpload.js')
const uploadPage = 'https://recruit.zoho.com/recruit/org4314466/ImportParser.do?module=Candidates&type=importfromdocument'
let numeroDaScreenshot = 1


async function uploadCVs() {

	/*===== necessary configs to launch the application =====*/

	let browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] })
	let page = await browser.newPage()

	/*========== adjust desired screen size ==========*/
	/*========== 💻💻💻 ==========*/

	await greaterMonitorView()
	// await mediumMonitorView()
	// await notebookSizeView()


	/*========== function-calls to be done ==========*/

	await standardConfigurations()

	await login()

	/*========== End of the calls ==========*/

	/*========== below is the base script ==========*/





	/*========== operative functions ==========*/

	async function login() {

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
    
    // async function openNewTab() {
	//     https://recruit.zoho.com/recruit/org4314466/ImportParser.do?module=Candidates&type=importfromdocument
	
	//     dont know what this block is for. 😐

    //     click #sSearch

    //     type gsearchTextBox

    //     waitOneSecond

    //     screenshot document.querySelector("#smpSuggestionBlock")

    //     click li[data-cid="detailView"]')[0]

    //     waitThreeSeconds

    //     screenshot

    //     click document.querySelector("#newleft_Activities > a")

    //     screenshot

    // }


	/*========== standard utility functions ==========*/

	async function standardConfigurations() {

		startTimeMarker = Date.now()
		await page.setDefaultNavigationTimeout(0)
		const context = browser.defaultBrowserContext()
		context.overridePermissions("https://recruit.zoho.com/recruit/org4314466/ImportParser.do?module=Candidates&type=importfromdocument", ["geolocation", "notifications"]) // An array of permissions

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

		await console.log(page.cookies)
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

	async function dismissPopupTabs() {
		try { // dismiss the reminders

			await page.evaluate('document.querySelector("span[class=`fR remainderminimize`]").click()')
			await page.evaluate('document.querySelector("span[class=`wms_minimizeicon wms_menu_minimize`]".click())')

		} catch (err) { console.log("no reminder popup" + '\n') }

		try { // dismiss the chat

			await page.evaluate('document.querySelector("span[class=`wms_minimizeicon wms_menu_minimize`]".click())')

		} catch (err) { console.log("no chat popup" + '\n') }
	}

	async function greaterMonitorView() {
		await page.setViewport({ width: 1880, height: 920, deviceScaleFactor: 1, })

	}

	async function mediumMonitorView() {
		await page.setViewport({ width: 1300, height: 650, deviceScaleFactor: 1, })

	}

	async function notebookSizeView() {
		await page.setViewport({ width: 1240, height: 650, deviceScaleFactor: 1, })

	}

	async function close() {
		const endingTimeMarker = Date.now()
		await console.log('executed in', Math.ceil(((endingTimeMarker - startTimeMarker) / 1000) / 60) + ' minutes');

		await browser.close()
	}





}

uploadCVs()