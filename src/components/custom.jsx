import { React, useEffect, useState } from "react";

import Editor, { useMonaco } from '@monaco-editor/react';


function CustomEditor({ variables }) {
    const monaco = useMonaco();
    const [value, setValue] = useState('');
   

    // const abcd = () => {
    //     validate(model);
    // }

    let functions = ['AND', 'FALSE', 'IF', 'IFERROR', 'IFNA', 'IFS', 'NOT', 'OR', 'SWITCH', 'TRUE', 'XOR', 'DATE', 'DATEDIF', 'DATEVALUE', 'DAY', 'DAYS', 'DAYS360', 'EDATE', 'EOMONTH', 'HOUR', 'ISOWEEKNUM', 'MINUTE', 'MONTH', 'NETWORKDAYS', 'NOW', 'SECOND', 'TIME', 'TIMEVALUE', 'TODAY', 'WEEKDAY', 'WEEKNUM', 'WORKDAY', 'YEAR', 'YEARFRAC'];
    useEffect(() => {
        // do conditional chaining
        console.log("value", value);
        monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
        // or make sure that it exists by other ways
        function isMathOperator(word) {
            // List of mathematical operators
            const operators = ['+', '-', '*', '/', '=', '>', '<', '>=', '<=', '==', '!=', '&&', '||', '!', '++', '--', '%', '+=', '-=', '*=', '/=', '(', ')', '{', '}', '[', ']', ',', '.', ':', '?', ';', '+=', '-=', '*=', '/=', '%=', '<<', '>>', '>>>', '&', '|', '^', '~', '>>>'];
            return operators.includes(word);
        }
        if (monaco) {
            console.log('here is the monaco instance:', monaco);
            monaco.languages.register({ id: "mySpecialLanguage" });

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
                },
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
                        }

                    ];
                    for (var i = 0; i < variables.length; i++) {
                        suggestions.push({ label: "$" + variables[i], kind: monaco.languages.CompletionItemKind.Text, insertText: "$" + variables[i], range: range })
                    }

                    return { suggestions: suggestions };
                },
            });
            // const validateModel = (model) => {
            //     const markers = [];
            //     for (let i = 1; i <= model.getLineCount(); i++) {
            //         const lineContent = model.getLineContent(i);
            //         // Your validation logic here
            //         // Example: Check if line contains specific variable
            //         if (lineContent.includes('yourVariable')) {
            //             markers.push({
            //                 message: "Invalid variable",
            //                 severity: monaco.MarkerSeverity.Error,
            //                 startLineNumber: i,
            //                 startColumn: 1,
            //                 endLineNumber: i,
            //                 endColumn: lineContent.length + 1,
            //             });
            //         }
            //     }
            //     monaco.editor.setModelMarkers(model, "owner", markers);
            // };
            const validateModel = (model) => {
                const markers = [];
                const keywords = variables + functions;
    
                for (let i = 1; i < model.getLineCount() + 1; i++) {
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
    
                        if (!word.startsWith('"') && !word.endsWith('"')  && !isMathOperator(word) && !word.startsWith('$') && !word.startsWith('($') && !word.startsWith('("') && !keywords.includes(word)) {
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
            model.onDidChangeContent(() => {
                validateModel(model);
            });
           
            
        }
    }, [monaco]);

    return <Editor 
            height="90vh" 
            defaultValue="// some comment" 
            language="mySpecialLanguage" 
            theme='myCoolTheme' 
            value={value} 
            onChange={(value) => setValue(value)} 
            />;
}

export default CustomEditor;
