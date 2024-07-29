# Crewdle Mist Wink NLP Connector

## Introduction

The Crewdle Wink NLP Connector is a connector that is used to provide natural language processing functions.

## Getting Started

Before diving in, ensure you have installed the [Crewdle Mist SDK](https://www.npmjs.com/package/@crewdle/web-sdk).

## Installation

```bash
npm install @crewdle/mist-connector-wink-nlp
```

## Usage

```TypeScript
import { WinkNLPConnector } from '@crewdle/mist-connector-wink-nlp';

const sdk = await SDK.getInstance(config.vendorId, config.accessToken, {
  nlpLibraryConnector: WinkNLPConnector,
}, config.secretKey);
```

## Need Help?

Reach out to support@crewdle.com or raise an issue in our repository for any assistance.

## Join Our Community

For an engaging discussion about your specific use cases or to connect with fellow developers, we invite you to join our Discord community. Follow this link to become a part of our vibrant group: [Join us on Discord](https://discord.gg/XJ3scBYX).
