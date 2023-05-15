# Table of Contents
-API
--addIntoTable.js
--addTable.js
--addUser.js
--deleteUser.js
--dropTable.js
--getCoachData.js
--getColumns.js
--getData.js
--getForm.js
--getForms.js
--getTeam.js
--getTeamMembers.js
--getTeamStatus.js
--getUser.js
--getUserData.js
--getUsers.js
--getUserType.js
--index.js
-Server.js
# API
## addIntoTable.js
This function will try to add a new data into a table in the database.

### Expects 
#### POST
Example of contents
```
{
	"name":"user",
	"fields" :["id", "email", "firstName","lastName"]
    "values" : ["1", "a@b.s", "a", "b"]

}
```
### Returns
#### 200
```
{
    "message": "success"
}
```
You will get this message if the data is successfully added into the table
#### 400
```
{
    "message": "Bad request"
}
```
You will get this error if you do not provide the correct data type for the column
#### 500
```
{
    "message": "Internal server error"
}
```
You will get this error if there is an error in the database
or server side.

## addTable.js
This function will try to add a new table into the database with the given name, columns and types.

### Expects
#### POST
Example contents
```
{
    "name":"user",
    "fields" :["id", "email", "firstName","lastName"]
    "types" : ["int", "varchar(255)", "varchar(255)","varchar(255)"]

}
```

### Returns
#### 200
```
{
    "message": "success"
}
```
You will get this message if the table is successfully added into the database
#### 400
```
{
    "message": "Bad request"
}
```
You will get this error if you do not provide the correct data type for the column
#### 500
```
{
    "message": "Internal server error"
}
```
You will get this error if there is an error in the database or server side.
## addUser.js
This function will try to add a new user into the database with the given email, password, first name, last name, and user type.

### Expects
#### POST

### Returns
#### 200
```
{
    "message": "success"
}
```
You will get this message if the user is successfully added into the database
#### 400
```
{
    "message": "Bad request"
}
```
You will get this error if you do not provide the correct data type for the column
#### 500
```
{
    "message": "Internal server error"
}
```
You will get this error if there is an error in the database or server side.

## deleteUser.js
This function will try to delete a user from the whole database with the given email
### Expects
#### DELETE
Example contents
```
{
    "email":"a@b.se"
}
```
### Returns
#### 200
```
{
    "message": "success"
}
```
You will get this message if the user is successfully deleted from the database
#### 400
```
{
    "message": "Bad request"
}
```
You will get this error if you do not provide an email
#### 500
```
{
    "message": "Internal server error"
}
```
You will get this error if there is an error in the database or server side.

## dropTable.js
This function will try to drop a table from the database with the given name.
### Expects
#### DELETE
Example contents
```
{
    "name":"Team"
}
```
### Returns
#### 200
```
{
    "message": "success"
}
```
You will get this message if the table is successfully dropped from the database
#### 400
```
{
    "message": "Bad request"
}
```
You will get this error if you do not provide a table name
#### 500
```
{
    "message": "Internal server error"
}
```
You will get this error if there is an error in the database or server side.

## getCoachData.js
This function will try to get all the data the coach is allowed to have from the database. I,e the data from the team.
### Expects
#### POST
Example contents
```
{
   "names": [
       {
           "tableName": "foo"
           "columnName": "bar"
       },
   ],
   "teamName": "foo"
}
```
### Returns
#### 200
```
{
    [
        {
            "foo": Value
        }*
    ]
}
```
You will get this message if the data is successfully retrieved from the database. Where * is the number of rows in the table that matches the query.
#### 400
```
{
    "message": "Bad request"
}
```
You will get this error if you do not provide the team or the names of the columns you want to retrieve.
#### 500
```
{
    "message": "Internal server error"
}
```
You will get this error if there is an error in the database or server side.
## getColumns.js
This function will try to get all the columns from a table in the database.
### Expects
#### POST
Example contents
```
{
    "name":"user"
}
```
### Returns
#### 200
```
{
    "fields": ["id", "email", "firstName","lastName",accountType],
    "types": ["varchar(30)", "varchar(255)", "varchar(255)","varchar(255)","varchar(255)"]
}
```
You will get this message if the columns are successfully retrieved from the database.
#### 400
```
{
    "message": "Bad request"
}
```
You will get this error if you do not provide the table name.
#### 500
```
{
    "message": "Internal server error"
}
```
You will get this error if there is an error in the database or server side.

## getData.js
This function will try to get the specified data from a table in the database.
### Expects
#### POST
Example contents
```
{
    "names": [
        {
            "tableName": "foo"
            "columnName": "bar"
        },
    ],
}
```
### Returns
#### 200
```
{
    [
        {
            "foo": Value
        }*
    ]
}
```
You will get this message if the data is successfully retrieved from the database. Where * is the number of rows in the table that matches the query.
#### 400
```
{
    "message": "Bad request"
}
```
You will get this error if you do not provide the names of the columns you want to retrieve.
#### 500
```
{
    "message": "Internal server error"
}
```
You will get this error if there is an error in the database or server side.

## getForm.js
This function will try to get the specified form from the database.
### Expects
#### POST
Example contents
```
{
    "name":"user"
}
```
### Returns
#### 200
```
{
    [
        {
            "id": "1",
            "email": "a@b.se",
            "firstName": "a",
            "lastName": "b",
            "accountType": "coach"
        }*
    ]
}
```
You will get this message if the form is successfully retrieved from the database. Where * is the number of rows in the table that matches the query.
#### 400
```
{
    "message": "Bad request"
}
```
You will get this error if you do not provide the table name.
#### 500
```
{
    "message": "Internal server error"
}
```
You will get this error if there is an error in the database or server side.

## getForms.js
This function will try to get all the forms from the database.
### Expects
#### GET
Example contents
```
{

}
```
### Returns
#### 200
```
{
    [
        {
            "name": "user",
        }*
    ]
}
```
You will get this message if the forms are successfully retrieved from the database. Where * is the number of rows in the table that matches the query.
#### 400
```
{
    "message": "Bad request"
}
```
You will get this error if you do not provide the table name.
#### 500
```
{
    "message": "Internal server error"
}
```
You will get this error if there is an error in the database or server side.

## getTeam.js
This function will try to get the team based on the email of the user from the database.
### Expects
#### POST
Example contents
```
{
    "email": "a@b.se"
}
```
### Returns
#### 200
```
{
    [
        {
            "name": "team1" 
        }*
    ]
}
```
### 400
```
{
    "message": "Bad request"
}
```
You will get this error if you do not provide the email of the user.
### 500
```
{
    "message": "Internal server error"
}
```
You will get this error if there is an error in the database or server side.

## getTeamMembers.js
This function will try to get all the members of a team from the database.

### Expects
#### POST
Example contents
```
{
    "teamName": "team1"
}
```
### Returns
#### 200
```
{
    [
        {
            "id": "1",
            "email": "a@b.se"
            "firstName": "a",
            "lastName": "b",
            "accountType": "coach"
            "name": "team1"
        }*
    ]
}
```
You will get this message if the members are successfully retrieved from the database. Where * is the number of rows in the table that matches the query.
#### 400
```
{
    "message": "Bad request"
}
```
You will get this error if you do not provide the team name.
#### 500
```
{
    "message": "Internal server error"
}
```
You will get this error if there is an error in the database or server side.
## getTeamStatus.js
This function will try to get the status of a team from the database. Meaning the id, type, name and where to find more information on the player.
### Expects
#### POST
Example contents
```
{
    "teamName": "team1"
    "teamWhere": Name*
}
* = Optional and if it doesn't not exist it will return all the players in the team.
```
### Returns
#### 200
```
{
    [
        {
            "id": "1",
            "type": "user",
            "name": "a b",
            "link": "/id"
        }*
    ]
}
```
You will get this message if the status is successfully retrieved from the database. Where * is the number of rows in the table that matches the query.
#### 400
```
{
    "message": "Bad request"
}
```
You will get this error if you do not provide the team name.
#### 500
```
{
    "message": "Internal server error"
}
```
You will get this error if there is an error in the database or server side.
## getUser.js
This function will try to get a user from the database with the given email.
### Expects
#### POST
Example contents
```
{
    "email":"a@b.se"
}
```
### Returns
#### 200
```
{
    {
        "id": "1",
        "email": "a@b.se"
        "firstName": "a",
        "lastName": "b",
        "accountType": "coach"
    }
}
```
You will get this message if the user is successfully retrieved from the database.
#### 400
```
{
    "message": "Bad request"
}
```
You will get this error if you do not provide the email of the user.
#### 500
```
{
    "message": "Internal server error"
}
```
You will get this error if there is an error in the database or server side.
## getUserData.js
This function will get data related to the user from the database. I,e the data the is allowed to get from the database.
### Expects
#### POST
Example contents
```
{
    "names": [
        {
            "tableName": "foo"
            "columnName": "bar"
        },
    ],
    "teamEmail": "a@b.se"
}
```
### Returns
#### 200
```
{
    [
        {
            "foo": Value
        }*
    ]
}
```
You will get this message if the data is successfully retrieved from the database. Where * is the number of rows in the table that matches the query.
#### 400
```
{
    "message": "Bad request"
}
```
You will get this error if you do not provide the email or the names of the columns you want to retrieve.
#### 500
```
{
    "message": "Internal server error"
}
```
You will get this error if there is an error in the database or server side.

## getUsers.js
This function will try to get all the users from the database.
### Expects
#### GET
Example contents
```
{

}
```
### Returns
#### 200
```
{
    [
        {
            "id": "1",
            "email": "
            "firstName": "a",
            "lastName": "b",
            "accountType": "coach"
        }*
    ]
}
```
## getUserType.js
This function will try to get the type of a user from the database.
### Expects
#### POST
Example contents
```
{
    "email":"a@b.se"
}
```
### Returns
#### 200
```
{
    {
        "accountType": "coach"
    }
}
```
You will get this message if the type is successfully retrieved from the database.
#### 400
```
{
    "message": "Bad request"
}
```
You will get this error if you do not provide the email of the user.
#### 500
```
{
    "message": "Internal server error"
}
```
You will get this error if there is an error in the database or server side.
## index.js
This file is the main file for the api. It will handle where the api functions are located. 
# Server.js
This file is the main file for the server. It will handle all the requests and send them to the correct function. As well as have control over the database. Starup, shutdown, etc.
