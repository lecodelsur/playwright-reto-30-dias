import { Locator, Page } from "@playwright/test";
export class JobMenu {
    readonly page: Page
    readonly job: Locator //aca creo el localizador
    readonly jobTitlesOption
    readonly payGradesOption
    readonly employementStatusOption
    readonly jobCategoriesOption
    readonly workShiftsOption

    constructor(page: Page) {

        this.page = page
        this.job = page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Job')
        this.jobTitlesOption = page.getByRole('menuitem', { name: 'Job Titles' })
        this.payGradesOption = page.getByRole('menuitem', { name: 'Pay Grades' })
        this.employementStatusOption = page.getByRole('menuitem', { name: 'Employement Status' })
        this.jobCategoriesOption = page.getByRole('menuitem', { name: 'Job Categories' })
        this.workShiftsOption = page.getByRole('menuitem', { name: 'Work Shifts' })
    }
    private async clickOnJob() { //se pone private para que no se muestren las en las demas opciones
        await this.job.click()
    }
    async clickOnJobTitles() {
        await this.clickOnJob()
        await this.jobTitlesOption.click()
    }
    async clickOnPayGrades() {
        await this.clickOnJob()
        await this.payGradesOption.click()
    }
    async clickOnEmployementStatus() {
        await this.clickOnJob()
        await this.payGradesOption.click()
    }
    async clickOnJobCategories() {
        await this.clickOnJob()
        await this.jobCategoriesOption.click()
    }
    async clickOnWorkShifts() {
        await this.clickOnJob()
        await this.workShiftsOption.click()
    }
}