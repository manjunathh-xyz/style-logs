import { stripIndents } from "common-tags";

interface StyleCodes {
    reset: string;
    styles: {
        [key: string]: string;
    };
    fg: {
        [key: string]: string;
    };
    bg: {
        [key: string]: string;
    };
}

const logs: StyleCodes = {
    reset: "\x1b[0m",
    styles: {
        bold: "\x1b[1m",
        dim: "\x1b[2m",
        italic: "\x1b[3m",
        underline: "\x1b[4m",
        blink: "\x1b[5m",
        inverse: "\x1b[7m",
        strikethrough: "\x1b[9m"
    },
    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        gray: "\x1b[90m",
        brightRed: "\x1b[91m",
        brightGreen: "\x1b[92m",
        brightYellow: "\x1b[93m",
        brightBlue: "\x1b[94m",
        brightMagenta: "\x1b[95m",
        brightCyan: "\x1b[96m",
        brightWhite: "\x1b[97m",
        crimson: "\x1b[38;5;196m",
        orange: "\x1b[38;5;208m",
        teal: "\x1b[38;5;6m",
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        gray: "\x1b[100m",
        brightRed: "\x1b[101m",
        brightGreen: "\x1b[102m",
        brightYellow: "\x1b[103m",
        brightBlue: "\x1b[104m",
        brightMagenta: "\x1b[105m",
        brightCyan: "\x1b[106m",
        brightWhite: "\x1b[107m",
        crimson: "\x1b[48;5;196m",
        orange: "\x1b[48;5;208m",
        teal: "\x1b[48;5;6m",
    }
};

export function style(text: string): string {
    const regex = /<text\s*(.*?)>(.*?)<\/text>/gs;
    let result = '';

    const lines = stripIndents(text).split('\n');
    lines.forEach(line => {
        let processedLine = line;
        let match;
        while ((match = regex.exec(line)) !== null) {
            const attributes = match[1].trim();
            const content = match[2];
            let colorCode = logs.reset;

            if (attributes) {
                const attributeRegex = /(f|b|s)-(\w+)/g;
                let attrMatch;
                while ((attrMatch = attributeRegex.exec(attributes)) !== null) {
                    const [, type, styleName] = attrMatch;
                    if (type === 'f' && logs.fg[styleName]) {
                        colorCode += logs.fg[styleName];
                    } else if (type === 'b' && logs.bg[styleName]) {
                        colorCode += logs.bg[styleName];
                    } else if (type === 's' && logs.styles[styleName]) {
                        colorCode += logs.styles[styleName];
                    }
                }
            }

            processedLine = processedLine.replace(match[0], `${colorCode}${content}${logs.reset}`);
        }

        result += processedLine + '\n';
    });

    return result.trim()
};