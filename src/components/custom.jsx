import { React, useEffect, useState } from "react";

import Editor, { useMonaco } from '@monaco-editor/react';
import Evaluator from "./evaluator";
import { Typography } from "antd";


function CustomEditor({ variables }) {
    const monaco = useMonaco();
    const [value, setValue] = useState('');

    let functions = ['AND', 'FALSE', 'IF', 'IFERROR', 'IFNA', 'IFS', 'NOT', 'OR', 'SWITCH', 'TRUE', 'XOR', 'DATE', 'DATEDIF', 'DATEVALUE', 'DAY', 'DAYS', 'DAYS360', 'EDATE', 'EOMONTH', 'HOUR', 'ISOWEEKNUM', 'MINUTE', 'MONTH', 'NETWORKDAYS', 'NOW', 'SECOND', 'TIME', 'TIMEVALUE', 'TODAY', 'WEEKDAY', 'WEEKNUM', 'WORKDAY', 'YEAR', 'YEARFRAC', 'ASC', 'BAHTTEXT', 'CHAR', 'CLEAN', 'CODE', 'CONCATENATE', 'DBCS', 'DOLLAR', 'EXACT', 'FIND', 'FIXED', 'LEFT', 'LEN', 'LOWER', 'MID', 'NUMBERVALUE', 'PRONETIC', 'PROPER', 'REPLACE', 'REPT', 'RIGHT', 'SEARCH', 'SUBSTITUTE', 'T', 'TEXT', 'TEXTJOIN', 'TRIM', 'UPPER', 'VALUE',
        'AVEDEV', 'AVERAGE', 'AVERAGEA', 'AVERAGEIF', 'AVERAGEIFS',
        'CORREL', 'COUNT', 'COUNTA', 'COUNTBLANK', 'COUNTIF', 'COUNTIFS',
        'DEVSQ', 'FISHER', 'FISHERINV', 'FORECAST', 'FREQUENCY', 'GAMMA', 'GAMMALN',
        'GAUSS', 'GEOMEAN', 'GROWTH', 'HARMEAN', 'INTERCEPT', 'KURT', 'LARGE', 'LINEST',
        'LOGEST', 'MAX', 'MAXA', 'MAXIFS', 'MEDIAN', 'MIN', 'MINA', 'MINIFS', 'PEARSON',
        'PERMUT', 'PERMUTATIONA', 'PHI', 'PROB', 'ROW', 'RSQ', 'SKEW', 'SLOPE', 'SMALL',
        'STANDARDIZE', 'STDEVA', 'STDEVPA', 'STEYX', 'TREND', 'TRIMMEAN', 'VARA', 'VARPA',
        'ABS', 'ACOS', 'ACOSH', 'ACOT', 'ACOTH', 'AGGREGATE', 'ARABIC', 'ASIN', 'ASINH', 'ATAN',
        'ATAN2', 'ATANH', 'BASE', 'CEILING', 'COMBIN', 'COMBINA', 'COS', 'COSH', 'COT', 'COTH', 'CSC',
        'CSCH', 'DECIMAL', 'DEGREES', 'EVEN', 'EXP', 'FACT', 'FACTDOUBLE', 'FLOOR', 'GCD', 'INT', 'LCM',
        'LN', 'LOG', 'LOG10', 'MMULT', 'MOD', 'MROUND', 'MULTINOMIAL', 'MUNIT', 'ODD', 'PI', 'POWER',
        'PRODUCT', 'QUOTIENT', 'RADIANS', 'RAND', 'RANDBETWEEN', 'ROMAN', 'ROUND', 'ROUNDDOWN', 'ROUNDUP',
        'SEC', 'SECH', 'SERIESSUM', 'SIGN', 'SIN', 'SINH', 'SQRT', 'SQRTPI', 'SUBTOTAL', 'SUM', 'SUMIF', 'SUMIFS',
        'SUMPRODUCT', 'SUMSQ', 'SUMX2MY2', 'SUMX2PY2', 'SUMXMY2', 'TAN', 'TANH', 'TRUNC'];

    useEffect(() => {
        // do conditional chaining
        console.log("value", value);
        monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
        // or make sure that it exists by other ways
        function isMathOperator(word) {
            // List of mathematical operators
            const operators = ['+', '-', '*', '/', '=', '>', '<', '>=', '<=', '==', '!=', '&&', '||', '!', '++', '--', '%', '+=', '-=', '*=', '/=', '(', ')', '{', '}', '[', ']', ',', '.', ':', '?', ';', '+=', '-=', '*=', '/=', '%=', '<<', '>>', '>>>', '&', '|', '^', '~', '>>>', '()', '{}', '[]'];
            return operators.includes(word);
        }
        if (monaco) {
            console.log('here is the monaco instance:', monaco);
            monaco.languages.register({ id: "mySpecialLanguage" });

            // monaco.languages.setMonarchTokensProvider("mySpecialLanguage", {
            //     variables,
            //     functions,
            //     tokenizer: {
            //         root: [
            //             [/\[error.*/, "custom-error"],
            //             [/\[notice.*/, "custom-notice"],
            //             [/\[info.*/, "custom-info"],
            //             [/\[[a-zA-Z 0-9:]+\]/, "custom-date"],
            //             [/@?[a-zA-Z][\w$]*/, {
            //                 cases: {
            //                     '@variables': 'keyword',
            //                     '@functions': 'function',
            //                     '@default': 'variable',
            //                 }
            //             }],
            //             [/[+\-*/=><]/, "custom-operator"],
            //             [/".*?"/, 'string'],
            //             [/\/\//, 'comment'],
            //         ]
            //     },
            // });
            monaco.languages.setMonarchTokensProvider("mySpecialLanguage", {
                variables,
                functions,
                tokenizer: {
                    root: [
                        [/\[error.*/, "custom-error"],
                        [/\[notice.*/, "custom-notice"],
                        [/\[info.*/, "custom-info"],
                        [/\[[a-zA-Z 0-9:]+\]/, "custom-date"],
                        [/@?[a-zA-Z][\w$]*/, {
                            cases: {
                                '@variables': 'keyword',
                                '@functions': 'function',
                                '@default': 'variable',
                            }
                        }],
                        [/[+\-*/=><]/, "custom-operator"],
                        [/".*?"/, 'string'],
                        [/\/\//, 'comment'],
                    ]
                },
                bracket: [
                    ['{', '}'],
                    ['[', ']'],
                    ['(', ')']
                ]
            });
            monaco.languages.setLanguageConfiguration('mySpecialLanguage', {
                autoClosingPairs: [
                    { open: '(', close: ')' },
                    { open: '[', close: ']' },
                    { open: '{', close: '}' },
                    { open: '"', close: '"', notIn: ['string', 'comment'] },
                ],
                autoCloseBrackets: 'always',
                autoIndent: 'full',
                onEnterRules: [
                    {
                        // Indent when pressing Enter after an opening bracket
                        beforeText: /[({[]$/,
                        action: {
                            indentAction: monaco.languages.IndentAction.Indent,
                        }
                    },
                    // Unindent when pressing Enter before a closing bracket
                    {
                        beforeText: /^\s*(\}|\)|\])$/,
                        action: {
                            indentAction: monaco.languages.IndentAction.Outdent,
                        }
                    }
                ]
            });

            monaco.editor.defineTheme("myCoolTheme", {
                base: "vs",
                inherit: false,
                rules: [
                    { token: "custom-info", foreground: "808080" },
                    { token: "custom-error", foreground: "ff0000", fontStyle: "bold" },
                    { token: "custom-notice", foreground: "FFA500" },
                    { token: "custom-date", foreground: "008800" },
                    { token: "keyword", foreground: "0000FF" },
                    { token: "custom-operator", foreground: "ff0000" },
                    { token: "function", foreground: "FFA500", fontStyle: "bold" },
                    { token: "string", foreground: "CE9178" },
                ],
                colors: {
                    "editor.foreground": "#000000",
                }
            });
            monaco.editor.setTheme("myCoolTheme");

            monaco.languages.registerHoverProvider("mySpecialLanguage", {
                provideHover: (model, position) => {
                    const word = model.getWordAtPosition(position);
                    if (word && word.word === "IF") {
                        return {
                            contents: [
                                { value: "**IF Statement**" },
                                { value: "Specifies a logical test to perform." },
                                { value: "Syntax: IF(logical_expression, value_if_true, value_if_false)" }
                            ]
                        };
                    }
                    if (word && word.word == "AND") {
                        return {
                            contents: [
                                { value: "**AND Statement**" },
                                { value: "Returns TRUE if all of its arguments are TRUE.Category: Logical" },
                                { value: "Syntax: AND()" }
                            ]
                        }
                    }

                    if (word && word.word == "FALSE") {
                        return {
                            contents: [
                                { value: "**FALSE Statement**" },
                                { value: "Returns the logical value FALSE.Category: Logical" },
                                { value: "Syntax: FALSE()" }
                            ]
                        }
                    }

                    if (word && word.word == "IF") {
                        return {
                            contents: [
                                { value: "**IF Statement**" },
                                { value: "Specifies a logical test to perform.Category: Logical" },
                                { value: "Syntax: IF(logical_test, value_if_true, value_if_false)" }
                            ]
                        }
                    }

                    if (word && word.word == "IFERROR") {
                        return {
                            contents: [
                                { value: "**IFERROR Statement**" },
                                { value: "Returns a value you specify if a formula evaluates to an error; otherwise, returns the result of theformula.Category: Logical" },
                                { value: "Syntax: IFERROR(value,value_if_error)" }
                            ]
                        }
                    }

                    if (word && word.word == "IFNA") {
                        return {
                            contents: [
                                { value: "**IFNA Statement**" },
                                { value: "Returns the value you specify if the expression resolves to #N/A, otherwise returns the result ofthe expression.Category: Logical" },
                                { value: "Syntax: IFNA()" }
                            ]
                        }
                    }

                    if (word && word.word == "IFS") {
                        return {
                            contents: [
                                { value: "**IFS Statement**" },
                                { value: "Checks whether one or more conditions are met and returns a value that corresponds to the first TRUEcondition.Category: Logical" },
                                { value: "Syntax: IFS()" }
                            ]
                        }
                    }

                    if (word && word.word == "NOT") {
                        return {
                            contents: [
                                { value: "**NOT Statement**" },
                                { value: "Reverses the logic of its argument.Category: Logical" },
                                { value: "Syntax: NOT()" }
                            ]
                        }
                    }

                    if (word && word.word == "OR") {
                        return {
                            contents: [
                                { value: "**OR Statement**" },
                                { value: "Returns TRUE if any argument is TRUE.Category: Logical" },
                                { value: "Syntax: OR()" }
                            ]
                        }
                    }

                    if (word && word.word == "SWITCH") {
                        return {
                            contents: [
                                { value: "**SWITCH Statement**" },
                                { value: "Evaluates an expression against a list of values and returns the result corresponding to the firstmatching value. If there is no match, an optional default value may be returned.Category: Logical" },
                                { value: "Syntax: SWITCH()" }
                            ]
                        }
                    }

                    if (word && word.word == "TRUE") {
                        return {
                            contents: [
                                { value: "**TRUE Statement**" },
                                { value: "Returns the logical value TRUE.Category: Logical" },
                                { value: "Syntax: TRUE()" }
                            ]
                        }
                    }

                    if (word && word.word == "XOR") {
                        return {
                            contents: [
                                { value: "**XOR Statement**" },
                                { value: "Returns a logical exclusive OR of all arguments.Category: Logical" },
                                { value: "Syntax: XOR(args)" }
                            ]
                        }
                    }
                    if (word && word.word == "DATE") {
                        return {
                            contents: [
                                { value: "**DATE Statement**" },
                                { value: "Returns the serial number of a particular date.Category: Date and time" },
                                { value: "Syntax: DATE(year, month, day)" }
                            ]
                        }
                    }

                    if (word && word.word == "DATEDIF") {
                        return {
                            contents: [
                                { value: "**DATEDIF Statement**" },
                                { value: "Calculates the number of days, months, or years between two dates. This function is useful in formulas where you need to calculate an age.Category: Date and time" },
                                { value: "Syntax: DATEDIF(start_date, end_date, unit)" }
                            ]
                        }
                    }

                    if (word && word.word == "DATEVALUE") {
                        return {
                            contents: [
                                { value: "**DATEVALUE Statement**" },
                                { value: "Converts a date in the form of text to a serial number.Category: Date and time" },
                                { value: "Syntax: DATEVALUE(date_text)" }
                            ]
                        }
                    }

                    if (word && word.word == "DAY") {
                        return {
                            contents: [
                                { value: "**DAY Statement**" },
                                { value: "Converts a serial number to a day of the month.Category: Date and time" },
                                { value: "Syntax: DAY(serial_number)" }
                            ]
                        }
                    }

                    if (word && word.word == "DAYS") {
                        return {
                            contents: [
                                { value: "**DAYS Statement**" },
                                { value: "Returns the number of days between two dates.Category: Date and time" },
                                { value: "Syntax: DAYS(end_date, start_date)" }
                            ]
                        }
                    }

                    if (word && word.word == "DAYS360") {
                        return {
                            contents: [
                                { value: "**DAYS360 Statement**" },
                                { value: "Calculates the number of days between two dates based on a 360-day year.Category: Date and time" },
                                { value: "Syntax: DAYS360(start_date, end_date, method)" }
                            ]
                        }
                    }

                    if (word && word.word == "EDATE") {
                        return {
                            contents: [
                                { value: "**EDATE Statement**" },
                                { value: "Returns the serial number of the date that is the indicated number of months before or after the start date.Category: Date and time" },
                                { value: "Syntax: EDATE(start_date, months)" }
                            ]
                        }
                    }

                    if (word && word.word == "EOMONTH") {
                        return {
                            contents: [
                                { value: "**EOMONTH Statement**" },
                                { value: "Returns the serial number of the last day of the month before or after a specified number of months.Category: Date and time" },
                                { value: "Syntax: EOMONTH(start_date, months)" }
                            ]
                        }
                    }

                    if (word && word.word == "HOUR") {
                        return {
                            contents: [
                                { value: "**HOUR Statement**" },
                                { value: "Converts a serial number to an hour.Category: Date and time" },
                                { value: "Syntax: HOUR(serial_number)" }
                            ]
                        }
                    }

                    if (word && word.word == "ISOWEEKNUM") {
                        return {
                            contents: [
                                { value: "**ISOWEEKNUM Statement**" },
                                { value: "Returns the number of the ISO week number of the year for a given date.Category: Date and time" },
                                { value: "Syntax: ISOWEEKNUM(date)" }
                            ]
                        }
                    }

                    if (word && word.word == "MINUTE") {
                        return {
                            contents: [
                                { value: "**MINUTE Statement**" },
                                { value: "Converts a serial number to a minute.Category: Date and time" },
                                { value: "Syntax: MINUTE(serial_number)" }
                            ]
                        }
                    }

                    if (word && word.word == "MONTH") {
                        return {
                            contents: [
                                { value: "**MONTH Statement**" },
                                { value: "Converts a serial number to a month.Category: Date and time" },
                                { value: "Syntax: MONTH(serial_number)" }
                            ]
                        }
                    }

                    if (word && word.word == "NETWORKDAYS") {
                        return {
                            contents: [
                                { value: "**NETWORKDAYS Statement**" },
                                { value: "Returns the number of whole workdays between two dates.Category: Date and time" },
                                { value: "Syntax: NETWORKDAYS(start_date, end_date, holidays)" }
                            ]
                        }
                    }

                    if (word && word.word == "NOW") {
                        return {
                            contents: [
                                { value: "**NOW Statement**" },
                                { value: "Returns the serial number of the current date and time.Category: Date and time" },
                                { value: "Syntax: NOW()" }
                            ]
                        }
                    }

                    if (word && word.word == "SECOND") {
                        return {
                            contents: [
                                { value: "**SECOND Statement**" },
                                { value: "Converts a serial number to a second.Category: Date and time" },
                                { value: "Syntax: SECOND(serial_number)" }
                            ]
                        }
                    }

                    if (word && word.word == "TIME") {
                        return {
                            contents: [
                                { value: "**TIME Statement**" },
                                { value: "Returns the serial number of a particular time.Category: Date and time" },
                                { value: "Syntax: TIME(hour, minute, second)" }
                            ]
                        }
                    }

                    if (word && word.word == "TIMEVALUE") {
                        return {
                            contents: [
                                { value: "**TIMEVALUE Statement**" },
                                { value: "Converts a time in the form of text to a serial number.Category: Date and time" },
                                { value: "Syntax: TIMEVALUE(time_text)" }
                            ]
                        }
                    }

                    if (word && word.word == "TODAY") {
                        return {
                            contents: [
                                { value: "**TODAY Statement**" },
                                { value: "Returns the serial number of today's date.Category: Date and time" },
                                { value: "Syntax: TODAY()" }
                            ]
                        }
                    }

                    if (word && word.word == "WEEKDAY") {
                        return {
                            contents: [
                                { value: "**WEEKDAY Statement**" },
                                { value: "Converts a serial number to a day of the week.Category: Date and time" },
                                { value: "Syntax: WEEKDAY(serial_number, return_type)" }
                            ]
                        }
                    }

                    if (word && word.word == "WEEKNUM") {
                        return {
                            contents: [
                                { value: "**WEEKNUM Statement**" },
                                { value: "Converts a serial number to a number representing where the week falls numerically with a year.Category: Date and time" },
                                { value: "Syntax: WEEKNUM(serial_number, return_type)" }
                            ]
                        }
                    }

                    if (word && word.word == "WORKDAY") {
                        return {
                            contents: [
                                { value: "**WORKDAY Statement**" },
                                { value: "Returns the serial number of the date before or after a specified number of workdays.Category: Date and time" },
                                { value: "Syntax: WORKDAY(start_date, days, holidays)" }
                            ]
                        }
                    }

                    if (word && word.word == "YEAR") {
                        return {
                            contents: [
                                { value: "**YEAR Statement**" },
                                { value: "Converts a serial number to a year.Category: Date and time" },
                                { value: "Syntax: YEAR(serial_number)" }
                            ]
                        }
                    }

                    if (word && word.word == "YEARFRAC") {
                        return {
                            contents: [
                                { value: "**YEARFRAC Statement**" },
                                { value: "Returns the year fraction representing the number of whole days between start_date and end_date.Category: Date and time" },
                                { value: "Syntax: YEARFRAC(start_date, end_date, basis)" }
                            ]
                        }
                    }
                    if (word && word.word == "ASC") {
                        return {
                            contents: [
                                { value: "**ASC Statement**" },
                                { value: "-- Not implemented --Changes full-width (double-byte) English letters or katakana within a character string to half-width (single-byte) characters.Category: Text" },
                                { value: "Syntax: ASC(text)" }
                            ]
                        }
                    }

                    if (word && word.word == "BAHTTEXT") {
                        return {
                            contents: [
                                { value: "**BAHTTEXT Statement**" },
                                { value: "-- Not implemented --Converts a number to text, using the ß (baht) currency format.Category: Text" },
                                { value: "Syntax: BAHTTEXT(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "CHAR") {
                        return {
                            contents: [
                                { value: "**CHAR Statement**" },
                                { value: "Returns the character specified by the code number.Category: Text" },
                                { value: "Syntax: CHAR(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "CLEAN") {
                        return {
                            contents: [
                                { value: "**CLEAN Statement**" },
                                { value: "Removes all nonprintable characters from text.Category: Text" },
                                { value: "Syntax: CLEAN(text)" }
                            ]
                        }
                    }

                    if (word && word.word == "CODE") {
                        return {
                            contents: [
                                { value: "**CODE Statement**" },
                                { value: "Returns a numeric code for the first character in a text string.Category: Text" },
                                { value: "Syntax: CODE(text)" }
                            ]
                        }
                    }

                    if (word && word.word == "CONCATENATE") {
                        return {
                            contents: [
                                { value: "**CONCATENATE Statement**" },
                                { value: "Joins several text items into one text item.Category: Text" },
                                { value: "Syntax: CONCATENATE()" }
                            ]
                        }
                    }

                    if (word && word.word == "DBCS") {
                        return {
                            contents: [
                                { value: "**DBCS Statement**" },
                                { value: "-- Not implemented --Changes half-width (single-byte) English letters or katakana within a character string to full-width (double-byte) characters.Category: Text" },
                                { value: "Syntax: DBCS(text)" }
                            ]
                        }
                    }

                    if (word && word.word == "DOLLAR") {
                        return {
                            contents: [
                                { value: "**DOLLAR Statement**" },
                                { value: "Converts a number to text, using the $ (dollar) currency format.Category: Text" },
                                { value: "Syntax: DOLLAR(number, decimals)" }
                            ]
                        }
                    }

                    if (word && word.word == "EXACT") {
                        return {
                            contents: [
                                { value: "**EXACT Statement**" },
                                { value: "Checks to see if two text values are identical.Category: Text" },
                                { value: "Syntax: EXACT(text1, text2)" }
                            ]
                        }
                    }

                    if (word && word.word == "FIND") {
                        return {
                            contents: [
                                { value: "**FIND Statement**" },
                                { value: "Locate one text string within a second text string, and return the number of the starting position of the first text string from the first character of the second text string.Category: Text" },
                                { value: "Syntax: FIND(find_text, within_text, start_num)" }
                            ]
                        }
                    }

                    if (word && word.word == "FIXED") {
                        return {
                            contents: [
                                { value: "**FIXED Statement**" },
                                { value: "Formats a number as text with a fixed number of decimals.Category: Text" },
                                { value: "Syntax: FIXED(number, decimals, no_commas)" }
                            ]
                        }
                    }

                    if (word && word.word == "LEFT") {
                        return {
                            contents: [
                                { value: "**LEFT Statement**" },
                                { value: "Returns the leftmost characters from a text value.Category: Text" },
                                { value: "Syntax: LEFT(text, num_chars)" }
                            ]
                        }
                    }

                    if (word && word.word == "LEN") {
                        return {
                            contents: [
                                { value: "**LEN Statement**" },
                                { value: "Returns the number of characters in a text stringCategory: Text" },
                                { value: "Syntax: LEN(text)" }
                            ]
                        }
                    }

                    if (word && word.word == "LOWER") {
                        return {
                            contents: [
                                { value: "**LOWER Statement**" },
                                { value: "Converts text to lowercase.Category: Text" },
                                { value: "Syntax: LOWER(text)" }
                            ]
                        }
                    }

                    if (word && word.word == "MID") {
                        return {
                            contents: [
                                { value: "**MID Statement**" },
                                { value: "Returns a specific number of characters from a text string starting at the position you specifyCategory: Text" },
                                { value: "Syntax: MID(text, start_num, num_chars)" }
                            ]
                        }
                    }

                    if (word && word.word == "NUMBERVALUE") {
                        return {
                            contents: [
                                { value: "**NUMBERVALUE Statement**" },
                                { value: "Converts text to number in a locale-independent manner.Category: Text" },
                                { value: "Syntax: NUMBERVALUE(text, decimal_separator, group_separator)" }
                            ]
                        }
                    }

                    if (word && word.word == "PRONETIC") {
                        return {
                            contents: [
                                { value: "**PRONETIC Statement**" },
                                { value: "-- Not implemented --" },
                                { value: "Syntax: PRONETIC()" }
                            ]
                        }
                    }

                    if (word && word.word == "PROPER") {
                        return {
                            contents: [
                                { value: "**PROPER Statement**" },
                                { value: "Capitalizes the first letter in each word of a text value.Category: Text" },
                                { value: "Syntax: PROPER(text)" }
                            ]
                        }
                    }

                    if (word && word.word == "REPLACE") {
                        return {
                            contents: [
                                { value: "**REPLACE Statement**" },
                                { value: "Replaces characters within textCategory: Text" },
                                { value: "Syntax: REPLACE(old_text, num_chars, length, new_text)" }
                            ]
                        }
                    }

                    if (word && word.word == "REPT") {
                        return {
                            contents: [
                                { value: "**REPT Statement**" },
                                { value: "Repeats text a given number of times.Category: Text" },
                                { value: "Syntax: REPT(text, number_times)" }
                            ]
                        }
                    }

                    if (word && word.word == "RIGHT") {
                        return {
                            contents: [
                                { value: "**RIGHT Statement**" },
                                { value: "Returns the rightmost characters from a text valueCategory: Text" },
                                { value: "Syntax: RIGHT(text, num_chars)" }
                            ]
                        }
                    }

                    if (word && word.word == "SEARCH") {
                        return {
                            contents: [
                                { value: "**SEARCH Statement**" },
                                { value: "Finds one text value within another (not case-sensitive)Category: Text" },
                                { value: "Syntax: SEARCH(find_text, within_text, start_num)" }
                            ]
                        }
                    }

                    if (word && word.word == "SUBSTITUTE") {
                        return {
                            contents: [
                                { value: "**SUBSTITUTE Statement**" },
                                { value: "Substitutes new text for old text in a text string.Category: Text" },
                                { value: "Syntax: SUBSTITUTE(text, old_text, new_text, instance_num)" }
                            ]
                        }
                    }

                    if (word && word.word == "T") {
                        return {
                            contents: [
                                { value: "**T Statement**" },
                                { value: "Converts its arguments to text.Category: Text" },
                                { value: "Syntax: T(value)" }
                            ]
                        }
                    }

                    if (word && word.word == "TEXT") {
                        return {
                            contents: [
                                { value: "**TEXT Statement**" },
                                { value: "Formats a number and converts it to text.Category: Text" },
                                { value: "Syntax: TEXT(value, format_text)" }
                            ]
                        }
                    }

                    if (word && word.word == "TEXTJOIN") {
                        return {
                            contents: [
                                { value: "**TEXTJOIN Statement**" },
                                { value: "Combines the text from multiple ranges and/or strings.Category: Text" },
                                { value: "Syntax: TEXTJOIN(delimiter, ignore_empty, args)" }
                            ]
                        }
                    }

                    if (word && word.word == "TRIM") {
                        return {
                            contents: [
                                { value: "**TRIM Statement**" },
                                { value: "Removes spaces from text.Category: Text" },
                                { value: "Syntax: TRIM(text)" }
                            ]
                        }
                    }

                    if (word && word.word == "UPPER") {
                        return {
                            contents: [
                                { value: "**UPPER Statement**" },
                                { value: "Converts text to uppercase.Category: Text" },
                                { value: "Syntax: UPPER(text)" }
                            ]
                        }
                    }

                    if (word && word.word == "VALUE") {
                        return {
                            contents: [
                                { value: "**VALUE Statement**" },
                                { value: "Converts a text argument to a number.Category: Text" },
                                { value: "Syntax: VALUE(text)" }
                            ]
                        }
                    }
                    if (word && word.word == "AVEDEV") {
                        return {
                            contents: [
                                { value: "**AVEDEV Statement**" },
                                { value: "Returns the average of the absolute deviations of data points from their mean.Category: Statistical" },
                                { value: "Syntax: AVEDEV(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "AVERAGE") {
                        return {
                            contents: [
                                { value: "**AVERAGE Statement**" },
                                { value: "Returns the average of its arguments.Category: Statistical" },
                                { value: "Syntax: AVERAGE(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "AVERAGEA") {
                        return {
                            contents: [
                                { value: "**AVERAGEA Statement**" },
                                { value: "Returns the average of its arguments, including numbers, text, and logical values.Category: Statistical" },
                                { value: "Syntax: AVERAGEA(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "AVERAGEIF") {
                        return {
                            contents: [
                                { value: "**AVERAGEIF Statement**" },
                                { value: "Returns the average (arithmetic mean) of all the values in a range that meet a given criteria.Category: Statistical" },
                                { value: "Syntax: AVERAGEIF(range, criteria, average_range)" }
                            ]
                        }
                    }

                    if (word && word.word == "AVERAGEIFS") {
                        return {
                            contents: [
                                { value: "**AVERAGEIFS Statement**" },
                                { value: "Returns the average (arithmetic mean) of all values that meet multiple criteria.Category: Statistical" },
                                { value: "Syntax: AVERAGEIFS(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "CORREL") {
                        return {
                            contents: [
                                { value: "**CORREL Statement**" },
                                { value: "Returns the correlation coefficient between two data sets.Category: Statistical" },
                                { value: "Syntax: CORREL(array1, array2)" }
                            ]
                        }
                    }

                    if (word && word.word == "COUNT") {
                        return {
                            contents: [
                                { value: "**COUNT Statement**" },
                                { value: "Counts how many numbers are in the list of arguments.Category: Statistical" },
                                { value: "Syntax: COUNT(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "COUNTA") {
                        return {
                            contents: [
                                { value: "**COUNTA Statement**" },
                                { value: "Counts how many values are in the list of arguments.Category: Statistical" },
                                { value: "Syntax: COUNTA(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "COUNTBLANK") {
                        return {
                            contents: [
                                { value: "**COUNTBLANK Statement**" },
                                { value: "Counts the number of blank values within a range.Category: Statistical" },
                                { value: "Syntax: COUNTBLANK(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "COUNTIF") {
                        return {
                            contents: [
                                { value: "**COUNTIF Statement**" },
                                { value: "Counts the number of values within a range that meet the given criteria.Category: Statistical" },
                                { value: "Syntax: COUNTIF()" }
                            ]
                        }
                    }

                    if (word && word.word == "COUNTIFS") {
                        return {
                            contents: [
                                { value: "**COUNTIFS Statement**" },
                                { value: "Counts the number of values within a range that meet multiple criteria.Category: Statistical" },
                                { value: "Syntax: COUNTIFS(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "DEVSQ") {
                        return {
                            contents: [
                                { value: "**DEVSQ Statement**" },
                                { value: "Returns the sum of squares of deviations.Category: Statistical" },
                                { value: "Syntax: DEVSQ(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "FISHER") {
                        return {
                            contents: [
                                { value: "**FISHER Statement**" },
                                { value: "Returns the Fisher transformation.Category: Statistical" },
                                { value: "Syntax: FISHER(x)" }
                            ]
                        }
                    }

                    if (word && word.word == "FISHERINV") {
                        return {
                            contents: [
                                { value: "**FISHERINV Statement**" },
                                { value: "Returns the inverse of the Fisher transformation.Category: Statistical" },
                                { value: "Syntax: FISHERINV(y)" }
                            ]
                        }
                    }

                    if (word && word.word == "FORECAST") {
                        return {
                            contents: [
                                { value: "**FORECAST Statement**" },
                                { value: "Returns a value along a linear trend.Category: Statistical" },
                                { value: "Syntax: FORECAST(x, known_ys, known_xs)" }
                            ]
                        }
                    }

                    if (word && word.word == "FREQUENCY") {
                        return {
                            contents: [
                                { value: "**FREQUENCY Statement**" },
                                { value: "Returns a frequency distribution as a vertical array.Category: Statistical" },
                                { value: "Syntax: FREQUENCY(data_array, bins_array)" }
                            ]
                        }
                    }

                    if (word && word.word == "GAMMA") {
                        return {
                            contents: [
                                { value: "**GAMMA Statement**" },
                                { value: "Returns the Gamma function value.Category: Statistical" },
                                { value: "Syntax: GAMMA(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "GAMMALN") {
                        return {
                            contents: [
                                { value: "**GAMMALN Statement**" },
                                { value: "Returns the natural logarithm of the gamma function, Γ(x).Category: Statistical" },
                                { value: "Syntax: GAMMALN(x)" }
                            ]
                        }
                    }

                    if (word && word.word == "GAUSS") {
                        return {
                            contents: [
                                { value: "**GAUSS Statement**" },
                                { value: "Returns 0.5 less than the standard normal cumulative distribution.Category: Statistical" },
                                { value: "Syntax: GAUSS(z)" }
                            ]
                        }
                    }

                    if (word && word.word == "GEOMEAN") {
                        return {
                            contents: [
                                { value: "**GEOMEAN Statement**" },
                                { value: "Returns the geometric mean.Category: Statistical" },
                                { value: "Syntax: GEOMEAN(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "GROWTH") {
                        return {
                            contents: [
                                { value: "**GROWTH Statement**" },
                                { value: "Returns values along an exponential trend.Category: Statistical" },
                                { value: "Syntax: GROWTH(known_y, known_x, new_x, use_const)" }
                            ]
                        }
                    }

                    if (word && word.word == "HARMEAN") {
                        return {
                            contents: [
                                { value: "**HARMEAN Statement**" },
                                { value: "Returns the harmonic mean.Category: Statistical" },
                                { value: "Syntax: HARMEAN(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "INTERCEPT") {
                        return {
                            contents: [
                                { value: "**INTERCEPT Statement**" },
                                { value: "Returns the intercept of the linear regression line.Category: Statistical" },
                                { value: "Syntax: INTERCEPT(known_y, known_x)" }
                            ]
                        }
                    }

                    if (word && word.word == "KURT") {
                        return {
                            contents: [
                                { value: "**KURT Statement**" },
                                { value: "Returns the kurtosis of a data set.Category: Statistical" },
                                { value: "Syntax: KURT(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "LARGE") {
                        return {
                            contents: [
                                { value: "**LARGE Statement**" },
                                { value: "Returns the k-th largest value in a data set.Category: Statistical" },
                                { value: "Syntax: LARGE(array, k)" }
                            ]
                        }
                    }

                    if (word && word.word == "LINEST") {
                        return {
                            contents: [
                                { value: "**LINEST Statement**" },
                                { value: "Returns the parameters of a linear trend.Category: Statistical" },
                                { value: "Syntax: LINEST(known_y, known_x)" }
                            ]
                        }
                    }

                    if (word && word.word == "LOGEST") {
                        return {
                            contents: [
                                { value: "**LOGEST Statement**" },
                                { value: "Returns the parameters of an exponential trend.Category: Statistical" },
                                { value: "Syntax: LOGEST(known_y, known_x)" }
                            ]
                        }
                    }

                    if (word && word.word == "MAX") {
                        return {
                            contents: [
                                { value: "**MAX Statement**" },
                                { value: "Returns the maximum value in a list of arguments.Category: Statistical" },
                                { value: "Syntax: MAX(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "MAXA") {
                        return {
                            contents: [
                                { value: "**MAXA Statement**" },
                                { value: "Returns the maximum value in a list of arguments, including numbers, text, and logical values.Category: Statistical" },
                                { value: "Syntax: MAXA(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "MAXIFS") {
                        return {
                            contents: [
                                { value: "**MAXIFS Statement**" },
                                { value: "Returns the maximum of all values in a range that meet multiple criteria.Category: Statistical" },
                                { value: "Syntax: MAXIFS()" }
                            ]
                        }
                    }

                    if (word && word.word == "MEDIAN") {
                        return {
                            contents: [
                                { value: "**MEDIAN Statement**" },
                                { value: "Returns the median of the given numbers.Category: Statistical" },
                                { value: "Syntax: MEDIAN(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "MIN") {
                        return {
                            contents: [
                                { value: "**MIN Statement**" },
                                { value: "Returns the minimum value in a list of arguments.Category: Statistical" },
                                { value: "Syntax: MIN(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "MINA") {
                        return {
                            contents: [
                                { value: "**MINA Statement**" },
                                { value: "Returns the smallest value in a list of arguments, including numbers, text, and logical values.Category: Statistical" },
                                { value: "Syntax: MINA(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "MINIFS") {
                        return {
                            contents: [
                                { value: "**MINIFS Statement**" },
                                { value: "Returns the minimum of all values in a range that meet multiple criteria.Category: Statistical" },
                                { value: "Syntax: MINIFS()" }
                            ]
                        }
                    }

                    if (word && word.word == "PEARSON") {
                        return {
                            contents: [
                                { value: "**PEARSON Statement**" },
                                { value: "Returns the Pearson product moment correlation coefficient.Category: Statistical" },
                                { value: "Syntax: PEARSON(array1, array2)" }
                            ]
                        }
                    }

                    if (word && word.word == "PERMUT") {
                        return {
                            contents: [
                                { value: "**PERMUT Statement**" },
                                { value: "Returns the number of permutations for a given number of objects.Category: Statistical" },
                                { value: "Syntax: PERMUT(number, number_chosen)" }
                            ]
                        }
                    }

                    if (word && word.word == "PERMUTATIONA") {
                        return {
                            contents: [
                                { value: "**PERMUTATIONA Statement**" },
                                { value: "Returns the number of permutations for a given number of objects (with repetitions) that can be selected from the total objects.Category: Statistical" },
                                { value: "Syntax: PERMUTATIONA(number, number_chosen)" }
                            ]
                        }
                    }

                    if (word && word.word == "PHI") {
                        return {
                            contents: [
                                { value: "**PHI Statement**" },
                                { value: "Returns the value of the density function for a standard normal distribution.Category: Statistical" },
                                { value: "Syntax: PHI(x)" }
                            ]
                        }
                    }

                    if (word && word.word == "PROB") {
                        return {
                            contents: [
                                { value: "**PROB Statement**" },
                                { value: "Returns the probability that values in a range are between two limits.Category: Statistical" },
                                { value: "Syntax: PROB(x_range, prob_range, lower_limit, upper_limit)" }
                            ]
                        }
                    }

                    if (word && word.word == "ROW") {
                        return {
                            contents: [
                                { value: "**ROW Statement**" },
                                { value: "Returns the row number of a reference.Category: Lookup and reference" },
                                { value: "Syntax: ROW(reference, index)" }
                            ]
                        }
                    }

                    if (word && word.word == "RSQ") {
                        return {
                            contents: [
                                { value: "**RSQ Statement**" },
                                { value: "Returns the square of the Pearson product moment correlation coefficient.Category: Statistical" },
                                { value: "Syntax: RSQ(known_y, known_x)" }
                            ]
                        }
                    }

                    if (word && word.word == "SKEW") {
                        return {
                            contents: [
                                { value: "**SKEW Statement**" },
                                { value: "Returns the skewness of a distribution.Category: Statistical" },
                                { value: "Syntax: SKEW(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "SLOPE") {
                        return {
                            contents: [
                                { value: "**SLOPE Statement**" },
                                { value: "Returns the slope of the linear regression line.Category: Statistical" },
                                { value: "Syntax: SLOPE(known_y, known_x)" }
                            ]
                        }
                    }

                    if (word && word.word == "SMALL") {
                        return {
                            contents: [
                                { value: "**SMALL Statement**" },
                                { value: "Returns the k-th smallest value in a data set.Category: Statistical" },
                                { value: "Syntax: SMALL(array, k)" }
                            ]
                        }
                    }

                    if (word && word.word == "STANDARDIZE") {
                        return {
                            contents: [
                                { value: "**STANDARDIZE Statement**" },
                                { value: "Returns a normalized value.Category: Statistical" },
                                { value: "Syntax: STANDARDIZE(x, mean, standard_dev)" }
                            ]
                        }
                    }

                    if (word && word.word == "STDEVA") {
                        return {
                            contents: [
                                { value: "**STDEVA Statement**" },
                                { value: "Estimates standard deviation based on a sample, including numbers, text, and logical values.Category: Statistical" },
                                { value: "Syntax: STDEVA(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "STDEVPA") {
                        return {
                            contents: [
                                { value: "**STDEVPA Statement**" },
                                { value: "Calculates standard deviation based on the entire population, including numbers, text, and logical values.Category: Statistical" },
                                { value: "Syntax: STDEVPA(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "STEYX") {
                        return {
                            contents: [
                                { value: "**STEYX Statement**" },
                                { value: "Returns the standard error of the predicted y-value for each x in the regression.Category: Statistical" },
                                { value: "Syntax: STEYX(known_y, known_x)" }
                            ]
                        }
                    }

                    if (word && word.word == "TREND") {
                        return {
                            contents: [
                                { value: "**TREND Statement**" },
                                { value: "Returns values along a linear trend.Category: Statistical" },
                                { value: "Syntax: TREND(known_ys, known_xs, new_xs)" }
                            ]
                        }
                    }

                    if (word && word.word == "TRIMMEAN") {
                        return {
                            contents: [
                                { value: "**TRIMMEAN Statement**" },
                                { value: "Returns the mean of the interior of a data set.Category: Statistical" },
                                { value: "Syntax: TRIMMEAN(array, percent)" }
                            ]
                        }
                    }

                    if (word && word.word == "VARA") {
                        return {
                            contents: [
                                { value: "**VARA Statement**" },
                                { value: "Estimates variance based on a sample, including numbers, text, and logical values.Category: Statistical" },
                                { value: "Syntax: VARA(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "VARPA") {
                        return {
                            contents: [
                                { value: "**VARPA Statement**" },
                                { value: "Calculates variance based on the entire population, including numbers, text, and logical values.Category: Statistical" },
                                { value: "Syntax: VARPA(args)" }
                            ]
                        }
                    }
                    if (word && word.word == "ABS") {
                        return {
                            contents: [
                                { value: "**ABS Statement**" },
                                { value: "Returns the absolute value of a number.Category: Math and trigonometry" },
                                { value: "Syntax: ABS(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "ACOS") {
                        return {
                            contents: [
                                { value: "**ACOS Statement**" },
                                { value: "Returns the arccosine of a number.Category: Math and trigonometry" },
                                { value: "Syntax: ACOS(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "ACOSH") {
                        return {
                            contents: [
                                { value: "**ACOSH Statement**" },
                                { value: "Returns the inverse hyperbolic cosine of a number.Category: Math and trigonometry" },
                                { value: "Syntax: ACOSH(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "ACOT") {
                        return {
                            contents: [
                                { value: "**ACOT Statement**" },
                                { value: "Returns the arccotangent of a number.Category: Math and trigonometry" },
                                { value: "Syntax: ACOT(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "ACOTH") {
                        return {
                            contents: [
                                { value: "**ACOTH Statement**" },
                                { value: "Returns the hyperbolic arccotangent of a number.Category: Math and trigonometry" },
                                { value: "Syntax: ACOTH(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "AGGREGATE") {
                        return {
                            contents: [
                                { value: "**AGGREGATE Statement**" },
                                { value: "Returns an aggregate in a list or database.Category: Math and trigonometry" },
                                { value: "Syntax: AGGREGATE(function_num, options, ref1, ref2)" }
                            ]
                        }
                    }

                    if (word && word.word == "ARABIC") {
                        return {
                            contents: [
                                { value: "**ARABIC Statement**" },
                                { value: "Converts a Roman number to Arabic, as a number.Category: Math and trigonometry" },
                                { value: "Syntax: ARABIC(text)" }
                            ]
                        }
                    }

                    if (word && word.word == "ASIN") {
                        return {
                            contents: [
                                { value: "**ASIN Statement**" },
                                { value: "Returns the arcsine of a number.Category: Math and trigonometry" },
                                { value: "Syntax: ASIN(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "ASINH") {
                        return {
                            contents: [
                                { value: "**ASINH Statement**" },
                                { value: "Returns the inverse hyperbolic sine of a number.Category: Math and trigonometry" },
                                { value: "Syntax: ASINH(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "ATAN") {
                        return {
                            contents: [
                                { value: "**ATAN Statement**" },
                                { value: "Returns the arctangent of a number.Category: Math and trigonometry" },
                                { value: "Syntax: ATAN(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "ATAN2") {
                        return {
                            contents: [
                                { value: "**ATAN2 Statement**" },
                                { value: "Returns the arctangent from x- and y-coordinates.Category: Math and trigonometry" },
                                { value: "Syntax: ATAN2(x_num, y_num)" }
                            ]
                        }
                    }

                    if (word && word.word == "ATANH") {
                        return {
                            contents: [
                                { value: "**ATANH Statement**" },
                                { value: "Returns the inverse hyperbolic tangent of a number.Category: Math and trigonometry" },
                                { value: "Syntax: ATANH(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "BASE") {
                        return {
                            contents: [
                                { value: "**BASE Statement**" },
                                { value: "Converts a number into a text representation with the given radix (base).Category: Math and trigonometry" },
                                { value: "Syntax: BASE(number, radix, min_length)" }
                            ]
                        }
                    }

                    if (word && word.word == "CEILING") {
                        return {
                            contents: [
                                { value: "**CEILING Statement**" },
                                { value: "Rounds a number to the nearest integer or to the nearest multiple of significance.Category: Math and trigonometry" },
                                { value: "Syntax: CEILING(number, significance, mode)" }
                            ]
                        }
                    }

                    if (word && word.word == "COMBIN") {
                        return {
                            contents: [
                                { value: "**COMBIN Statement**" },
                                { value: "Returns the number of combinations for a given number of objects.Category: Math and trigonometry" },
                                { value: "Syntax: COMBIN(number, number_chosen)" }
                            ]
                        }
                    }

                    if (word && word.word == "COMBINA") {
                        return {
                            contents: [
                                { value: "**COMBINA Statement**" },
                                { value: "Returns the number of combinations with repetitions for a given number of items.Category: Math and trigonometry" },
                                { value: "Syntax: COMBINA(number, number_chosen)" }
                            ]
                        }
                    }

                    if (word && word.word == "COS") {
                        return {
                            contents: [
                                { value: "**COS Statement**" },
                                { value: "Returns the cosine of a number.Category: Math and trigonometry" },
                                { value: "Syntax: COS(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "COSH") {
                        return {
                            contents: [
                                { value: "**COSH Statement**" },
                                { value: "Returns the hyperbolic cosine of a number.Category: Math and trigonometry" },
                                { value: "Syntax: COSH(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "COT") {
                        return {
                            contents: [
                                { value: "**COT Statement**" },
                                { value: "Returns the hyperbolic cosine of a number.Category: Math and trigonometry" },
                                { value: "Syntax: COT(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "COTH") {
                        return {
                            contents: [
                                { value: "**COTH Statement**" },
                                { value: "Returns the cotangent of an angle.Category: Math and trigonometry" },
                                { value: "Syntax: COTH(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "CSC") {
                        return {
                            contents: [
                                { value: "**CSC Statement**" },
                                { value: "Returns the cosecant of an angle.Category: Math and trigonometry" },
                                { value: "Syntax: CSC(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "CSCH") {
                        return {
                            contents: [
                                { value: "**CSCH Statement**" },
                                { value: "Returns the hyperbolic cosecant of an angle.Category: Math and trigonometry" },
                                { value: "Syntax: CSCH(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "DECIMAL") {
                        return {
                            contents: [
                                { value: "**DECIMAL Statement**" },
                                { value: "Converts a text representation of a number in a given base into a decimal number.Category: Math and trigonometry" },
                                { value: "Syntax: DECIMAL(text, radix)" }
                            ]
                        }
                    }

                    if (word && word.word == "DEGREES") {
                        return {
                            contents: [
                                { value: "**DEGREES Statement**" },
                                { value: "Converts radians to degrees.Category: Math and trigonometry" },
                                { value: "Syntax: DEGREES(angle)" }
                            ]
                        }
                    }

                    if (word && word.word == "EVEN") {
                        return {
                            contents: [
                                { value: "**EVEN Statement**" },
                                { value: "Rounds a number up to the nearest even integer.Category: Math and trigonometry" },
                                { value: "Syntax: EVEN(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "EXP") {
                        return {
                            contents: [
                                { value: "**EXP Statement**" },
                                { value: "Returns e raised to the power of a given number.Category: Math and trigonometry" },
                                { value: "Syntax: EXP(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "FACT") {
                        return {
                            contents: [
                                { value: "**FACT Statement**" },
                                { value: "Returns the factorial of a number.Category: Math and trigonometry" },
                                { value: "Syntax: FACT(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "FACTDOUBLE") {
                        return {
                            contents: [
                                { value: "**FACTDOUBLE Statement**" },
                                { value: "Returns the double factorial of a number.Category: Math and trigonometry" },
                                { value: "Syntax: FACTDOUBLE(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "FLOOR") {
                        return {
                            contents: [
                                { value: "**FLOOR Statement**" },
                                { value: "Rounds a number down, toward zero.Category: Math and trigonometry" },
                                { value: "Syntax: FLOOR(number, significance)" }
                            ]
                        }
                    }

                    if (word && word.word == "GCD") {
                        return {
                            contents: [
                                { value: "**GCD Statement**" },
                                { value: "Returns the greatest common divisor.Category: Math and trigonometry" },
                                { value: "Syntax: GCD(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "INT") {
                        return {
                            contents: [
                                { value: "**INT Statement**" },
                                { value: "Rounds a number down to the nearest integer.Category: Math and trigonometry" },
                                { value: "Syntax: INT(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "LCM") {
                        return {
                            contents: [
                                { value: "**LCM Statement**" },
                                { value: "Returns the least common multiple.Category: Math and trigonometry" },
                                { value: "Syntax: LCM(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "LN") {
                        return {
                            contents: [
                                { value: "**LN Statement**" },
                                { value: "Returns the natural logarithm of a number.Category: Math and trigonometry" },
                                { value: "Syntax: LN(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "LOG") {
                        return {
                            contents: [
                                { value: "**LOG Statement**" },
                                { value: "Returns the logarithm of a number to a specified base.Category: Math and trigonometry" },
                                { value: "Syntax: LOG(number, base)" }
                            ]
                        }
                    }

                    if (word && word.word == "LOG10") {
                        return {
                            contents: [
                                { value: "**LOG10 Statement**" },
                                { value: "Returns the base-10 logarithm of a number.Category: Math and trigonometry" },
                                { value: "Syntax: LOG10(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "MMULT") {
                        return {
                            contents: [
                                { value: "**MMULT Statement**" },
                                { value: "Returns the matrix product of two arrays. The result is an array with the same number of rows as array1 and the same number of columns as array2.Category: Math and trigonometry" },
                                { value: "Syntax: MMULT(array1, array2)" }
                            ]
                        }
                    }

                    if (word && word.word == "MOD") {
                        return {
                            contents: [
                                { value: "**MOD Statement**" },
                                { value: "Returns the remainder from division.Category: Math and trigonometry" },
                                { value: "Syntax: MOD(number, divisor)" }
                            ]
                        }
                    }

                    if (word && word.word == "MROUND") {
                        return {
                            contents: [
                                { value: "**MROUND Statement**" },
                                { value: "Returns a number rounded to the desired multiple.Category: Math and trigonometry" },
                                { value: "Syntax: MROUND(number, multiple)" }
                            ]
                        }
                    }

                    if (word && word.word == "MULTINOMIAL") {
                        return {
                            contents: [
                                { value: "**MULTINOMIAL Statement**" },
                                { value: "Returns the multinomial of a set of numbers.Category: Math and trigonometry" },
                                { value: "Syntax: MULTINOMIAL(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "MUNIT") {
                        return {
                            contents: [
                                { value: "**MUNIT Statement**" },
                                { value: "Returns the unit matrix for the specified dimension.Category: Math and trigonometry" },
                                { value: "Syntax: MUNIT(dimension)" }
                            ]
                        }
                    }

                    if (word && word.word == "ODD") {
                        return {
                            contents: [
                                { value: "**ODD Statement**" },
                                { value: "Rounds a number up to the nearest odd integer.Category: Math and trigonometry" },
                                { value: "Syntax: ODD(number:)" }
                            ]
                        }
                    }

                    if (word && word.word == "PI") {
                        return {
                            contents: [
                                { value: "**PI Statement**" },
                                { value: "Returns the value of pi.Category: Math and trigonometry" },
                                { value: "Syntax: PI()" }
                            ]
                        }
                    }

                    if (word && word.word == "POWER") {
                        return {
                            contents: [
                                { value: "**POWER Statement**" },
                                { value: "Returns the result of a number raised to a power.Category: Math and trigonometry" },
                                { value: "Syntax: POWER(number, power)" }
                            ]
                        }
                    }

                    if (word && word.word == "PRODUCT") {
                        return {
                            contents: [
                                { value: "**PRODUCT Statement**" },
                                { value: "Multiplies its arguments.Category: Math and trigonometry" },
                                { value: "Syntax: PRODUCT(number1, args)" }
                            ]
                        }
                    }

                    if (word && word.word == "QUOTIENT") {
                        return {
                            contents: [
                                { value: "**QUOTIENT Statement**" },
                                { value: "Returns the integer portion of a division.Category: Math and trigonometry" },
                                { value: "Syntax: QUOTIENT(numerator, denominator)" }
                            ]
                        }
                    }

                    if (word && word.word == "RADIANS") {
                        return {
                            contents: [
                                { value: "**RADIANS Statement**" },
                                { value: "Converts degrees to radians.Category: Math and trigonometry" },
                                { value: "Syntax: RADIANS(angle)" }
                            ]
                        }
                    }

                    if (word && word.word == "RAND") {
                        return {
                            contents: [
                                { value: "**RAND Statement**" },
                                { value: "Returns a random number between 0 and 1.Category: Math and trigonometry" },
                                { value: "Syntax: RAND()" }
                            ]
                        }
                    }

                    if (word && word.word == "RANDBETWEEN") {
                        return {
                            contents: [
                                { value: "**RANDBETWEEN Statement**" },
                                { value: "Returns a random number between the numbers you specify.Category: Math and trigonometry" },
                                { value: "Syntax: RANDBETWEEN(bottom, top)" }
                            ]
                        }
                    }

                    if (word && word.word == "ROMAN") {
                        return {
                            contents: [
                                { value: "**ROMAN Statement**" },
                                { value: "Converts an arabic numeral to roman, as text.Category: Math and trigonometry" },
                                { value: "Syntax: ROMAN(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "ROUND") {
                        return {
                            contents: [
                                { value: "**ROUND Statement**" },
                                { value: "Rounds a number to a specified number of digits.Category: Math and trigonometry" },
                                { value: "Syntax: ROUND(number, num_digits)" }
                            ]
                        }
                    }

                    if (word && word.word == "ROUNDDOWN") {
                        return {
                            contents: [
                                { value: "**ROUNDDOWN Statement**" },
                                { value: "Rounds a number down, toward zero.Category: Math and trigonometry" },
                                { value: "Syntax: ROUNDDOWN(number, num_digits)" }
                            ]
                        }
                    }

                    if (word && word.word == "ROUNDUP") {
                        return {
                            contents: [
                                { value: "**ROUNDUP Statement**" },
                                { value: "Rounds a number up, away from zero.Category: Math and trigonometry" },
                                { value: "Syntax: ROUNDUP(number, num_digits)" }
                            ]
                        }
                    }

                    if (word && word.word == "SEC") {
                        return {
                            contents: [
                                { value: "**SEC Statement**" },
                                { value: "Returns the secant of an angle.Category: Math and trigonometry" },
                                { value: "Syntax: SEC(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "SECH") {
                        return {
                            contents: [
                                { value: "**SECH Statement**" },
                                { value: "Returns the hyperbolic secant of an angle.Category: Math and trigonometry" },
                                { value: "Syntax: SECH(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "SERIESSUM") {
                        return {
                            contents: [
                                { value: "**SERIESSUM Statement**" },
                                { value: "Returns the sum of a power series based on the formula.Category: Math and trigonometry" },
                                { value: "Syntax: SERIESSUM(x, n, m, coefficients)" }
                            ]
                        }
                    }

                    if (word && word.word == "SIGN") {
                        return {
                            contents: [
                                { value: "**SIGN Statement**" },
                                { value: "Returns the sign of a number.Category: Math and trigonometry" },
                                { value: "Syntax: SIGN(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "SIN") {
                        return {
                            contents: [
                                { value: "**SIN Statement**" },
                                { value: "Returns the sine of the given angle.Category: Math and trigonometry" },
                                { value: "Syntax: SIN(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "SINH") {
                        return {
                            contents: [
                                { value: "**SINH Statement**" },
                                { value: "Returns the hyperbolic sine of a number.Category: Math and trigonometry" },
                                { value: "Syntax: SINH(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "SQRT") {
                        return {
                            contents: [
                                { value: "**SQRT Statement**" },
                                { value: "Returns a positive square root.Category: Math and trigonometry" },
                                { value: "Syntax: SQRT(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "SQRTPI") {
                        return {
                            contents: [
                                { value: "**SQRTPI Statement**" },
                                { value: "Returns the square root of (number * pi).Category: Math and trigonometry" },
                                { value: "Syntax: SQRTPI(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "SUBTOTAL") {
                        return {
                            contents: [
                                { value: "**SUBTOTAL Statement**" },
                                { value: "Returns a subtotal in a list or database.Category: Math and trigonometry" },
                                { value: "Syntax: SUBTOTAL(function_num, ref1)" }
                            ]
                        }
                    }

                    if (word && word.word == "SUM") {
                        return {
                            contents: [
                                { value: "**SUM Statement**" },
                                { value: "Adds its arguments.Category: Math and trigonometry" },
                                { value: "Syntax: SUM()" }
                            ]
                        }
                    }

                    if (word && word.word == "SUMIF") {
                        return {
                            contents: [
                                { value: "**SUMIF Statement**" },
                                { value: "Adds the values specified by a given criteria.Category: Math and trigonometry" },
                                { value: "Syntax: SUMIF(range, criteria, sum_range)" }
                            ]
                        }
                    }

                    if (word && word.word == "SUMIFS") {
                        return {
                            contents: [
                                { value: "**SUMIFS Statement**" },
                                { value: "Adds the values in a range that meet multiple criteria.Category: Math and trigonometry" },
                                { value: "Syntax: SUMIFS()" }
                            ]
                        }
                    }

                    if (word && word.word == "SUMPRODUCT") {
                        return {
                            contents: [
                                { value: "**SUMPRODUCT Statement**" },
                                { value: "Returns the sum of the products of corresponding array components.Category: Math and trigonometry" },
                                { value: "Syntax: SUMPRODUCT()" }
                            ]
                        }
                    }

                    if (word && word.word == "SUMSQ") {
                        return {
                            contents: [
                                { value: "**SUMSQ Statement**" },
                                { value: "Returns the sum of the squares of the arguments.Category: Math and trigonometry" },
                                { value: "Syntax: SUMSQ(args)" }
                            ]
                        }
                    }

                    if (word && word.word == "SUMX2MY2") {
                        return {
                            contents: [
                                { value: "**SUMX2MY2 Statement**" },
                                { value: "Returns the sum of the difference of squares of corresponding values in two arrays.Category: Math and trigonometry" },
                                { value: "Syntax: SUMX2MY2(array_x, array_y)" }
                            ]
                        }
                    }

                    if (word && word.word == "SUMX2PY2") {
                        return {
                            contents: [
                                { value: "**SUMX2PY2 Statement**" },
                                { value: "Returns the sum of the sum of squares of corresponding values in two arrays.Category: Math and trigonometry" },
                                { value: "Syntax: SUMX2PY2(array_x, array_y)" }
                            ]
                        }
                    }

                    if (word && word.word == "SUMXMY2") {
                        return {
                            contents: [
                                { value: "**SUMXMY2 Statement**" },
                                { value: "Returns the sum of squares of differences of corresponding values in two arrays.Category: Math and trigonometry" },
                                { value: "Syntax: SUMXMY2(array_x, array_y)" }
                            ]
                        }
                    }

                    if (word && word.word == "TAN") {
                        return {
                            contents: [
                                { value: "**TAN Statement**" },
                                { value: "Returns the tangent of a number.Category: Math and trigonometry" },
                                { value: "Syntax: TAN(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "TANH") {
                        return {
                            contents: [
                                { value: "**TANH Statement**" },
                                { value: "Returns the hyperbolic tangent of a number.Category: Math and trigonometry" },
                                { value: "Syntax: TANH(number)" }
                            ]
                        }
                    }

                    if (word && word.word == "TRUNC") {
                        return {
                            contents: [
                                { value: "**TRUNC Statement**" },
                                { value: "Truncates a number to an integer.Category: Math and trigonometry" },
                                { value: "Syntax: TRUNC(number, num_digits)" }
                            ]
                        }
                    }
                    return null;
                }
            });


            monaco.languages.registerCompletionItemProvider("mySpecialLanguage", {
                provideCompletionItems: (model, position) => {
                    var word = model.getWordUntilPosition(position);
                    var range = {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn,
                        endColumn: word.endColumn,
                    };

                    var suggestions = [
                        {
                            label: "simpleText",
                            kind: monaco.languages.CompletionItemKind.Text,
                            insertText: "simpleText",
                            range: range,
                        },
                        {
                            label: "testing",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: "testing(${1:condition})",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "ifelse",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: [
                                "if (${1:condition}) {",
                                "\t$0",
                                "} else {",
                                "\t",
                                "}",
                            ].join("\n"),
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            documentation: "If-Else Statement",
                            range: range,
                        },
                        {
                            label: 'AND',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'AND ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'AND STATEMENT',
                            range: range,
                        },
                        {
                            label: 'FALSE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'FALSE ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'FALSE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'IF',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'IF (${1:logical_test}, ${2:value_if_true}, ${3:value_if_false})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'IF STATEMENT',
                            range: range,
                        },
                        {
                            label: 'IFERROR',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'IFERROR (${1:value}, ${2:value_if_error})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'IFERROR STATEMENT',
                            range: range,
                        },
                        {
                            label: 'IFNA',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'IFNA ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'IFNA STATEMENT',
                            range: range,
                        },
                        {
                            label: 'IFS',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'IFS ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'IFS STATEMENT',
                            range: range,
                        },
                        {
                            label: 'NOT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'NOT ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'NOT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'OR',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'OR ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'OR STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SWITCH',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SWITCH ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SWITCH STATEMENT',
                            range: range,
                        },
                        {
                            label: 'TRUE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'TRUE ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'TRUE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'XOR',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'XOR (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'XOR STATEMENT',
                            range: range,
                        },
                        {
                            label: 'DATE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'DATE (${1:year}, ${2:month}, ${3:day})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'DATE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'DATEDIF',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'DATEDIF (${1:start_date}, ${2:end_date}, ${3:unit})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'DATEDIF STATEMENT',
                            range: range,
                        },
                        {
                            label: 'DATEVALUE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'DATEVALUE (${1:date_text})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'DATEVALUE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'DAY',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'DAY (${1:serial_number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'DAY STATEMENT',
                            range: range,
                        },
                        {
                            label: 'DAYS',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'DAYS (${1:end_date}, ${2:start_date})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'DAYS STATEMENT',
                            range: range,
                        },
                        {
                            label: 'DAYS360',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'DAYS360 (${1:start_date}, ${2:end_date}, ${3:method})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'DAYS360 STATEMENT',
                            range: range,
                        },
                        {
                            label: 'EDATE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'EDATE (${1:start_date}, ${2:months})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'EDATE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'EOMONTH',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'EOMONTH (${1:start_date}, ${2:months})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'EOMONTH STATEMENT',
                            range: range,
                        },
                        {
                            label: 'HOUR',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'HOUR (${1:serial_number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'HOUR STATEMENT',
                            range: range,
                        },
                        {
                            label: 'ISOWEEKNUM',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'ISOWEEKNUM (${1:date})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'ISOWEEKNUM STATEMENT',
                            range: range,
                        },
                        {
                            label: 'MINUTE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'MINUTE (${1:serial_number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'MINUTE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'MONTH',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'MONTH (${1:serial_number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'MONTH STATEMENT',
                            range: range,
                        },
                        {
                            label: 'NETWORKDAYS',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'NETWORKDAYS (${1:start_date}, ${2:end_date}, ${3:holidays})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'NETWORKDAYS STATEMENT',
                            range: range,
                        },
                        {
                            label: 'NOW',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'NOW ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'NOW STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SECOND',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SECOND (${1:serial_number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SECOND STATEMENT',
                            range: range,
                        },
                        {
                            label: 'TIME',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'TIME (${1:hour}, ${2:minute}, ${3:second})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'TIME STATEMENT',
                            range: range,
                        },
                        {
                            label: 'TIMEVALUE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'TIMEVALUE (${1:time_text})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'TIMEVALUE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'TODAY',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'TODAY ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'TODAY STATEMENT',
                            range: range,
                        },
                        {
                            label: 'WEEKDAY',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'WEEKDAY (${1:serial_number}, ${2:return_type})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'WEEKDAY STATEMENT',
                            range: range,
                        },
                        {
                            label: 'WEEKNUM',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'WEEKNUM (${1:serial_number}, ${2:return_type})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'WEEKNUM STATEMENT',
                            range: range,
                        },
                        {
                            label: 'WORKDAY',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'WORKDAY (${1:start_date}, ${2:days}, ${3:holidays})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'WORKDAY STATEMENT',
                            range: range,
                        },
                        {
                            label: 'YEAR',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'YEAR (${1:serial_number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'YEAR STATEMENT',
                            range: range,
                        },
                        {
                            label: 'YEARFRAC',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'YEARFRAC (${1:start_date}, ${2:end_date}, ${3:basis})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'YEARFRAC STATEMENT',
                            range: range,
                        },
                        {
                            label: 'ASC',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'ASC (${1:text})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'ASC STATEMENT',
                            range: range,
                        },
                        {
                            label: 'BAHTTEXT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'BAHTTEXT (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'BAHTTEXT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'CHAR',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'CHAR (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'CHAR STATEMENT',
                            range: range,
                        },
                        {
                            label: 'CLEAN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'CLEAN (${1:text})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'CLEAN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'CODE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'CODE (${1:text})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'CODE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'CONCATENATE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'CONCATENATE ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'CONCATENATE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'DBCS',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'DBCS (${1:text})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'DBCS STATEMENT',
                            range: range,
                        },
                        {
                            label: 'DOLLAR',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'DOLLAR (${1:number}, ${2:decimals})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'DOLLAR STATEMENT',
                            range: range,
                        },
                        {
                            label: 'EXACT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'EXACT (${1:text1}, ${2:text2})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'EXACT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'FIND',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'FIND (${1:find_text}, ${2:within_text}, ${3:start_num})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'FIND STATEMENT',
                            range: range,
                        },
                        {
                            label: 'FIXED',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'FIXED (${1:number}, ${2:decimals}, ${3:no_commas})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'FIXED STATEMENT',
                            range: range,
                        },
                        {
                            label: 'LEFT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'LEFT (${1:text}, ${2:num_chars})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'LEFT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'LEN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'LEN (${1:text})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'LEN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'LOWER',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'LOWER (${1:text})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'LOWER STATEMENT',
                            range: range,
                        },
                        {
                            label: 'MID',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'MID (${1:text}, ${2:start_num}, ${3:num_chars})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'MID STATEMENT',
                            range: range,
                        },
                        {
                            label: 'NUMBERVALUE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'NUMBERVALUE (${1:text}, ${2:decimal_separator}, ${3:group_separator})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'NUMBERVALUE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'PRONETIC',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'PRONETIC ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'PRONETIC STATEMENT',
                            range: range,
                        },
                        {
                            label: 'PROPER',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'PROPER (${1:text})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'PROPER STATEMENT',
                            range: range,
                        },
                        {
                            label: 'REPLACE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'REPLACE (${1:old_text}, ${2:num_chars}, ${3:length}, ${4:new_text})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'REPLACE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'REPT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'REPT (${1:text}, ${2:number_times})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'REPT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'RIGHT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'RIGHT (${1:text}, ${2:num_chars})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'RIGHT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SEARCH',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SEARCH (${1:find_text}, ${2:within_text}, ${3:start_num})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SEARCH STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SUBSTITUTE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SUBSTITUTE (${1:text}, ${2:old_text}, ${3:new_text}, ${4:instance_num})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SUBSTITUTE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'T',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'T (${1:value})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'T STATEMENT',
                            range: range,
                        },
                        {
                            label: 'TEXT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'TEXT (${1:value}, ${2:format_text})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'TEXT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'TEXTJOIN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'TEXTJOIN (${1:delimiter}, ${2:ignore_empty}, ${3:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'TEXTJOIN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'TRIM',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'TRIM (${1:text})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'TRIM STATEMENT',
                            range: range,
                        },
                        {
                            label: 'UPPER',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'UPPER (${1:text})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'UPPER STATEMENT',
                            range: range,
                        },
                        {
                            label: 'VALUE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'VALUE (${1:text})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'VALUE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'AVEDEV',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'AVEDEV (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'AVEDEV STATEMENT',
                            range: range,
                        },
                        {
                            label: 'AVERAGE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'AVERAGE (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'AVERAGE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'AVERAGEA',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'AVERAGEA (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'AVERAGEA STATEMENT',
                            range: range,
                        },
                        {
                            label: 'AVERAGEIF',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'AVERAGEIF (${1:range}, ${2:criteria}, ${3:average_range})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'AVERAGEIF STATEMENT',
                            range: range,
                        },
                        {
                            label: 'AVERAGEIFS',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'AVERAGEIFS (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'AVERAGEIFS STATEMENT',
                            range: range,
                        },
                        {
                            label: 'CORREL',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'CORREL (${1:array1}, ${2:array2})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'CORREL STATEMENT',
                            range: range,
                        },
                        {
                            label: 'COUNT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'COUNT (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'COUNT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'COUNTA',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'COUNTA (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'COUNTA STATEMENT',
                            range: range,
                        },
                        {
                            label: 'COUNTBLANK',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'COUNTBLANK (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'COUNTBLANK STATEMENT',
                            range: range,
                        },
                        {
                            label: 'COUNTIF',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'COUNTIF ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'COUNTIF STATEMENT',
                            range: range,
                        },
                        {
                            label: 'COUNTIFS',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'COUNTIFS (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'COUNTIFS STATEMENT',
                            range: range,
                        },
                        {
                            label: 'DEVSQ',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'DEVSQ (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'DEVSQ STATEMENT',
                            range: range,
                        },
                        {
                            label: 'FISHER',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'FISHER (${1:x})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'FISHER STATEMENT',
                            range: range,
                        },
                        {
                            label: 'FISHERINV',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'FISHERINV (${1:y})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'FISHERINV STATEMENT',
                            range: range,
                        },
                        {
                            label: 'FORECAST',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'FORECAST (${1:x}, ${2:known_ys}, ${3:known_xs})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'FORECAST STATEMENT',
                            range: range,
                        },
                        {
                            label: 'FREQUENCY',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'FREQUENCY (${1:data_array}, ${2:bins_array})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'FREQUENCY STATEMENT',
                            range: range,
                        },
                        {
                            label: 'GAMMA',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'GAMMA (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'GAMMA STATEMENT',
                            range: range,
                        },
                        {
                            label: 'GAMMALN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'GAMMALN (${1:x})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'GAMMALN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'GAUSS',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'GAUSS (${1:z})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'GAUSS STATEMENT',
                            range: range,
                        },
                        {
                            label: 'GEOMEAN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'GEOMEAN (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'GEOMEAN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'GROWTH',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'GROWTH (${1:known_y}, ${2:known_x}, ${3:new_x}, ${4:use_const})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'GROWTH STATEMENT',
                            range: range,
                        },
                        {
                            label: 'HARMEAN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'HARMEAN (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'HARMEAN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'INTERCEPT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'INTERCEPT (${1:known_y}, ${2:known_x})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'INTERCEPT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'KURT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'KURT (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'KURT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'LARGE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'LARGE (${1:array}, ${2:k})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'LARGE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'LINEST',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'LINEST (${1:known_y}, ${2:known_x})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'LINEST STATEMENT',
                            range: range,
                        },
                        {
                            label: 'LOGEST',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'LOGEST (${1:known_y}, ${2:known_x})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'LOGEST STATEMENT',
                            range: range,
                        },
                        {
                            label: 'MAX',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'MAX (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'MAX STATEMENT',
                            range: range,
                        },
                        {
                            label: 'MAXA',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'MAXA (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'MAXA STATEMENT',
                            range: range,
                        },
                        {
                            label: 'MAXIFS',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'MAXIFS ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'MAXIFS STATEMENT',
                            range: range,
                        },
                        {
                            label: 'MEDIAN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'MEDIAN (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'MEDIAN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'MIN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'MIN (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'MIN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'MINA',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'MINA (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'MINA STATEMENT',
                            range: range,
                        },
                        {
                            label: 'MINIFS',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'MINIFS ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'MINIFS STATEMENT',
                            range: range,
                        },
                        {
                            label: 'PEARSON',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'PEARSON (${1:array1}, ${2:array2})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'PEARSON STATEMENT',
                            range: range,
                        },
                        {
                            label: 'PERMUT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'PERMUT (${1:number}, ${2:number_chosen})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'PERMUT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'PERMUTATIONA',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'PERMUTATIONA (${1:number}, ${2:number_chosen})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'PERMUTATIONA STATEMENT',
                            range: range,
                        },
                        {
                            label: 'PHI',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'PHI (${1:x})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'PHI STATEMENT',
                            range: range,
                        },
                        {
                            label: 'PROB',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'PROB (${1:x_range}, ${2:prob_range}, ${3:lower_limit}, ${4:upper_limit})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'PROB STATEMENT',
                            range: range,
                        },
                        {
                            label: 'ROW',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'ROW (${1:reference}, ${2:index})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'ROW STATEMENT',
                            range: range,
                        },
                        {
                            label: 'RSQ',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'RSQ (${1:known_y}, ${2:known_x})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'RSQ STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SKEW',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SKEW (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SKEW STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SLOPE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SLOPE (${1:known_y}, ${2:known_x})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SLOPE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SMALL',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SMALL (${1:array}, ${2:k})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SMALL STATEMENT',
                            range: range,
                        },
                        {
                            label: 'STANDARDIZE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'STANDARDIZE (${1:x}, ${2:mean}, ${3:standard_dev})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'STANDARDIZE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'STDEVA',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'STDEVA (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'STDEVA STATEMENT',
                            range: range,
                        },
                        {
                            label: 'STDEVPA',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'STDEVPA (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'STDEVPA STATEMENT',
                            range: range,
                        },
                        {
                            label: 'STEYX',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'STEYX (${1:known_y}, ${2:known_x})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'STEYX STATEMENT',
                            range: range,
                        },
                        {
                            label: 'TREND',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'TREND (${1:known_ys}, ${2:known_xs}, ${3:new_xs})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'TREND STATEMENT',
                            range: range,
                        },
                        {
                            label: 'TRIMMEAN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'TRIMMEAN (${1:array}, ${2:percent})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'TRIMMEAN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'VARA',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'VARA (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'VARA STATEMENT',
                            range: range,
                        },
                        {
                            label: 'VARPA',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'VARPA (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'VARPA STATEMENT',
                            range: range,
                        },
                        {
                            label: 'ABS',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'ABS (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'ABS STATEMENT',
                            range: range,
                        },
                        {
                            label: 'ACOS',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'ACOS (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'ACOS STATEMENT',
                            range: range,
                        },
                        {
                            label: 'ACOSH',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'ACOSH (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'ACOSH STATEMENT',
                            range: range,
                        },
                        {
                            label: 'ACOT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'ACOT (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'ACOT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'ACOTH',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'ACOTH (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'ACOTH STATEMENT',
                            range: range,
                        },
                        {
                            label: 'AGGREGATE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'AGGREGATE (${1:function_num}, ${2:options}, ${3:ref1}, ${4:ref2})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'AGGREGATE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'ARABIC',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'ARABIC (${1:text})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'ARABIC STATEMENT',
                            range: range,
                        },
                        {
                            label: 'ASIN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'ASIN (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'ASIN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'ASINH',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'ASINH (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'ASINH STATEMENT',
                            range: range,
                        },
                        {
                            label: 'ATAN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'ATAN (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'ATAN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'ATAN2',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'ATAN2 (${1:x_num}, ${2:y_num})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'ATAN2 STATEMENT',
                            range: range,
                        },
                        {
                            label: 'ATANH',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'ATANH (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'ATANH STATEMENT',
                            range: range,
                        },
                        {
                            label: 'BASE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'BASE (${1:number}, ${2:radix}, ${3:min_length})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'BASE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'CEILING',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'CEILING (${1:number}, ${2:significance}, ${3:mode})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'CEILING STATEMENT',
                            range: range,
                        },
                        {
                            label: 'COMBIN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'COMBIN (${1:number}, ${2:number_chosen})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'COMBIN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'COMBINA',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'COMBINA (${1:number}, ${2:number_chosen})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'COMBINA STATEMENT',
                            range: range,
                        },
                        {
                            label: 'COS',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'COS (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'COS STATEMENT',
                            range: range,
                        },
                        {
                            label: 'COSH',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'COSH (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'COSH STATEMENT',
                            range: range,
                        },
                        {
                            label: 'COT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'COT (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'COT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'COTH',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'COTH (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'COTH STATEMENT',
                            range: range,
                        },
                        {
                            label: 'CSC',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'CSC (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'CSC STATEMENT',
                            range: range,
                        },
                        {
                            label: 'CSCH',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'CSCH (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'CSCH STATEMENT',
                            range: range,
                        },
                        {
                            label: 'DECIMAL',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'DECIMAL (${1:text}, ${2:radix})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'DECIMAL STATEMENT',
                            range: range,
                        },
                        {
                            label: 'DEGREES',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'DEGREES (${1:angle})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'DEGREES STATEMENT',
                            range: range,
                        },
                        {
                            label: 'EVEN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'EVEN (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'EVEN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'EXP',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'EXP (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'EXP STATEMENT',
                            range: range,
                        },
                        {
                            label: 'FACT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'FACT (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'FACT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'FACTDOUBLE',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'FACTDOUBLE (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'FACTDOUBLE STATEMENT',
                            range: range,
                        },
                        {
                            label: 'FLOOR',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'FLOOR (${1:number}, ${2:significance})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'FLOOR STATEMENT',
                            range: range,
                        },
                        {
                            label: 'GCD',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'GCD (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'GCD STATEMENT',
                            range: range,
                        },
                        {
                            label: 'INT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'INT (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'INT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'LCM',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'LCM (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'LCM STATEMENT',
                            range: range,
                        },
                        {
                            label: 'LN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'LN (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'LN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'LOG',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'LOG (${1:number}, ${2:base})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'LOG STATEMENT',
                            range: range,
                        },
                        {
                            label: 'LOG10',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'LOG10 (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'LOG10 STATEMENT',
                            range: range,
                        },
                        {
                            label: 'MMULT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'MMULT (${1:array1}, ${2:array2})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'MMULT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'MOD',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'MOD (${1:number}, ${2:divisor})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'MOD STATEMENT',
                            range: range,
                        },
                        {
                            label: 'MROUND',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'MROUND (${1:number}, ${2:multiple})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'MROUND STATEMENT',
                            range: range,
                        },
                        {
                            label: 'MULTINOMIAL',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'MULTINOMIAL (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'MULTINOMIAL STATEMENT',
                            range: range,
                        },
                        {
                            label: 'MUNIT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'MUNIT (${1:dimension})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'MUNIT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'ODD',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'ODD (${1:number:})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'ODD STATEMENT',
                            range: range,
                        },
                        {
                            label: 'PI',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'PI ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'PI STATEMENT',
                            range: range,
                        },
                        {
                            label: 'POWER',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'POWER (${1:number}, ${2:power})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'POWER STATEMENT',
                            range: range,
                        },
                        {
                            label: 'PRODUCT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'PRODUCT (${1:number1}, ${2:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'PRODUCT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'QUOTIENT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'QUOTIENT (${1:numerator}, ${2:denominator})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'QUOTIENT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'RADIANS',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'RADIANS (${1:angle})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'RADIANS STATEMENT',
                            range: range,
                        },
                        {
                            label: 'RAND',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'RAND ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'RAND STATEMENT',
                            range: range,
                        },
                        {
                            label: 'RANDBETWEEN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'RANDBETWEEN (${1:bottom}, ${2:top})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'RANDBETWEEN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'ROMAN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'ROMAN (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'ROMAN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'ROUND',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'ROUND (${1:number}, ${2:num_digits})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'ROUND STATEMENT',
                            range: range,
                        },
                        {
                            label: 'ROUNDDOWN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'ROUNDDOWN (${1:number}, ${2:num_digits})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'ROUNDDOWN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'ROUNDUP',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'ROUNDUP (${1:number}, ${2:num_digits})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'ROUNDUP STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SEC',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SEC (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SEC STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SECH',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SECH (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SECH STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SERIESSUM',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SERIESSUM (${1:x}, ${2:n}, ${3:m}, ${4:coefficients})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SERIESSUM STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SIGN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SIGN (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SIGN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SIN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SIN (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SIN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SINH',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SINH (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SINH STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SQRT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SQRT (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SQRT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SQRTPI',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SQRTPI (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SQRTPI STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SUBTOTAL',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SUBTOTAL (${1:function_num}, ${2:ref1})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SUBTOTAL STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SUM',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SUM ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SUM STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SUMIF',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SUMIF (${1:range}, ${2:criteria}, ${3:sum_range})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SUMIF STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SUMIFS',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SUMIFS ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SUMIFS STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SUMPRODUCT',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SUMPRODUCT ()',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SUMPRODUCT STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SUMSQ',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SUMSQ (${1:args})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SUMSQ STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SUMX2MY2',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SUMX2MY2 (${1:array_x}, ${2:array_y})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SUMX2MY2 STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SUMX2PY2',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SUMX2PY2 (${1:array_x}, ${2:array_y})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SUMX2PY2 STATEMENT',
                            range: range,
                        },
                        {
                            label: 'SUMXMY2',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'SUMXMY2 (${1:array_x}, ${2:array_y})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'SUMXMY2 STATEMENT',
                            range: range,
                        },
                        {
                            label: 'TAN',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'TAN (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'TAN STATEMENT',
                            range: range,
                        },
                        {
                            label: 'TANH',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'TANH (${1:number})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'TANH STATEMENT',
                            range: range,
                        },
                        {
                            label: 'TRUNC',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'TRUNC (${1:number}, ${2:num_digits})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'TRUNC STATEMENT',
                            range: range,
                        }

                    ];
                    for (var i = 0; i < variables.length; i++) {
                        suggestions.push({ label: "$" + variables[i], kind: monaco.languages.CompletionItemKind.Text, insertText: "$" + variables[i], range: range })
                    }

                    return { suggestions: suggestions };
                },
            });

            const validateModel = (model) => {
                const markers = [];
                const keywords = variables + functions;

                for (let i = 1; i < model?.getLineCount() + 1; i++) {
                    const range = {
                        startLineNumber: i,
                        startColumn: 1,
                        endLineNumber: i,
                        endColumn: model.getLineLength(i) + 1,
                    };
                    const content = model.getValueInRange(range).trim();
                    const words = content.split(/\s+/);

                    words.forEach((word, index) => {
                        const wordStartColumn = range.startColumn + content.indexOf(word);
                        const wordEndColumn = wordStartColumn + word.length;

                        if (!word.startsWith('"') &&
                            !word.endsWith('"') &&
                            !isMathOperator(word) &&
                            !word.startsWith('$') &&
                            !word.startsWith('($') &&
                            !word.startsWith('("') &&
                            !word.endsWith('),') &&
                            !word.startsWith('(') &&
                            !keywords.includes(word)
                        ) {
                            markers.push({
                                message: "Word not in double quotes or not in keywords array",
                                severity: monaco.MarkerSeverity.Error,
                                startLineNumber: range.startLineNumber,
                                startColumn: wordStartColumn,
                                endLineNumber: range.startLineNumber,
                                endColumn: wordEndColumn,
                            });
                        }
                    });
                }

                monaco.editor.setModelMarkers(model, "owner", markers);

            }

            // Get the model for the editor
            const model = monaco.editor.getModels()[0];

            // Validate model content initially and on change
            validateModel(model);
            model?.onDidChangeContent(() => {
                validateModel(model);
            });

        }
    }, [monaco]);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
            <div style={{ width: "60%", marginRight: "1rem" }}>
                <Typography.Title level={3} style={{ marginBottom: "1rem" }}>Make Your Rule</Typography.Title>
                <Editor
                    height="40vh"
                    language="mySpecialLanguage"
                    theme='myCoolTheme'
                    value={value}
                    onChange={(value) => setValue(value)}
                    width={"100%"}
                    options={{
                        fontSize: 16,
                      }}
                />
            </div>
            <Evaluator keywords={variables} formulaProp={value} />
        </div>
    );
    
    

}

export default CustomEditor;
