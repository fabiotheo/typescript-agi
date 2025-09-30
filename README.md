# typescript-agi-ipcom

![Version](https://img.shields.io/badge/version-0.0.8-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/ipcomtelecom/typescript-agi-ipcom/blob/master/LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/ipcomtelecom/typescript-agi-ipcom/graphs/commit-activity)

[![NPM](https://nodei.co/npm/typescript-agi-ipcom.png?downloads=true&stars=true)](https://nodei.co/npm/typescript-agi-ipcom/)

> Enhanced TypeScript library for Asterisk AGI (Asterisk Gateway Interface) with production-ready improvements

This is a fork of [typescript-agi](https://github.com/brandonlehmann/typescript-agi) with significant reliability and functionality enhancements for production environments.

## Features

- **Production-Ready FIFO Command Queue**: Eliminates race conditions through sequential command processing
- **Intelligent Timeout System**: Context-aware timeouts (10 seconds to 6 hours) based on command type
- **Inter-Digit Timeout Support**: Enhanced `getData()` with configurable delays between digit inputs
- **Queue Management APIs**: Monitor and control command queue with `getQueueStats()` and `clearCommandQueue()`
- **Comprehensive Event System**: New events for command lifecycle tracking
- **Backpressure Control**: Configurable queue limits (default: 100 commands) prevent memory exhaustion
- **Channel Lifecycle Management**: `channelAlive` flag ensures proper connection state tracking
- **TypeScript Support**: Full type definitions with ESM and CommonJS outputs

## Installation

```sh
npm install typescript-agi-ipcom
```

## Quick Start

### Basic Usage

```typescript
import { AGIServer, Channel } from 'typescript-agi-ipcom';

const agiServer = new AGIServer(3000, '0.0.0.0');

agiServer.on('channel', async (channel: Channel) => {
    try {
        await channel.answer();
        await channel.sayNumber(12345);
        await channel.hangup();
    } catch (error) {
        console.error('Error handling channel:', error);
    }
});

agiServer.start();
```

## Advanced Features

### Inter-Digit Timeout for DTMF Collection

Collect multi-digit input with configurable inter-digit timeout:

```typescript
agiServer.on('channel', async (channel: Channel) => {
    await channel.answer();

    // Collect up to 4 digits with 3-second timeout between digits
    // Total timeout: 10 seconds after audio finishes
    const result = await channel.getData(
        'enter-account-number',  // audio file
        10000,                   // total timeout (10s)
        4,                       // max digits
        3000                     // inter-digit timeout (3s)
    );

    if (result.timeout) {
        await channel.streamFile('timeout');
    } else {
        await channel.verbose(`Collected: ${result.digits}`);
    }
});
```

### Custom Command Timeouts

Override default timeouts for long-running operations:

```typescript
// Execute Dial with custom 2-hour timeout
await channel.exec(
    'Dial',
    'PJSIP/user@trunk,3600,tT',
    7200000  // 2 hours in milliseconds
);

// Use Infinity for no timeout (relies on channelAlive flag)
await channel.exec('Queue', 'support,,,,,', Infinity);
```

### Queue Monitoring

Monitor command queue health in real-time:

```typescript
channel.on('commandQueued', ({ command, queueSize }) => {
    console.log(`Queued: ${command}, Queue size: ${queueSize}`);
});

channel.on('commandProcessed', ({ command, duration }) => {
    console.log(`Processed: ${command} in ${duration}ms`);
});

channel.on('commandFailed', ({ command, error }) => {
    console.error(`Failed: ${command}`, error);
});

// Get current queue statistics
const stats = channel.getQueueStats();
console.log(`Queue: ${stats.size}, Processing: ${stats.isProcessing}`);
```

## Intelligent Timeout System

Commands automatically use appropriate timeouts based on their type:

| Command Type | Default Timeout | Examples |
|-------------|-----------------|----------|
| Fast commands | 10 seconds | ANSWER, HANGUP, GET/SET VARIABLE, DATABASE |
| Audio commands | 60 seconds | STREAM FILE, SAY, GET DATA, GET OPTION |
| Recording | 10 minutes | RECORD FILE |
| Call control | 6 hours | EXEC (Dial, Queue, VoiceMail) |

You can override any timeout by passing a custom value to methods that support it.

## Event System

### AGIServer Events

- `channel`: New channel ready for interaction
- `listening`: Server started successfully
- `error`: Server error occurred
- `close`: Server stopped

### Channel Events

Standard events:
- `ready`: Channel initialized and ready for commands
- `send`: Data sent to Asterisk
- `recv`: Raw response received from Asterisk
- `response`: Parsed response object
- `hangup`: Call hung up
- `close`: Socket closed
- `error`: Socket error
- `timeout`: Socket timeout

Queue management events:
- `commandQueued`: Command added to queue
- `commandProcessed`: Command completed successfully
- `commandFailed`: Command execution failed
- `queueEmpty`: All commands processed
- `queueCleared`: Queue manually or automatically cleared

## API Documentation

Full API documentation is available in the [TypeDoc documentation](https://ipcomtelecom.github.io/typescript-agi-ipcom/).

### Core Classes

- **AGIServer**: TCP server that listens for AGI connections from Asterisk
- **Channel**: Represents an active AGI channel with full protocol support
- **ChannelState**: Enum for channel states (DOWN_AVAILABLE, OFF_HOOK, UP, etc.)
- **DialStatus**: Enum for Dial() results (ANSWER, BUSY, NOANSWER, etc.)
- **PlaybackStatus**: Enum for playback results (SUCCESS, USER_STOPPED, etc.)

## Improvements Over Original

This fork includes the following enhancements:

1. **FIFO Command Queue**: Original had race condition issues with concurrent commands receiving wrong responses. Now uses sequential queue processing.

2. **Intelligent Timeouts**: Original used fixed 10-second timeout for all commands. Now uses context-aware timeouts (10s - 6 hours) based on command type.

3. **Inter-Digit Timeout**: Original `getData()` couldn't handle digit-by-digit collection with delays. New implementation supports configurable inter-digit timeouts.

4. **Production Reliability**:
   - Backpressure control (queue size limits)
   - Channel lifecycle tracking (`channelAlive` flag)
   - Proper cleanup on hangup/close
   - Comprehensive error handling

5. **Queue Management**: New APIs for monitoring and controlling the command queue (`getQueueStats()`, `clearCommandQueue()`).

6. **Enhanced Events**: Additional events for command lifecycle tracking and queue management.

## Build from Source

```sh
# Install dependencies
npm install

# Build ESM, CommonJS, and type definitions
npm run build

# Generate TypeDoc documentation
npm run docs
```

## Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](https://github.com/ipcomtelecom/typescript-agi-ipcom/issues).

## Authors

**Current Maintainer:**
- Fabio Theodoro <fabio@ipcom.com.br>
- GitHub: [@ipcomtelecom](https://github.com/ipcomtelecom)
- Company: [IPCOM](https://ipcom.com.br)

**Original Author:**
- Brandon Lehmann <brandonlehmann@gmail.com>
- GitHub: [@brandonlehmann](https://github.com/brandonlehmann)
- Original project: [typescript-agi](https://github.com/brandonlehmann/typescript-agi)

## License

Copyright 2020 Brandon Lehmann (original work)
Copyright 2025 Fabio Theodoro / IPCOM (enhancements)

This project is [MIT](https://github.com/ipcomtelecom/typescript-agi-ipcom/blob/master/LICENSE) licensed.

---

## Support

If this project helped you, please consider:
- Starring the repository on [GitHub](https://github.com/ipcomtelecom/typescript-agi-ipcom)
- Reporting issues or suggesting features
- Contributing improvements via pull requests
