# K3H Health Studio

## Quickbar

https://trello.com/b/p2LSsdIw/projekt-i-systemteknik

https://www.figma.com/file/SEQnpyUGgkIsYSH9ZHfZpy/Untitled?node-id=1%3A2&t=qcgGlTfFMGiMnTU7-1

https://docs.google.com/spreadsheets/d/1A71pdULP74vXl7q310uMCRC2WnlqLa_422mEqzRx7qQ/edit#gid=215556197


## Node JS SQLITE

docs: https://github.com/TryGhost/node-sqlite3/wiki/API

## Docker

Run:
"docker build -t docker-name ."
to build you image. After which you run:
"docker run -dp 3000:3000 docker-name"
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Future features and improvements

This section contains improvement ideas and potential new feutures for the web app

### Improvements 
- Styling and CSS for every page
- The footer should not block any information on the page, it should be fixed to the bottom of the page
- Error handling on excel upload (DoTestExcel.js), now it gives error message when the column names are in the wrong order, but it sends the data correct to database. And more.
- Overall resposiveness and feedack of website. ex. If a form is removed the website should update directly and not have to be refreshed.
- Enable choosing data from more than one form in data.js
- Add to the analysis.jsx page, enable choosing data and form to be analyzed in graphs
- If email is missing in excel file the user should be able to add it in doTestExcel.js
- Improve overall security and gdpr-handling
- Possibly fix own login function instead of using google gmail
- Enable editing of forms and data
- Enable having accepted interval in the forms data, remove extreme values, for example not accept a weight of 2000kg in benchpress



### New features
