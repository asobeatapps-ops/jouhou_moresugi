async function finishIntro(page){for(let i=0;i<10&&await page.locator('#introScreen').isVisible();i++)await page.locator('#chatNextBtn').click();if(await page.locator('#introScreen').isVisible())throw Error('Conversation did not finish after explicit taps')}
module.exports={finishIntro};
