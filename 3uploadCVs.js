/* 
TO DO:

try save button, no name written

===2statusUpdateToRef
involve everything with a try, if it fails to locate the name, go for the other.
console.log('last prints X')

*/

const fs = require('fs').promises;
const puppeteer = require('puppeteer')
const credentials = require('./generalConfigs/credentials.json')
const cookies = require('./generalConfigs/cookies.json')
const scriptConfig = require('./3backBone/3CVsToUpload.js')
const uploadPage = 'https://recruit.zoho.com/recruit/org4314466/ImportParser.do?module=Candidates&type=importfromdocument'
// keyboard keys map: https://github.com/puppeteer/puppeteer/blob/main/src/common/USKeyboardLayout.ts

errorCounter = 0

async function uploadCVs() {

	/*===== necessary configs to launch the application =====*/

	let browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] })
	let page = await browser.newPage()

	/*====== adjust scree size ======*/
	await greaterMonitorView()
	// await mediumMonitorView()
	// await notebookSizeView()


	/*==== function-calls to be done ====*/

	await standardConfigurations()

	await login()

	await sequentialCVs_upload()

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
			await page.waitForNavigation({ waitUntil: 'networkidle2' })
	
		}
	
		async function storeCookies() {
	
			const cookies = await page.cookies()
			await fs.writeFile('./generalConfigs/cookies.json', JSON.stringify(cookies, null, 2))
	
		}

	}

	async function sequentialCVs_upload() {

		for (i = 0; i < scriptConfig.listOfCVsToUpload.length; i++) {
			
			await timerStart()

			loopedCV = scriptConfig.listOfCVsToUpload[i]

			if (await page.url() != uploadPage) { await page.goto(uploadPage, { waitUntil: 'networkidle0' }).catch(e => void 0) }

			await uploadCV_firstPart_prepareTheFile()
			await uploadCV_secondPart_prepareInformations()

			await timerStop()

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

				await page.waitForSelector('#entityLookupdiv > form > div.cvpadding.bB0 > table > tbody > tr > td:nth-child(2) > div > input', scriptConfig.positionNumber)
				await page.type('#entityLookupdiv > form > div.cvpadding.bB0 > table > tbody > tr > td:nth-child(2) > div > input', scriptConfig.positionNumber)

				await page.keyboard.press("Enter")

				await waitThreeSeconds()

				await page.waitForSelector('#entityLookupdiv > form > div.w100p > table > tbody > tr:nth-child(2) > td > div > div.popup-model-content.pB20 > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td:nth-child(1) > label > span', { timeout: 0 })
				await page.click('#entityLookupdiv > form > div.w100p > table > tbody > tr:nth-child(2) > td > div > div.popup-model-content.pB20 > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td:nth-child(1) > label > span')

				await waitOneSecond()

				await page.click('#resume_parser_import_id')

			}

			async function uploadCV_secondPart_prepareInformations() {

				try {

					await cvAlreadyExists()

				} catch (error) {

					await fillProfileInformations()

				}


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
					await page.type('select#Crm_Leads_LEADCF6', `${scriptConfig.jobFit}`)
					await page.keyboard.press("Tab")
					await page.keyboard.press("Enter")
					await waitTwoSeconds()
					await page.type('select#Crm_Leads_LEADCF7', `${scriptConfig.jobFit}`)
					await page.click('#Crm_Leads_LEADCF81')
					await waitOneSecond()
					await page.evaluate(`document.querySelector('td[class="sel"]').click()`)
					await page.select('select#Crm_Leads_LEADCF1', 'MD')
					await page.select('select#Crm_Leads_STATUS', 'sent email')

					await waitThreeSeconds()

					//// temporary jobfit1 reassurance in case it fails like before
					// await page.click('#Crm_Leads_COUNTRY')
					// await page.keyboard.press("Tab")
					// await page.keyboard.press("Enter")
					// await waitTwoSeconds()
					// await page.type('select#Crm_Leads_LEADCF6', `${scriptConfig.jobFit}`)

					// candidate owner
					await page.evaluate(`document.querySelector('[class="selectElementNew1"]').click()`)
					await waitOneSecond()
					await page.type('input[type="search"]', `${scriptConfig.candidateOwner}` )
					await waitTwoSeconds()
					await page.keyboard.press('ArrowDown')
					await page.keyboard.press("Enter")

					try { await page.click('#saveLeadsBtn') } catch (err) { console.log("could'nt press the IMPORT button" + '\n') }

					await waitThreeSeconds()
					await waitThreeSeconds()

					try {

						let temporaryScreenshotElement = await page.$('#dv_title')

						let nomeDoPerfil = await page.evaluate(`document.querySelectorAll('[class="bCardHover"]')[0].innerText`)

						await temporaryScreenshotElement.screenshot({ path: `./3backBone/prints/${scriptConfig.numeroDaScreenshot}${nomeDoPerfil}.png` }, { delay: 2000 })
						scriptConfig.numeroDaScreenshot++

						currentURL = page.url()

						await fs.appendFile('./3backBone/results', (scriptConfig.numeroDaScreenshot - 1) + '\n')
						await fs.appendFile('./3backBone/results', currentURL + '\n\n')

					} catch (err) {

						currentURL = page.url()

						await fs.appendFile('./3backBone/results', 'não funcionou' + (scriptConfig.numeroDaScreenshot) + '\n')

						await scriptConfig.numeroDaScreenshot++

						return

					}

				}

				async function cvAlreadyExists() {

					profileURL = await page.url()

					await page.waitForSelector('h4[class="marT24 marB8"]', { timeout: 0 })

					if (await page.waitForSelector('div[class="crm-msg-cnt"]', { timeout: 3000 })) { // if 'already exist' message appear

						try {

							// screenshot the current infos
							await page.screenshot({ path: `./3backBone/prints/${scriptConfig.numeroDaScreenshot}alreadyExistInfo1.png` }, { delay: 2000 })

							// close 'record already exists' POPUP
							await page.click('span[class="crm-msg-close"]')

							// write the result
							await fs.appendFile('./3backBone/results', '\n' + `${scriptConfig.numeroDaScreenshot}` + ' already exist' + '\n' + loopedCV + '\n')

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
								await fs.appendFile('./3backBone/results', profileURL + '\n\n')
								await page.screenshot({ path: `./3backBone/prints/${scriptConfig.numeroDaScreenshot}alreadyExistInfo2.png` }, '#preHTMLContainer_Leads', { delay: 2000 } )

								// timeline
								await page.click('#newleft_Activities')
								await waitTwoSeconds()
								await page.screenshot({ path: `./3backBone/prints/${scriptConfig.numeroDaScreenshot}alreadyExistInfo3.png` }, { delay: 2000 })

								// notes
								await page.click('#newleft_Notes')
								await waitTwoSeconds()
								await page.screenshot({ path: `./3backBone/prints/${scriptConfig.numeroDaScreenshot}alreadyExistInfo4.png` }, { delay: 2000 })

								// interviews
								await page.click('#newleft_67512000002497890') 
								await waitTwoSeconds()
								await page.screenshot({ path: `./3backBone/prints/${scriptConfig.numeroDaScreenshot}alreadyExistInfo5.png` }, { delay: 2000 })

								scriptConfig.numeroDaScreenshot++

							}

						} catch (error) {console.log(error.stack + '\n\n')}

					}

				}

			}

		}

	}




	/*========== standard utility functions ==========*/

	async function standardConfigurations() {

		startTimeMarker = Date.now()
		await page.setDefaultNavigationTimeout(0)
		const context = browser.defaultBrowserContext()
		context.overridePermissions("https://recruit.zoho.com/recruit/org4314466/ImportParser.do?module=Candidates&type=importfromdocument", ["geolocation", "notifications"]) // An array of permissions

	}

	async function timerStart() {
		
		startTimeMarker = Date.now()

	}

	async function timerStop() {
		
		endingTimeMarker = Date.now()
		await console.log(`loop ${i} executed in`, Math.ceil(((endingTimeMarker - startTimeMarker) / 1000) / 60) + ' minutes' + '\n')

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
		await console.log('whole application executed in', Math.ceil(((endingTimeMarker - startTimeMarker) / 1000) / 60) + ' minutes' + '\n')

		await browser.close()
	}

}

uploadCVs()