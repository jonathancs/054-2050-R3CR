/* 
TO DO:
try save button, no name written

switch dentro do  await uploadCV_secondPart_prepareInformations()
OU
involve everything with a try, if it fails to locate the ALREADY EXIST MESSAGE name, go for the other.

2statusUpdateToRef

involve everything with a try, if it fails to locate the name, go for the other.

console.log('last prints X')

*/


const fs = require('fs').promises;
const puppeteer = require('puppeteer')
const credentials = require('./configs/credentials.json')
const cookies = require('./configs/cookies.json')
const listOfCVsToUpload = require('./configs/3CVsToUpload.js')
const uploadPage = 'https://recruit.zoho.com/recruit/org4314466/ImportParser.do?module=Candidates&type=importfromdocument'

errorCounter = 0
let numeroDaScreenshot = 1
let positionNumber = '1034'
let jobFit = 'QA automation'

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

	await sequentialCVs_upload()

	await close()

	/*========== End of the calls ==========*/

	/*========== below is the base script ==========*/



	/*========== operative functions ==========*/

	async function login() {

		if (Object.keys(cookies).length) { loginWithCookies() } else { loginWithoutCookies() }

		// 🔽 below is the documentation 🔽

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

	}

	async function sequentialCVs_upload() {

		for (let i = 0; i < listOfCVsToUpload.length; i++) {

			do {

				loopedCV = listOfCVsToUpload[i]

				if (await page.url() != uploadPage) { await page.goto(uploadPage, { waitUntil: 'networkidle0' }).catch(e => void 0) }

				await uploadCV_firstPart_prepareTheFile()
				await uploadCV_secondPart_prepareInformations()

				// 🔽 below the documentation 🔽

				async function uploadCV_firstPart_prepareTheFile() {

					let fileToUpload = loopedCV

					await page.waitForSelector('input[type=file]', { timeout: 0 })

					await waitThreeSeconds()

					const inputUploadHandle = await page.$('input[type=file]', { timeout: 0 })

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

				}

				async function uploadCV_secondPart_prepareInformations() {

					await cvAlreadyExists()

					await fillProfileInformations()


					// 🔽 documentation below 🔽


					async function fillProfileInformations() {

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
						await page.evaluate(`document.querySelector('td[class="sel"]').click()`) // change the NTH-CHILD weekly
						await page.select('select#Crm_Leads_LEADCF1', 'MD')
						await page.select('select#Crm_Leads_STATUS', 'sent email')

						await waitThreeSeconds()

						await page.click('#Crm_Leads_COUNTRY')

						await page.keyboard.press("Tab")
						await page.keyboard.press("Enter")
						await waitTwoSeconds()
						await page.type('select#Crm_Leads_LEADCF6', `${jobFit}`)

						try { await page.click('#saveLeadsBtn') } catch (err) { console.log("could'nt press the IMPORT button" + '\n') }

						await waitThreeSeconds()
						await waitThreeSeconds()

						try {

							let temporaryScreenshotElement = await page.$('#dv_title')

							await temporaryScreenshotElement.screenshot({ path: `./prints/${numeroDaScreenshot}.png` }, { delay: 2000 })
							await numeroDaScreenshot++

							currentURL = page.url()

							await fs.appendFile('./results/linkstoCheck', (numeroDaScreenshot - 1) + '\n')
							await fs.appendFile('./results/linkstoCheck', currentURL + '\n')

						} catch (err) {

							currentURL = page.url()

							await fs.appendFile('./results/linkstoCheck', (numeroDaScreenshot) + '\n')

							await console.log('continuing loop')
							await numeroDaScreenshot++

							return

						}

					}

					async function cvAlreadyExists() {

						profileURL = await page.url()

						await page.waitForSelector('h4[class="marT24 marB8"]', { timeout: 0 })

						if (await page.waitForSelector('div[class="crm-msg-cnt"]', { timeout: 3000 })) { // if 'already exist' message appear

							// close 'record already exists' POPUP
							await page.click('span[class="crm-msg-close"]')

							// screenshot the current infos
							await page.screenshot({ path: `./prints/${numeroDaScreenshot}alreadyExistInfo1.png` }, { delay: 2000 })

							// write the jump
							await fs.appendFile('./results/linksToCheck', '\n' + `${numeroDaScreenshot}` + 'alreadyExistInfo' + '\n' + profileURL)

							break // wasn't enough to stop the application
							// continue
							// return

							// continue;
							// return;

						}

					}

				}

			} while (errorCounter < 0)

		}

	}




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

/*

try {

								firstName = await page.evaluate('document.querySelector("#Crm_Leads_FIRSTNAME").value')
								lastName = await page.evaluate('document.querySelector("#Crm_Leads_LASTNAME").value')

								if (firstName != "" || " ") {

									// search the already existing profile and enter
									await page.click('#sSearch')
									await page.click('#gsearchTextBox')
									await page.type('#gsearchTextBox', firstName + ' ' + lastName)
									await waitThreeSeconds()
									await page.evaluate('document.querySelector("#search_Leads").children[0].click()')

									await waitThreeSeconds()
									await waitThreeSeconds()

									// get informations in the profile
									let profileURL = await page.url()
									await fs.appendFile('./results/linksToCheck', '\n' + `${numeroDaScreenshot}` + 'alreadyExistInfo' + '\n' + profileURL)
									await page.screenshot({ path: `./prints/${numeroDaScreenshot}alreadyExistInfo2.png` }, { delay: 2000 })
									await page.click('#newleft_67512000002497884')
									await waitOneSecond()
									await page.evaluate('div[class="atchName"].children[0].click()')
									await waitThreeSeconds()
									await page.screenshot({ path: `./prints/${numeroDaScreenshot}alreadyExistInfo3.png` }, { delay: 2000 })
									await page.click('a[class="zrc-close-popup"]')

									errorCounter++
									numeroDaScreenshot++

								}

							} catch (error) {

								await fs.appendFile('./results/linksToCheck', '\n\n' + `${numeroDaScreenshot} + ' already existed' + '\n'`)

								errorCounter++
								numeroDaScreenshot++

							}







							(node:21404) UnhandledPromiseRejectionWarning: ReferenceError: profileURL is not defined
	at cvAlreadyExists (D:\repo\054-2050-R3CR\3uploadCVs.js:258:115)
	at async uploadCV_secondPart_prepareInformations (D:\repo\054-2050-R3CR\3uploadCVs.js:152:6)
	at async sequentialCVs_upload (D:\repo\054-2050-R3CR\3uploadCVs.js:106:5)
	at async uploadCVs (D:\repo\054-2050-R3CR\3uploadCVs.js:56:2)
(node:21404) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:21404) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

*/
