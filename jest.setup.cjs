const { TextDecoder, TextEncoder } = require('node:util')

// jsdom does not provide these Node globals that React Router expects.
global.TextDecoder = TextDecoder
global.TextEncoder = TextEncoder

require('@testing-library/jest-dom')
