import { expect, test, type Page } from "@playwright/test";

async function navigateToHome(page: Page) {
    await page.goto("http://localhost:5173/");
}

async function enterSearchQuery(page: Page, query: string) {
    const input = page.getByTestId("query-input");
    await input.fill(query);
    await waitForFlightResults(page);
}

async function waitForFlightResults(page: Page) {
    await page.waitForResponse((response) => response.url().includes("/api/flights/byQuery") && response.status() === 200);
}

test.describe("Happy flow", () => {
    test("Can select departure option", async ({ page }) => {
        await navigateToHome(page);

        const arrivalRadioButton = page.getByTestId("radio-arrival");
        const arrivalRadioButtonLabel = page.getByTestId("radio-label-arrival");

        await arrivalRadioButtonLabel.click();
        await expect(arrivalRadioButton).toBeChecked();
    });

    test("Can enter a search query and expect results", async ({ page }) => {
        await navigateToHome(page);
        await enterSearchQuery(page, "London");

        const flightResults = page.getByTestId("flight-results");
        await expect(flightResults).toBeVisible();

        const flights = page.locator('[data-testid="flight"]');
        expect(await flights.count()).toBe(5);
    });

    test("Can sort flights late to early", async ({ page }) => {
        await navigateToHome(page);
        await enterSearchQuery(page, "London");

        const sortInput = page.getByTestId("sort");
        await sortInput.selectOption("descending");

        await expect(page.getByTestId("flightdate").first()).toHaveText("February 24, 2022");
    });

    test("Can sort flights early to late", async ({ page }) => {
        await navigateToHome(page);
        await enterSearchQuery(page, "London");

        const sortInput = page.getByTestId("sort");
        await sortInput.selectOption("ascending");

        await expect(page.getByTestId("flightdate").first()).toHaveText("February 22, 2022");
    });
});
