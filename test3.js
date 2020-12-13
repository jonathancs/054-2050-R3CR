const fs = require('fs').promises
const puppeteer = require('puppeteer')


async function test3() {

    let browser = await puppeteer.launch({ headless: false })
    let page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0)
    await page.setViewport({ width: 1920, height: 1200, deviceScaleFactor: 1, }) // greater monitor

    await page.goto('https://easyupload.io/')

    await page.waitForSelector('input[type=file]')
    
    const inputUploadHandle = await page.$('input[type=file]')

    let fileToUpload = './wp.jpg'

    inputUploadHandle.uploadFile(fileToUpload)

    await page.waitForSelector('#upload')
    await page.evaluate(() => document.getElementById('#dropzone > div').click())

    // wait for selector that contains the uploaded file URL
    await page.waitForSelector('#upload-link')
    await waitTwoSeconds()
    await waitTwoSeconds()

    // get the download URL
    let downloadUrl = await page.evaluate(() => {
        return document.getElementById('upload-link').value
    })

    // display the result on console
    console.log({'file': fileToUpload,
                 'download_url': downloadUrl})

    // close the browser
    // await browser.close()


    
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
}

test3()




