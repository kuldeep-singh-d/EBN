# Screen Module Generator

Create screen modules under `src/screens/` following this architecture.
also add in @src/navigation/routes.ts and @src/navigation/index.tsx accordingly

## Structure

```
src/screens/<moduleName>/
  index.tsx       # JSX only
  styles.ts       # StyleSheet hook
  types.ts        # All TS types/interfaces
  use<Module>.ts  # All logic, state, API calls
```

## Templates

### index.tsx

```tsx
import React from 'react';
import { AppContainer } from '@components/containers';
import { AppText } from '@components/common';
import { useScreenName } from './useScreenName';

export const ScreenName = () => {
  const { styles, states, handlers } = useScreenName();

  return (
    <AppContainer title="Screen Name" childStyle={styles.container}>
      <AppText label={'screen_name'} />
    </AppContainer>
  );
};
```

### styles.ts

```ts
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDeviceDimensions } from '@hooks/useDeviceDimensions';

export const useStyles = () => {
  const { colors } = useTheme();
  const { moderateWidth, moderateHeight } = useDeviceDimensions();

  return StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  });
};
```

### types.ts

```ts
export interface ScreenData {
  // screen-specific fields
}
```

### use\<Module\>.ts

```ts
import { useState, useMemo, useCallback } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useStyles } from './styles';

export const useScreenName = () => {
  const styles = useStyles();
  const { colors } = useTheme();
  const navigation: any = useNavigation();

  const [screenData, setScreenData] = useState<any>();

  return {
    styles,
    colors,
    states: { screenData },
    handlers: { setScreenData },
    constants: {},
  };
};
```

## Rules

- `index.tsx`: JSX only — no logic, no inline styles, no API calls
- `styles.ts`: all styles here; use `useTheme` for colors, `useDeviceDimensions` for sizing
- `use<Module>.ts`: all state, effects, API calls, navigation, memos, callbacks
- TypeScript everywhere, no unused imports, no inline JSX functions
- Wrap every screen in `<AppContainer>`

## Modules to Create

| Module |
| ------ |

src/navigations/authorised

`home`
`slips`
`community`
`visitors`
`search`
`notifications`
`profile`
`search`
`search`
