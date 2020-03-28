# Javascript Command Line Interface project

This is an example of a simple command line interface (CLI), written in Javascript, which persists data using a JSON file.

## Run the demo

Run `npm install` then `npm start` to try the CLI.

## How it works

`app.js` loads up an API library which is used to read and write the JSON file `lib/db.json`.

In this example, the API has only 1 resource: "books".

The CLI is displayed to the user using lots of `console.log`s.

It uses a library called `readline-sync` to request user input.

## How to make your own project

### 1: Decide on a topic

Here are some examples to get you thinking:

- Reddit-style posts with comments, upvotes and downvotes
- Movie listings with times, tickets, even seating allocations
- Recipe organisr, users can create recipes and add tags, search through tagged recipes

Feel free to make one of these suggestions or come up with something else.

### 2: Fork

Create a fork of this repo and clone it down to your machine.

### 3: Update your data

Open `lib/db.json` and update the file to use an appropriate data structure for your app.

Some possible data structures for the above suggested topics can be found [here](./data_structures.md).

### 4: Build your app

Open `app.js`, remove all except the first 2 lines of code and start building your CLI!

More realistically, you might want to keep a copy of the current version of `app.js` so you can refer back to it. You could rename it to `app.old.js`.

Go [here](./API_documentation.md) to read about how to use the API.
