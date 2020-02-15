# Welcome to typescript-agi 👋
![Version](https://img.shields.io/badge/version-0.0.5-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://brandonlehmann.github.io/typescript-agi/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/brandonlehmann/typescript-agi/graphs/commit-activity)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/brandonlehmann/typescript-agi/blob/master/LICENSE)

[![NPM](https://nodei.co/npm/typescript-agi.png?downloads=true&stars=true)](https://nodei.co/npm/typescript-agi/)

> NodeJS TypeScript Library for Asterisk AGI Interfaces

### 🏠 [Homepage](https://brandonlehmann.github.io/typescript-agi/)

## Install

```sh
npm install typescript-agi
```

## Run tests

```sh
npm run test
```

## Example Usage

```typescript
import {
    AGIServer, 
    Channel
} from 'typescript-agi';

const agiServer = new AGIServer();

agiServer.on('channel', async(channel: Channel) => {
    await channel.answer();
    await channel.sayNumber(12345);
    await channel.hangup();
});

agiServer.start();
````

## Documentation

Library documentation is available at [https://brandonlehmann.github.io/typescript-agi/](https://brandonlehmann.github.io/typescript-agi/)

## Author

👤 **Brandon Lehmann <brandonlehmann@gmail.com>**

* Github: [@brandonlehmann](https://github.com/brandonlehmann)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/brandonlehmann/typescript-agi/issues).

## Show your support

Give a ⭐️ if this project helped you!


## 📝 License

Copyright © 2020 [Brandon Lehmann <brandonlehmann@gmail.com>](https://github.com/brandonlehmann).

This project is [MIT](https://github.com/brandonlehmann/typescript-agi/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
