# Table of Contents
1. [Components](#components)
- [About.js](#aboutjs)
- [AddCoach.jsx](#addcoachjsx)
- [AddForm.js](#addformjs)
- [Analysis.js](#analysisjs)
- [Contact.jsx](#contactjsx)
- [Data.jsx](#datajsx)
- [DataExportExcel.js](#dataexportexceljs)
- [DoTest.js](#dotestjs)
- [DoTestExcel.js](#dotestexceljs)
- [DoTestPage.js](#dotestpagejs)
- [Footer.js](#footerjs)
- [Header.js](#headerjs)
- [Home.js](#homejs)
- [LineChart.js](#linechartjs)
- [LoginDashboard_a.jsx](#logindashboard_ajsx)
- [LoginDashboard_c.jsx](#logindashboard_cjsx)
- [LoginDashboard_p.jsx](#logindashboard_pjsx)
- [ManageDatabase.jsx](#managedatabasejsx)
- [NotFound.jsx](#notfoundjsx)
- [Policy.js](#policyjs)
- [Terms.js](#termsjs)
- [Login.js](#loginjs)
- [App.js](#appjs)
- [App.test.js](#apptestjs)
- [reportWebVitals.js](#reportwebvitalsjs)
- [setupTests.js](#setuptestsjs)
- [views.jsx](#viewsjsx)



# FRONTEND

## About.js
#### A page that displays information about the project and the team behind it. Can be reached from the footer.

## AddCoach.jsx
#### A page that allows the admin to add a coach to the database. The coach will receive an email with a link to the login page, but can also just log in.

## AddForm.js
#### A page that allows the user to add a form(table) to the database. The form will be available for the admin to fill in, in doTest.
#### The data that is sent to the database
```
{
name: formName,
fields: fieldsList,
ataType: dataTypeList,
}
```
#### FieldsList and dataTypeList must be the same length. The list is converted from this format: {name: "", dataType: "" }

## Analysis.js
#### A page that allows the user to view the analysis of the data. Currently showing a dummy page. Should be able to choose which data to show in the graph.

## Contact.jsx
#### A page that allows the user to contact the team behind the project by sending an email. 

## Data.jsx
#### A page that allows the user to view the data. Admin can see all data, coach can see all data from their participants and participant can see their own data. This will be shown in a table that can be exported to excel.
```
<DataExportExcel sheetData={information} sheetName={forms.tableName}/>
```
```
information = [{columnName: exampleName1}, {columnName: exampleName2}]
tableName = "exampleTableName"
```
## DataExportExcel.js
#### A component that allows the user to export the data to an excel file. The function is used in Data.jsx. Component needs two props inorder to work. sheetData and sheetName
```
function DataExportExcel(props)
```
```
props.sheetData = {[name: columName,
            value: columDataType,]}

props.sheetName = "exampleTableName"
```

## DoTest.js
#### A component that allows the user to do a test. The user can input the data manually. The switch button is used to switch to DoTestExcel.js(component for input with an excel file).

```
function DoTest(props)
```
```
props.data = {[name: columName,
            dataType: columDataType,]}

props.formName = "exampleTableName"
```



## DoTestExcel.js
#### A component that allows the user to do a test with an excel file. The user can upload an excel file with the data that fills in the form automatically. Data sent in thru properties(props) is required for component to work. 

```
function DoTestExcel(props)
```
```
props.data = {[name: columName,]}
props.formName = "exampleTableName"
```


## DoTestPage.js
#### A page that allows the user to do a test. Gets table data from selected table using api. The data is then used in DoTest.js(component for manual input) and DoTestExcel(Component for input with an excel file). Switch button allows user to switch between manual input and excel input. Switches between components DoTest.js and DoTestExcel.js 



Components DoTest and DoTestExcel Expects and requires properties data and formName.
```
<DoTestExcel data={formData} formName={formName}/>
<DoTest data={formData} formName={formName}/>
```
Required format of data property
```
formData = {[name: columName,
            dataType: columDataType,]}
```

Required format of fornName property
```
formName = "exampleTableName"
```



## Footer.js
#### A page that displays the footer. Footer contains links to About us, Contact us, Privacy policy and Terms of use.

## Header.js
#### A page that displays the header. Header contains the logo and profile picture. Pressing the logo will take the user to the home page.

## Home.js
#### A page that displays the home page, where the user can login. Depending on the user type in the database, the user will be redirected to the correct page.

## LineChart.js
#### A page that displays the line chart. Currently showing a dummy chart.

## LoginDashboard_a.jsx
#### A page that allows the admin to see the admin specific pages. Only the admin can make and remove forms, do tests, see alla data and add coaches.

## LoginDashboard_c.jsx
#### A page that allows the coach to see the coach specific pages. A coach can can see the teams data.

## LoginDashboard_p.jsx
#### A page that allows the participant to see the participant specific pages. A participant can only see their own data.

## ManageDatabase.jsx
#### A page that allows the user to manage the database. Currently only able to remove form/table in database.

## NotFound.jsx
#### A page that displays a 404 error.

## Policy.js
#### A page that displays the privacy policy.

## Terms.js
#### A page that displays the terms of service. Currently showing a dummy page.

## Login.js
#### A page that allows the user to login. The user can login with google to then be directed to correct page.

## App.js
#### The main file of the web app. Contains the routing for the web app. And the path to views.js, which cointains the routing for every page of the web app.

## views.jsx
#### Contains the routing for every page of the web app. Here you can change as a developer if you want to see the webapp in admin, coach or participant mode.

## App.test.js


## reportWebVitals.js

## setupTests.js
#### A page that allows the user to setup the tests.






