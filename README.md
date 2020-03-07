## Budget-Tracker:
Create a PWA (Progress Web App) that allows users to keep track of expenses even if they do not have internet access.  

the link to github is shown below:
https://github.com/jlovejo2/Budget-Tracker.git

the link to the functional app is shown below:
https://budget-tracker-jlovejo2.herokuapp.com/

## Table of Contents
* [User Story](#user-story)
* [Version 1.0](#version-1.0)
* [How To Use](#how-to-use)
* [Technologies Used](#technologies-used)
* [NPMs Used](#npms-used)
* [CSS Framework](#css-framework)
* [Structure of Code and Functions](#structure-of-code-and-functions)
* [Known Issues With Code](#known-issues-with-code)

## User Story
As a user I am someone that trys to be very precise with my budget. However, I also like to travel to other countries and go to remote areas where I do not always have consistent access to the internet.  Therefore, I need an app that I can track my budget on that will even work when I do not have access to the internet.

## Version 1.0
* This budget-tracker app runs via heroku or by entering the command "node server.js" to initialize the server the locally.
* It runs on mongoDb when online and offline it uses IndexedDb in the browser to store the information until a connection 
* Make sure you are in the main folder when running the code on the command line.
* This app allows the user to keep track of both expenses and money received.  When the user goes offline the functionality is still maintained.

## How To Use
See the layout of the app below.

* When user first navigates to the budget-tracker app it will render with the Total element at zero at the top.  The green box shows the elements where a name of the transaction and amount can be entered.  Click the desired button:
    - "Add Funds": this button is ideally used as a positive contribution to the total.  Considered to be used when you make a purchase
    - "Subtract Funds": this button is ideally used to take funds away from the total.  Ex: when you find money on the ground or get a refund

*![alt text](/public/assets/images/Layout1.png "Starting page of App") 

- When expense are either added or subtracted to new elements are rendered to the page.  There is a table that keep tracks of the expenses and chart the shows the progression of the funds more visually.
   
*![alt text](/public/assets/images/Layout-with-expenses.png "App with tracked expenses") 

## Technologies Used
* HTML
* CSS
* Javascript
* Node.js
* MongoDB
* IndexedDB

## NPMs Used:
* NPM express
* NPM mongoose
* NPM morgan
* NPM compression

## CSS Framework:
* Bootstrap

## Structure of Code and Functions
* models - is the folder that contains the code files for the mongoose schema
    - transactions.cjs - this file contains the code for the transactions schema
* public folder - contains all the code that is needed to for the browser to run the application
    - assets folder
         - images - contains images for readme and website
        - style.css - is the actual file with most of the css code for the rendered html pages.
        - workout-style.css
    - db.js - contains the code that handles the service worker responses and saves the data to indexedDb in the browser allowing for offline capability.
    - service-worker.js - this is registered in the browser and essentially handles the api requests when the app goes offline.
    - index.js - this code handles the functionality of the app in terms of the buttons, and rendering of values to the table and chart
    - index.html - the one and only page of html for this app
    - manifest.webmanifest - is the json file that is used in conjunction with service-worker.js to create offline functionality
* routes
    - api.js - this javascript file contains the code for the api routes and functionality of the app
* server.js - is the actual file that is run to create application and start server listening.

## Known Issues With Code

