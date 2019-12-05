# react-native-auto-placeholder-loading

## Getting started

```bash
$ npm i react-native-auto-placeholder-loading --save
```

or

```bash
$ yarn add react-native-auto-placeholder-loading
```


## Usage
```javascript
import { Text, View } from 'react-native';
import AutoPlaceholderLoading from 'react-native-auto-placeholder-loading';

const App = () => (
  <AutoPlaceholderLoading loading={isFetched}>
	  <View>
	  		<Text>Hello World</Text>
	  </View>
  </AutoPlaceholderLoading>
);
```
