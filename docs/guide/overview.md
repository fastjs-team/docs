# Overview

::: tip About this page
This page is for quick overview of `jsfast` modules. For more detailed information, please read the API Reference and each module's documentation.
::: 

Overview all the modules in `jsfast` here.

## Modules

### Array

Fastjs Array provides runtime checking for JavaScript arrays, unexpected type error reporting, and more.

#### Why we need it

JavaScript is a dynamic language, which means that the type of a variable is not fixed. This is a good thing, but it also brings some problems.

Fastjs Array provides a clear output of the error message when the type of the array is not as expected, which is very helpful for debugging.

### Date

Fastjs Date is the simplest date library for parsing, formatting dates.

#### Why we need it

JavaScript's built-in `Date` object is very powerful, but it is not easy to use. Fastjs Date provides a simple way to parse and format dates.

We already have a lot of date libraries, but they are too complicated. Fastjs Date is designed to be simple and easy to use.

Also, it provides a lot of methods to manipulate dates, like:
- Get the current date with a specific format
- Get a specific format date from a timestamp
- Get the Date object from a specific format string
- Reformat a date string
- And more...

### DOM

Fastjs DOM is a DOM manipulation library with built-in support for selectors, events, and more.

#### Why we need it

Fastjs DOM is designed to be simple and easy to use. It provides a lot of methods to manipulate DOM, let's see some examples:

##### Task Queue

In fastjs, we have a new word called `task queue`.

It let 

##### Built-in api vs Fastjs DOM

Add event listener:

```js
// Built-in api
const btn = document.querySelector('.btn')
btn.addEventListener('click', () => {
    // do something
});
// ...

// Fastjs DOM
const btn = dom.selector('.btn').on('click', () => {
    // do something
});
// ...
```

Create element:

```js
// Built-in api
const btn = document.createElement('button')
btn.classList.add('btn')
btn.innerText = 'Click me!'
document.body.appendChild(btn)

// Fastjs DOM
dom.newEl('button', {
    class: ['btn']
}).text('Click me!').push()

// Other possible ways in Fastjs DOM
dom.newEl('button')
    .addClass('btn')
    .text('Click me!')
    .push()
```

### Request

Fastjs Request is a powerful HTTP request library with built-in support for parsing and formatting URLs, handling global hooks, and more.

#### Why we need it

Fastjs Request is designed to be simple and easy to use. It provides a lot of powerful features, let's see some examples:
- Global hooks
- In-class hooks
- Request time control
- Auto retry
- And more...

### Utils

Fastjs Utils is a utility functions library for common tasks.