/*
Weather symbols from:
https://github.com/schachmat/wego/blob/master/frontends/ascii-art-table.go
Copyright (c) 2014-2017, teichm@in.tum.de
Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
*/

'use strict';

const ansiEscapes = require('ansi-escapes');

const WeatherIcons = {
    'clear_sky': [
        '\x1B[38;5;226m    \\   /    \x1B[0m',
        '\x1B[38;5;226m     .-.     \x1B[0m',
        '\x1B[38;5;226m  ‒ (   ) ‒  \x1B[0m',
        '\x1B[38;5;226m     `-᾿     \x1B[0m',
        '\x1B[38;5;226m    /   \\    \x1B[0m'
    ],
    'light_cloud': [
        '\x1B[38;5;226m   \\  /\x1B[0m      ',
        '\x1B[38;5;226m _ /\'\'\x1B[38;5;250m.-.    \x1B[0m',
        '\x1B[38;5;226m   \\_\x1B[38;5;250m(   ).  \x1B[0m',
        '\x1B[38;5;226m   /\x1B[38;5;250m(___(__) \x1B[0m',
        '             '
    ],
    'heavy_cloud': [
    '             ',
    '\x1B[38;5;250m     .--.    \x1B[0m',
    '\x1B[38;5;250m  .-(    ).  \x1B[0m',
    '\x1B[38;5;250m (___.__)__) \x1B[0m',
    '             '
    ],
    'shower': [
    '\x1B[38;5;226m _`/\'\'\x1B[38;5;250m.-.    \x1B[0m',
    '\x1B[38;5;226m  ,\\_\x1B[38;5;250m(   ).  \x1B[0m',
    '\x1B[38;5;226m   /\x1B[38;5;250m(___(__) \x1B[0m',
    '\x1B[38;5;111m     ʻ ʻ ʻ ʻ \x1B[0m',
    '\x1B[38;5;111m    ʻ ʻ ʻ ʻ  \x1B[0m'
    ],
    'light_rain': [
    '\x1B[38;5;250m     .-.     \x1B[0m',
    '\x1B[38;5;250m    (   ).   \x1B[0m',
    '\x1B[38;5;250m   (___(__)  \x1B[0m',
    '\x1B[38;5;111m    ʻ ʻ ʻ ʻ  \x1B[0m',
    '\x1B[38;5;111m   ʻ ʻ ʻ ʻ   \x1B[0m'
    ],
    'heavy_rain': [
    '\x1B[38;5;240;1m     .-.     \x1B[0m',
    '\x1B[38;5;240;1m    (   ).   \x1B[0m',
    '\x1B[38;5;240;1m   (___(__)  \x1B[0m',
    '\x1B[38;5;21;1m  ‚ʻ‚ʻ‚ʻ‚ʻ   \x1B[0m',
    '\x1B[38;5;21;1m  ‚ʻ‚ʻ‚ʻ‚ʻ   \x1B[0m'
    ],
    'thunderstorm': [
    '\x1B[38;5;240;1m     .-.     \x1B[0m',
    '\x1B[38;5;240;1m    (   ).   \x1B[0m',
    '\x1B[38;5;240;1m   (___(__)  \x1B[0m',
    '\x1B[38;5;21;1m  ‚ʻ\x1B[38;5;228;5m⚡\x1B[38;5;21;25mʻ‚\x1B[38;5;228;5m⚡\x1B[38;5;21;25m‚ʻ   \x1B[0m',
    '\x1B[38;5;21;1m  ‚ʻ‚ʻ\x1B[38;5;228;5m⚡\x1B[38;5;21;25mʻ‚ʻ   \x1B[0m'
    ],
    'snow': [
        '\x1B[38;5;240;1m     .-.     \x1B[0m',
        '\x1B[38;5;240;1m    (   ).   \x1B[0m',
        '\x1B[38;5;240;1m   (___(__)  \x1B[0m',
        '\x1B[38;5;255;1m   * * * *   \x1B[0m',
        '\x1B[38;5;255;1m  * * * *    \x1B[0m'
    ]
}

module.exports = {
    WeatherIcons
}