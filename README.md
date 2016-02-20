Web Scaffold
============

This project has been created to bridge Python and JavaScript for web development. This scaffold project will likely be used as the basis for some web projects going forward.

How to Run
----------

Firstly, make sure you have Node 5.6+, npm and Python 3.5+ installed. You should probably be using [nvm](https://github.com/creationix/nvm "Node Version Manager") for this. If you're on Windows, I'm sorry, you're on your own.

The following commands are required to install dependencies:

```bash
npm install
python3 -m pip install -r requirements.txt

```

To run, do

```bash
npm start
```


How It Works
------------

Build tasks and server management are taken care of in the `gulpfile.babel.js`.
`npm start` firstly packages and bundles some assets. The Python-based Tornado web server is then spawned.
The Python web server takes care of handling all requests, including static assets, a content API any extra server handlers defined. In addition to this, any other routes are fed into a spawned Node process. This process will return it's output in JSON format, which the Python server then interprets and returns to the user.

Why?
----

Why not? There are many reasons why not to do this, including significant inefficiencies, however, this project does bring together the power of Python with the benefits of a universal JavaScript app.
It is very much a learning experience, but I think it will be useful going forward.
