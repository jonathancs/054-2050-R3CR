const fs = require('fs').promises;
const puppeteer = require('puppeteer')
const credentials = require('./configs/credentials.json')
const cookies = require('./configs/cookies.json')

let numeroDaScreenshot = 1
const linkOfTheFilteredPage = 'https://recruit.zoho.com/recruit/org4314466/ShowTab.do?isSearch=false&module=Candidates&cvid=67512000002507073&filters=%5B%7B%22searchfieldtype%22%3A%22picklist%22%2C%22searchfield%22%3A%22CrmLeadDetails%3ASTATUS%22%2C%22searchModule%22%3A%22Leads%22%2C%22condition%22%3A%221%22%2C%22value%22%3A%22fired%2Cresigned%2COSF%20employee%22%7D%2C%7B%22searchfieldtype%22%3A%22picklist%22%2C%22searchfield%22%3A%22CrmLeadsNewCF%3ALEADCF6%22%2C%22searchModule%22%3A%22Leads%22%2C%22condition%22%3A%220%22%2C%22value%22%3A%22.net%20developer%22%7D%2C%7B%22searchfieldtype%22%3A%22T%22%2C%22searchfield%22%3A%22CrmLeadDetails%3ACOUNTRY%22%2C%22searchModule%22%3A%22Leads%22%2C%22condition%22%3A%222%22%2C%22value%22%3A%22brazil%22%7D%2C%7B%22searchfieldtype%22%3A%22DT%22%2C%22searchfield%22%3A%22CrmLeadDetails%3ALASTACTIVITYTIME%22%2C%22searchModule%22%3A%22Leads%22%2C%22condition%22%3A%227%22%2C%22value%22%3A%2214.08.2020%22%7D%2C%7B%22searchfieldtype%22%3A%22picklist%22%2C%22searchfield%22%3A%22CrmLeadsNewCF%3ALEADCF12%22%2C%22searchModule%22%3A%22Leads%22%2C%22condition%22%3A%220%22%2C%22value%22%3A%22I%201%2CI%202%2CJR%201%2CJR%202%2CSR%201%2CSR%202%22%7D%5D'

async function checkHistoric() {

	// launch application
	let browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] })
	let page = await browser.newPage()
	// await page.setViewport({ width: 1920, height: 940, deviceScaleFactor: 1, }) // greater monitor
	await page.setViewport({ width: 1270, height: 680, deviceScaleFactor: 1, }); // notebook screen


	/*    function-calls to be done    */

	await standardConfigurations()

    await login()

	await huntCandidatesInTheSystem()
	
	await browser.close()

	/*   End of the calls   */

	/*   below is the base script   */








    

	async function standardConfigurations() {

		await page.setDefaultNavigationTimeout(0)
		const context = browser.defaultBrowserContext()
		context.overridePermissions('https://recruit.zoho.com/recruit/org4314466/ShowTab.do?isSearch=false&module=Candidates&cvid=67512000002507073&filters=%5B%7B"searchfieldtype"%3A"picklist"%2C"searchfield"%3A"CrmLeadDetails%3ASTATUS"%2C"searchModule"%3A"Leads"%2C"condition"%3A"1"%2C"value"%3A"fired%2Cresigned%2Cnot%20reachable%2COSF%20employee"%7D%2C%7B"searchfieldtype"%3A"DT"%2C"searchfield"%3A"CrmLeadDetails%3ALASTACTIVITYTIME"%2C"searchModule"%3A"Leads"%2C"condition"%3A"7"%2C"value"%3A"14.08.2020"%7D%2C%7B"searchfieldtype"%3A"T"%2C"searchfield"%3A"CrmLeadDetails%3ACOUNTRY"%2C"searchModule"%3A"Leads"%2C"condition"%3A"2"%2C"value"%3A"brazil"%7D%2C%7B"searchfieldtype"%3A"picklist"%2C"searchfield"%3A"CrmLeadsNewCF%3ALEADCF12"%2C"searchModule"%3A"Leads"%2C"condition"%3A"0"%2C"value"%3A"I%201%2CI%202%2CJR%201%2CJR%202%2CSR%201%2CSR%202"%7D%2C%7B"searchfieldtype"%3A"picklist"%2C"searchfield"%3A"CrmLeadsNewCF%3ALEADCF6"%2C"searchModule"%3A"Leads"%2C"condition"%3A"0"%2C"value"%3A"front-end%20dev"%7D%5D', ["geolocation", "notifications"]) // An array of permissions
		
	}

	async function login() {

		if (Object.keys(cookies).length) { loginWithCookies() } else { loginWithoutCookies() }

	}

	async function loginWithCookies() {

		const cookiesString = await fs.readFile('./configs/cookies.json');
		const cookies = JSON.parse(cookiesString);
		await page.setCookie(...cookies);
		await page.goto(`https://recruit.zoho.com/recruit/org4314466/ShowTab.do?isSearch=false&module=Candidates&cvid=67512000002507073&filters=%5B%7B"searchfieldtype"%3A"picklist"%2C"searchfield"%3A"CrmLeadDetails%3ASTATUS"%2C"searchModule"%3A"Leads"%2C"condition"%3A"1"%2C"value"%3A"fired%2Cresigned%2Cnot%20reachable%2COSF%20employee"%7D%2C%7B"searchfieldtype"%3A"DT"%2C"searchfield"%3A"CrmLeadDetails%3ALASTACTIVITYTIME"%2C"searchModule"%3A"Leads"%2C"condition"%3A"7"%2C"value"%3A"14.08.2020"%7D%2C%7B"searchfieldtype"%3A"T"%2C"searchfield"%3A"CrmLeadDetails%3ACOUNTRY"%2C"searchModule"%3A"Leads"%2C"condition"%3A"2"%2C"value"%3A"brazil"%7D%2C%7B"searchfieldtype"%3A"picklist"%2C"searchfield"%3A"CrmLeadsNewCF%3ALEADCF12"%2C"searchModule"%3A"Leads"%2C"condition"%3A"0"%2C"value"%3A"I%201%2CI%202%2CJR%201%2CJR%202%2CSR%201%2CSR%202"%7D%2C%7B"searchfieldtype"%3A"picklist"%2C"searchfield"%3A"CrmLeadsNewCF%3ALEADCF6"%2C"searchModule"%3A"Leads"%2C"condition"%3A"0"%2C"value"%3A"front-end%20dev"%7D%5D`, { waitUntil: 'networkidle0' })

	}

	async function loginWithoutCookies() {

		await page.goto('https://recruit.zoho.com/recruit/org4314466/ShowTab.do?isSearch=false&module=Candidates&cvid=67512000002507073&filters=%5B%7B"searchfieldtype"%3A"picklist"%2C"searchfield"%3A"CrmLeadDetails%3ASTATUS"%2C"searchModule"%3A"Leads"%2C"condition"%3A"1"%2C"value"%3A"fired%2Cresigned%2Cnot%20reachable%2COSF%20employee"%7D%2C%7B"searchfieldtype"%3A"DT"%2C"searchfield"%3A"CrmLeadDetails%3ALASTACTIVITYTIME"%2C"searchModule"%3A"Leads"%2C"condition"%3A"7"%2C"value"%3A"14.08.2020"%7D%2C%7B"searchfieldtype"%3A"T"%2C"searchfield"%3A"CrmLeadDetails%3ACOUNTRY"%2C"searchModule"%3A"Leads"%2C"condition"%3A"2"%2C"value"%3A"brazil"%7D%2C%7B"searchfieldtype"%3A"picklist"%2C"searchfield"%3A"CrmLeadsNewCF%3ALEADCF12"%2C"searchModule"%3A"Leads"%2C"condition"%3A"0"%2C"value"%3A"I%201%2CI%202%2CJR%201%2CJR%202%2CSR%201%2CSR%202"%7D%2C%7B"searchfieldtype"%3A"picklist"%2C"searchfield"%3A"CrmLeadsNewCF%3ALEADCF6"%2C"searchModule"%3A"Leads"%2C"condition"%3A"0"%2C"value"%3A"front-end%20dev"%7D%5D', { waitUntil: 'networkidle0' })

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
    
    async function huntCandidatesInTheSystem() {

        await page.goto(linkOfTheFilteredPage, {waitUntil : 'networkidle2' }).catch(e => void 0)

        await page.waitForSelector('#totalRecordsCount')
        await page.click('#totalRecordsCount')

        // const numberOfProfiles = await page.evaluate('document.querySelector("#totalCountNo > b").innerHTML')
        const numberOfProfiles = await page.evaluate('document.querySelector(".listview").children[1].children.length')
        console.log(numberOfProfiles)

        for (let i = 0; i < (numberOfProfiles-1); i++) {

            if (await page.url() != linkOfTheFilteredPage) {await page.goto(linkOfTheFilteredPage, { waitUntil: 'networkidle2' })}
            
            // maybe await waitThreeSeconds() 
            
            // let graspedElement = await page.evaluate(`document.querySelector(".listview").children[1].children[${i}].click()`)
            await page.evaluate(`document.querySelector(".listview").children[1].children[${i}].click()`)

            // await page.click(graspedElement)
            
            await page.waitForSelector('#newleft_Info', {timeout:0})
            
		    let currentURL = page.url()
            await page.screenshot({ path: `./prints/${numeroDaScreenshot}.png` }, { delay: 2000 })
            await fs.appendFile('./results/linkstoCheck', (numeroDaScreenshot) + '\n')
		    await fs.appendFile('./results/linkstoCheck', currentURL + '\n\n')
            await numeroDaScreenshot++

            await page.click('#newleft_Activities')
            
            await waitThreeSeconds()
            
            await page.screenshot({ path: `./prints/${numeroDaScreenshot}.png` }, { delay: 2000 })
            await numeroDaScreenshot++
            
            await page.click('#newleft_Notes')

            await waitThreeSeconds()
            
            await page.screenshot({ path: `./prints/${numeroDaScreenshot}.png` }, { delay: 2000 })
            await numeroDaScreenshot++

        }




    }

}

checkHistoric()