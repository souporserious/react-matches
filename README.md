## React Matches 🔥

[![npm version](https://badge.fury.io/js/react-matches.svg)](https://badge.fury.io/js/react-matches)
[![Dependency Status](https://david-dm.org/souporserious/react-matches.svg)](https://david-dm.org/souporserious/react-matches)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Simple helper components to make responsive design easier in React.

## Install

`yarn add react-matches`

`npm install react-matches --save`

## Example Usage

```js
import { Media, Container } from 'react-matches'

const queries = {
  sm: {
    maxWidth: 400
  },
  md: {
    minWidth: 600
  },
  lg: {
    minWidth: 960
  }
}

const ResponsiveMediaComponent = () => (
  <Media queries={queries}>
    {({ matches, resolve }) =>
      <Row>
        <Column size={resolve({ sm: 12, md: 6, lg: 4 })}>
         ...
        <Column size={resolve({ sm: 12, md: 6, lg: 4 })}>
        <Column>
         ,,,
        </Column>
      </Row>
    }
  <Media>
)

const ResponsiveContainerComponent = () => (
  <Container
    tag="div"
    queries={{ fullWidth: minWidth: 600 }}
  >
    {({ matches, resolve }) =>
      <Flex row={matches.fullWidth}>
        <Input
          style={
            matches.fullWidth
              ? { marginRight: 8 }
              : { marginBottom: 8 }
          }
        />
        <Submit>
      </Flex>
    }
  <Container>
)
```

## `Media`

#### `queries`: PropTypes.object

Pass any valid query that you can pass to [json2mq](https://github.com/akiran/json2mq/blob/master/README.md#usage).

#### `onUpdate`: PropTypes.func

A prop callback that fires when a query has changed.

#### `children`: PropTypes.func

Children must be a function. It returns the following back:

  ```js
  {
    matches, // an object matching your queries shape with active queries
    resolve // an easier way to work with multiple boolean operations
  }
  ```

## `Container`

#### `tag`: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])

The tag to render. Pass any regular element props along with this. If set to false a `containerRef` function will be passed down that must be placed on an element ref.

#### `queries`: PropTypes.object

An object of queries using `{ minWidth, maxWidth, minHeight, maxHeight }`.

```js
{
  sm: { maxWidth: 399 },
  md: { minWidth: 400 },
  lg: { minWidth: 800, maxWidth: 1200 },
}
```

#### `onUpdate`: PropTypes.func

A prop callback that fires when a query has changed.

#### `children`: PropTypes.func

Children must be a function. It returns the following back:

  ```js
  {
    containerRef, // if tag is false, you mush pass the containerRef down to the component you want measured
    matches, // an object matching your queries shape with active queries
    resolve // an easier way to work with multiple boolean operations
  }
  ```

## Running Locally

clone repo

`git clone git@github.com:souporserious/react-matches.git`

move into folder

`cd ~/react-matches`

install dependencies

`yarn`

run dev mode

`yarn dev`

open your browser and visit: `http://localhost:8080/`

## Thank You

Huge thank you to [Daiwei Lu](https://github.com/d6u/react-container-query) and [Michael Jackson](https://github.com/ReactTraining/react-media/). Most of the code in here is heavily inspired by what they have done.
