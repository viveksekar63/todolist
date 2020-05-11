# todolist
Features
--------

- Creation of todo list 
- Deletion of todo list
- patch of todo list

Prerequisites
-------------

- [MongoDB](https://www.mongodb.com/download-center/community)
- [Node.js 10+](http://nodejs.org)

Getting Started
---------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://github.com/viveksekar63/todolist.git todolist

# Change directory
cd todolist

# Install NPM dependencies
npm install

# Then simply start your app
node app.js
```

**Warning:** Currently it is running in 3001 port, If already 3001 port has been used. Find the below steps to overcome.
**Kill 3001 process Id:**
    sudo kill -9 $(sudo lsof -t -i:3001)
    node app.js

**Run in Different Port**
    Change Port in .env file.

