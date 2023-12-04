# Issue Tracker

This repository will help you track issues if you are building any project.

---
## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environment.

### DB Validations
- #### User
  Name is required with length 3
  Gender is required with "Male, Female, or Other" values only
  A valid email id required
  password is required

- #### Projects
  Name is required with length 1
  Description is required with length 2

- #### Issues
  Title is required with length 1
  Description is required with length 2
  labels - at least one is required

  The app is hosted on render with URL `https://issuetracker-efyj.onrender.com/` failing to follow the validations rule will crash the applications since I didn't work on handling the validations on server but the errors will be printed in console.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm` or manage the version using nvm! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

---

## Install

    $ git clone https://github.com/manigupta50/IssueTracker/
    $ cd IssueTracker
    $ npm install

## Configure app

Create a .env file `/.env` then edit it with a few mentions. You will need:

- MongoDB connection, store the path in a `DB_URL` variable;

## Running the project

    $ npm start or node server or node server.js