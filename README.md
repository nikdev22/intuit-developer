1. Open up the application.
2. Run, 'npm install'.
3. Open app.js from the folder and add ClientId, ClientSecret and redirectUri into it.
4. Run the application, 'node app.js'.
5. Open up a browser and go to, 'http://localhost:8080'.
6. Application will ask to authenticate, enter username and password.
7. If authentication is success, it will redirect to homepage.

Things to Do:
1. This is not a fully fledged application.
2. Application only focues on three QBO objects such as; Account, Bill and Company Info.
3. Create and Update functionality will be added shortly to the application.

Things to expect - provided below are the screenshots of the pages that you can expect.
1. <strong>Authentication/ Sign in page.</strong>
<img src="https://intuitsolution.s3.amazonaws.com/i1.png" alt="sign_page">
<br>
2. Once the authentication is completed, it will gather the <strong>access token( in background)</strong> and redirect to Home page.QBO enpoints will be displayed. In this case; Account,Bill and company info will be displayed.
<img src="https://intuitsolution.s3.amazonaws.com/i2.png" alt="home_page">
<br>
3. For this example, Let's <strong>choose Account.</strong>
<img src="https://intuitsolution.s3.amazonaws.com/i3.png" alt="home_page">
<br>
4. At the moment, <strong>read and query</strong> options are added. So, you can choose either Read or Query. If you choose Read, then the following page will appear.
<img src="https://intuitsolution.s3.amazonaws.com/i4.png" alt="home_page">
<br>
5. Once, you enter <strong>account Id </strong>and Proceed to fetch info, following page will appear with details regarding the company.
<img src="https://intuitsolution.s3.amazonaws.com/i5.png" alt="home_page">
<br>
6. You can either choose to go back or stay. If you choose to go back and click on <strong>Query</strong>, following page appears.
<img src="https://intuitsolution.s3.amazonaws.com/i6.png" alt="home_page">
<br>
7. Once the <strong>Query</strong> extract data, the <strong>results are displayed</strong> as follows.
<img src="https://intuitsolution.s3.amazonaws.com/i7.png" alt="home_page">
