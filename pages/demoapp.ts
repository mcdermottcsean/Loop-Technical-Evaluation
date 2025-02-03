import { expect, type Locator, type Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
const url:string = process.env.URL!;
const username:string = process.env.USER_NAME!;
const password:string = process.env.PASSWORD!;

export class DemoApp {
    readonly page: Page;
    readonly textboxUserName: Locator;
    readonly textboxPassword: Locator;
    readonly buttonSignIn: Locator;
    readonly buttonWebApplication: Locator;
    readonly buttonMobileApplication: Locator;
    readonly buttonMarketingCampaign: Locator;
    readonly headerApplication: Locator;

    constructor(page: Page) {
        this.page = page;

        // Login page objects
        this.textboxUserName = page.getByRole('textbox', { name: 'Username' });
        this.textboxPassword = page.getByRole('textbox', { name: 'Password' });
        this.buttonSignIn = page.getByRole('button', { name: 'Sign in' });

        // Demo App page elements
        this.buttonWebApplication = page.getByRole('button', { name: 'Web Application Main web application development' });
        this.buttonMobileApplication = page.getByRole('button', { name: 'Mobile Application Native mobile app development' });
        this.buttonMarketingCampaign = page.getByRole('button', { name: 'Marketing Campaign Q2 Marketing initiatives' });
        this.headerApplication = page.getByRole('banner').getByRole('heading');

    }

    /**
     * Logs the user into the Demo App
     */
    async login() {
        await this.page.goto(url);
        await this.textboxUserName.fill(username);
        await this.textboxPassword.fill(password);
        await this.buttonSignIn.click();
        await expect(this.headerApplication).toBeVisible();
        console.log('Log in complete');
    }

    /**
     * Chooses a scrum based off the passed string
     * 
     * @param scrum String - Specific scrum (Web Application, Mobile Application, Marketing Campaign)
     */
    async navigateToPage(scrum: string) {
        switch(scrum) {
            case "Web Application":
                await this.buttonWebApplication.click();
                break;
            case "Mobile Application":
                await this.buttonMobileApplication.click();
                break;
            case "Marketing Campaign":
                await this.buttonMarketingCampaign.click();
                break;
        }
        await expect(this.headerApplication).toHaveText(scrum);
        console.log('Opened ' + scrum);
    }

    /**
     * Verifies a ticket is in a column
     * 
     * @param ticket String - Ticket name
     * @param column String - Column name
     */
    async confirmColumn(ticket: string, columnTitle: string) {
        const column = this.page.locator('h2:has-text("' + columnTitle + '")').locator('..');
        await expect(column).toContainText(ticket);
        console.log(ticket + ' ticket is in column: ' + columnTitle);
    }

    /**
     * Verifies that a ticket has the specified tags
     * 
     * @param ticket String - Ticket name
     * @param tags String[] - List of tags on a given ticket
     */
    async verifyTags(ticket: string, tags: string[]) {
        const ticketCard = this.page.locator('text="' +  ticket + '"').locator('..');

        for (const tag of tags) {
            await expect(ticketCard).toContainText(tag.toString());
            console.log(ticket + ' ticket contains tag: ' + tag);
        }
    }

}

