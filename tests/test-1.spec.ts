import { test, expect } from '@playwright/test';

test('Login test and routes', async ({ page }) => {
  await page.goto('https://myjobupgrade.com/');
  await page.getByRole('navigation').filter({ hasText: 'Skip to contentHomeAccountResumeSign in' }).getByRole('link', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/signin/);
  await page.getByPlaceholder('Your email address').click();
  await page.getByPlaceholder('Your email address').fill('bruno.sette@gmail.com');
  await page.getByPlaceholder('Your email address').press('Tab');
  await page.getByPlaceholder('Your password').fill('voupassar');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page).toHaveURL(/resume/);
  await page.getByPlaceholder('Paste here your resume...').click();
  await page.getByPlaceholder('Paste here your resume...').fill('Here is my resume ');
  await page.getByRole('button', { name: 'Save Resume' }).click();
  await expect(page).toHaveURL(/jobpost/);
  await page.getByPlaceholder('Paste here your job post...').click();
  await page.getByPlaceholder('Paste here your job post...').fill('Here is my Jobpost');
  await page.getByRole('button', { name: 'Save Job Post' }).click();
  await expect(page).toHaveURL(/profile/);
  await page.getByRole('navigation').filter({ hasText: 'Skip to contentHomeAccountResume' }).getByRole('link', { name: 'Account' }).click();
  await expect(page).toHaveURL(/account/);
  await expect(page.locator('h3:has-text("Your Plan")')).toBeVisible();
  await page.getByRole('link', { name: 'Privacy Policy' }).click();
  await expect(page).toHaveURL(/privacypolicy/);
  await page.getByRole('link', { name: 'Terms of Use' }).click();
  await expect(page).toHaveURL(/terms/);
    await page.getByRole('navigation').filter({ hasText: 'Skip to contentHomeAccountResume' }).getByRole('link', { name: 'Home' }).click();
  await expect(page.locator('h3:has-text("Upgrade Your Job")')).toBeVisible();

});

test('Creating a Resume', async ({ page }) => {
test.setTimeout(120000);
  await page.goto('https://myjobupgrade.com/');
  await page.getByRole('navigation').filter({ hasText: 'Skip to contentHomeAccountResumeSign in' }).getByRole('link', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/signin/);
  await page.getByPlaceholder('Your email address').click();
  await page.getByPlaceholder('Your email address').fill('bruno.sette@gmail.com');
  await page.getByPlaceholder('Your email address').press('Tab');
  await page.getByPlaceholder('Your password').fill('voupassar');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page).toHaveURL(/resume/);
  await page.getByPlaceholder('Paste here your resume...').click();
  await page.getByPlaceholder('Paste here your resume...').fill('brunosette@gmail.com. Google Analytics Social Media Marketing Google AdWords Inglês - Native or Bilingual Português Certifications Learning How to Learn: Powerful mental tools to help you master tough subjects edX Verified Certificate for The Science of Happiness Gamification edX Verified Certificate for Entrepreneurship 101: Who is your customer? Bruno Sette Sócio Fundador Toronto, Ontario, Canada');
  await page.getByRole('button', { name: 'Save Resume' }).click();
  await expect(page).toHaveURL(/jobpost/);
  await page.getByPlaceholder('Paste here your job post...').click();
  await page.getByPlaceholder('Paste here your job post...').fill('We pride ourselves on building diverse and sustainable relationships with our customers, consumers, stakeholders, and communities through our shared values: lead with an entrepreneurial mindset, collaboration, integrity, accountability. Adwords and google analytics certification. We are seeking a  UI/UX Front-End Developer to join Coca-Cola Advanced Analytics team. As a UI/UX Front-End Developer, you will play a crucial role in designing and developing user interfaces for advanced analytics applications. Your expertise in UI/UX design, front-end development, and data visualization will contribute to unlocking valuable insights and driving data-driven decision-making within Coca-Cola.Responsibilities. Collaborate closely with the Advanced Analytics team, including data scientists and business analysts, to understand requirements and translate them intuitive and visually appealing user interfaces.Design and develop interactive and user-friendly front-end interfaces for advanced analytics applications, adhering to industry-leading UI/UX design principles and best practices. Implement responsive web designs that are compatible with various devices and browsers, ensuring optimal user experience across platforms.');
  await page.getByRole('button', { name: 'Save Job Post' }).click();
  await expect(page).toHaveURL(/profile/);
  await page.locator('#first-name').click();
  await page.locator('#first-name').fill('Bruno');
  await page.locator('#first-name').press('Tab');
  await page.locator('#last-name').fill('Sette');
  await page.locator('#last-name').press('Tab');
  await page.getByLabel('Email').fill('brunosette@gmail.com');
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Linkedin URL').fill('https://www.linkedin.com/in/brunosette/');
  await page.getByLabel('Linkedin URL').press('Tab');
  await page.getByLabel('Phone').fill('6475146758');
  await page.getByLabel('Phone').press('Tab');
  await page.getByLabel('Portfolio Link (optional)').fill('www.brnosette.com.br');
  await page.getByLabel('Portfolio Link (optional)').press('Tab');
  await page.getByLabel('Website (optional)').fill('www.bruno.com.br');
  await page.getByLabel('Website (optional)').press('Tab');
  await page.getByLabel('City').fill('Toronto');
  await page.getByLabel('City').press('Tab');
  await page.getByLabel('State / Province').fill('ON');
  await page.getByLabel('State / Province').press('Tab');
  await page.locator('#postal-code').fill('m2p2g6');
  await page.locator('#postal-code').press('Tab');
  await page.getByRole('button', { name: 'Save and Create my Resume' }).click();
  await expect(page).toHaveURL(/results/);
  await expect(page.locator('h3:has-text("Congratulations!")')).toBeVisible({ timeout: 60000 });
  await page.getByRole('button', { name: 'Ok' }).click();
  await page.getByText('Bruno Sette').click();
  await page.getByText('Bruno SetteToronto, ON - 6475146758 - brunosette@gmail.com Linkedin: https://www')

});