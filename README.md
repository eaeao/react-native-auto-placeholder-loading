# react-native-auto-placeholder-loading

## Getting started

```bash
$ npm i https://github.com/eaeao/react-native-auto-placeholder-loading.git --save
```

or

```bash
$ yarn add https://github.com/eaeao/react-native-auto-placeholder-loading.git
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
