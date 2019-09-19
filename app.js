const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const OAuthClient = require('intuit-oauth');
var rp = require('request-promise');
var request = require('request');



app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))
app.use(bodyParser.json());


const urlEncodedParser = bodyParser.urlencoded({extended:false});
let redirectUri = '';
let oauthClient = null;
var companyId;
var oauth2_token_json = null;
var accResult;





//index route
app.get("/",urlEncodedParser,(req,res)=>{
    oauthClient = new OAuthClient({
        clientId: '<client_Id>',
        clientSecret: '<client_secret>',
        environment: '<env>',
        redirectUri: '<redirect_uri>'
    });

    const authUri = oauthClient.authorizeUri({
        scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.Openid],state:'testState'
    });
    res.redirect(authUri);


});

//callback
app.get('/myapp',async(req,res)=>{
    var parseUrl = req.url;
    oauthClient.createToken(parseUrl)
    .then(function(authResponse){
        oauth2_token_json = JSON.stringify(authResponse.getJson());
        var result = authResponse.getJson();
        oauth2_token_json = result.access_token;
        companyId = oauthClient.getToken().realmId;
        env = OAuthClient.environment.sandbox;
        res.render('index');
    })
    .catch(function(e){
        console.log(e);
        res.redirect('/');
    });
    
});


//account router
app.get('/account',(req,res)=>{
    res.render('obj',{obj:'account'});
});
app.get('/account/read',(req,res)=>{
    res.render('read_obj',{obj:'account'});
});
app.post('/account/read',(req,res)=>{
    var accountId = req.body.objId;
    companyId = oauthClient.getToken().realmId;
    const url = oauthClient.environment == 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production ;
    oauthClient.makeApiCall({url: url + 'v3/company/'+companyId+'/account/'+accountId+'?minorversion=40'})
        .then(async function(authResponse){
            var result = JSON.parse(authResponse.text());
            var accountInfo = new Object();
            accountInfo.Name = result.Account.Name;
            accountInfo.AccountType = result.Account.AccountType;
            accountInfo.CurrentBalance = result.Account.CurrentBalance;
            accountInfo.AccountSubType = result.Account.AccountSubType;
            res.render('ac_read_result',{accountInfo:(JSON.parse(authResponse.text())).Account});
            
        })
        .catch(function(e) {
            console.log("error");
            res.render('errorAcc',{obj:'account'});
        });
  
});

app.get('/account/query',(req,res)=>{
    res.render('query_obj',{obj:'account'});
});
app.post('/account/query',(req,res)=>{
    var queryAcc = req.body.Query;
    companyId = oauthClient.getToken().realmId;
    const url = oauthClient.environment == 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production ;
    oauthClient.makeApiCall({url: url + 'v3/company/'+companyId+'/query?query='+queryAcc+'&minorversion=40'})
        .then(async function(authResponse){
            var result = JSON.parse(authResponse.text());
            var resultArray = result.QueryResponse.Account;
            res.render('ac_query_result',{dataResult:(JSON.parse(authResponse.text())).QueryResponse.Account});
        })
        .catch(function(e) {
            console.log("error :" +e);
            res.render('errorAcc',{obj:'account'});
        });  
});

//bill router
app.get('/bill',(req,res)=>{
    res.render('obj',{obj:'bill'});
});
app.get('/bill/read',(req,res)=>{
    res.render('read_obj',{obj:'bill'});
});

app.post('/bill/read',(req,res)=>{
    var billId = req.body.objId;
    companyId = oauthClient.getToken().realmId;
    const url = oauthClient.environment == 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production ;
    oauthClient.makeApiCall({url: url + 'v3/company/'+companyId+'/bill/'+billId+'?minorversion=40'})
        .then(async function(authResponse){
            var result = JSON.parse(authResponse.text());         
            res.render('bill_read_result',{billInfo:(JSON.parse(authResponse.text())).Bill});
        })
        .catch(function(e) {
            console.log("error");
            res.render('errorAcc',{obj:'bill'});
        });
});

app.get('/bill/query',(req,res)=>{
    res.render('query_obj',{obj:'bill'});
});

app.post('/bill/query',(req,res)=>{
    var queryBill = req.body.Query;
    companyId = oauthClient.getToken().realmId;
    const url = oauthClient.environment == 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production ;
    oauthClient.makeApiCall({url: url + 'v3/company/'+companyId+'/query?query='+queryBill+'&minorversion=40'})
        .then(async function(authResponse){
            var result = JSON.parse(authResponse.text());
            res.render('bill_query_result',{dataResult:(JSON.parse(authResponse.text())).QueryResponse.Bill});
        })
        .catch(function(e) {
            console.log("error :" +e);
            res.render('errorAcc',{obj:'bill'});
        });  
});

//company info
app.get('/company_info',(req,res)=>{
    res.render('obj',{obj:'company_info'});
});
app.get('/company_info/read',(req,res)=>{
    res.render('read_obj',{obj:'company_info'});
});
app.post('/company_info/read',(req,res)=>{
    var companyInfoId = req.body.objId;
    companyId = oauthClient.getToken().realmId;
    const url = oauthClient.environment == 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production ;
    oauthClient.makeApiCall({url: url + 'v3/company/'+companyId+'/companyinfo/'+companyInfoId+'?minorversion=40'})
        .then(async function(authResponse){
            var result = JSON.parse(authResponse.text());         
            res.render('company_read_results',{companyInfo:(JSON.parse(authResponse.text())).CompanyInfo});
        })
        .catch(function(e) {
            console.log("error");
            res.render('errorAcc',{obj:'company_info'});
        });
});

app.get('/company_info/query',(req,res)=>{
    res.render('query_obj',{obj:'company_info'});
});

app.post('/company_info/query',(req,res)=>{
    var queryCompany = req.body.Query;
    companyId = oauthClient.getToken().realmId;
    const url = oauthClient.environment == 'sandbox' ? OAuthClient.environment.sandbox : OAuthClient.environment.production ;
    oauthClient.makeApiCall({url: url + 'v3/company/'+companyId+'/query?query='+queryCompany+'&minorversion=40'})
        .then(async function(authResponse){
            var result = JSON.parse(authResponse.text());
            res.render('company_query_result',{dataResult:(JSON.parse(authResponse.text())).QueryResponse.CompanyInfo});
        })
        .catch(function(e) {
            console.log("error :" +e);
            res.render('errorAcc',{obj:'company_info'});
        });  
});


app.listen(8080, ()=>{
    console.log('Server started');
});
