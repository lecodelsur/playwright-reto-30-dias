import { Locator, Page } from "@playwright/test";

export class SidePanel {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }
    private menuOption(option: SideMenuOption): Locator {   //Este es el metodo privado que me permite crear 
        return this.page.getByRole('link', { name: option })
    }
    async clickOnOption(option: SideMenuOption) {
        await this.menuOption(option).click()
    }
}
export enum SideMenuOption {

    ADMIN = 'Admin',
    PIM = 'PIM',
    LEAVE = 'Leave',
    TIME = 'Time',
    RECRUITMENT = 'Recruitment',
    MY_INFO = 'My Info',
    PERFORMANCE = 'Performance',
    DASHBOARD = 'Dashboard',
    DIRECTORY = 'Directory',
    CLAIM = 'Claim',
    BUZZ = 'Buzz'
}