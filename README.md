Decorator for ReactJS components that saves the old state before it gets updated.

## Installation

```sh
npm install --save old-state
```

## Usage

```js
import React, { Component } from 'react'
import oldState from 'old-state'

@oldState
class SomeComponent extends Component {
  render() {
    let previousState = this.oldState
    let currentState = this.state
    // ...
  }
}

```
