/**
 * The open-source projects AntiBot builds on, with the licence text shown in the settings.
 * Keep this list in step with AntiBot.csproj and UserInterface/package.json.
 */
export interface Attribution {
    name: string;
    version: string;
    license: string;
    text: string;
}

const MIT = `MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

const APACHE = `Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`;

const OFL = `SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply to any
document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining a
copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the conditions of the full SIL Open Font License,
available at http://scripts.sil.org/OFL.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF
COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT.`;

const entry = (name: string, version: string, license: string, text: string): Attribution => ({
    name,
    version,
    license,
    text,
});

export const ATTRIBUTIONS: Attribution[] = [
    entry("Photino.NET", "4.0.16", "Apache-2.0", APACHE),
    entry("PhotinoNETUtils", "local", "MIT", MIT),
    entry("Microsoft.Data.Sqlite", "10.0.14", "MIT", MIT),
    entry("Microsoft.Extensions.FileProviders.Embedded", "10.0.14", "MIT", MIT),
    entry("Serilog", "4.4.0", "Apache-2.0", APACHE),
    entry("Serilog.Sinks.Console", "6.1.1", "Apache-2.0", APACHE),
    entry("Serilog.Sinks.File", "7.0.0", "Apache-2.0", APACHE),
    entry("QRCoder", "1.6.0", "MIT", MIT),
    entry("JetBrains.Annotations", "2026.2.0", "MIT", MIT),
    entry("securifybv.ShellLink", "0.1.0", "MIT", MIT),
    entry("System.Security.Cryptography.ProtectedData", "10.0.14", "MIT", MIT),
    entry("@fontsource/inter", "5.3.0", "OFL-1.1", OFL),
    entry("@fontsource/jetbrains-mono", "5.3.0", "OFL-1.1", OFL),
    entry("@photino-net-utils/bridge", "0.8.2", "MIT", MIT),
    entry("react", "19.3.1", "MIT", MIT),
    entry("react-dom", "19.3.1", "MIT", MIT),
    entry("styled-components", "6.6.0", "MIT", MIT),
    entry("sass", "1.106.1", "MIT", MIT),
    entry("typescript", "7.0.2", "Apache-2.0", APACHE),
    entry("vite", "8.3.5", "MIT", MIT),
    entry("@vitejs/plugin-react", "6.1.2", "MIT", MIT),
    entry("vite-plugin-svgr", "5.2.0", "MIT", MIT),
    entry("@types/node", "26.6.5", "MIT", MIT),
    entry("@types/react", "19.3.0", "MIT", MIT),
    entry("@types/react-dom", "19.3.0", "MIT", MIT),
    entry("npm-check-updates", "23.1.1", "Apache-2.0", APACHE),
];
