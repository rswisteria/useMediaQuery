# useMediaQuery

`useMediaQuery` hook tracks state of current CSS media query.

## Hook

### Arguments

`mediaQueryList: Array<string>`: The lists of css media query string.

### Returns

`string`: The current css media query string which is selected from passed arguments.

## Example

```jsx
import { useMemo } from 'react'
import 'useMediaQuery' from './useMediaQuery'

const QUERY_SP = "(max-width: 767px)"
const QUERY_PC = "(min-width: 768px)"

const Comp = (props) => {
  const query = useMediaQuery([QUERY_SP, QUERY_PC])
  const text = useMemo(() => {
    switch(query) {
      case QUERY_SP:
        return "Smartphone"
      case QUERY_PC:
        return "PC"
    }
  }, [query])

  return <span>Current media is {text}.</span>
}

export default Comp
```