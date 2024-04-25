// import React, { useRef } from 'react';
// import ReactDOM from 'react-dom';

// import Editor from '@monaco-editor/react';

// function App() {
//   const monacoRef = useRef(null);

//   function handleEditorWillMount(monaco) {
//     // here is the monaco instance
//     // do something before editor is mounted
//     // monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
//     monaco.languages.register({ id: "mySpecialLanguage" });

// // Register a tokens provider for the language
// let keywords = ['maurya', 'tanmay', 'class', 'new', 'IF', 'arsh'];

// monaco.languages.setMonarchTokensProvider("mySpecialLanguage", {
// 	keywords,
// 	tokenizer: {
// 		root: [
// 			[/\[error.*/, "custom-error"],
// 			[/\[notice.*/, "custom-notice"],
// 			[/\[info.*/, "custom-info"],
// 			[/\[[a-zA-Z 0-9:]+\]/, "custom-date"],
// 			[/@?[a-zA-Z][\w$]*/, {
// 				cases :{
// 					'@keywords': 'keyword',
// 					'@default': 'variable',
// 				}
// 			}],
// 			[/".*?"/, 'string'],
// 			[/\/\//, 'comment'],
// 		]
// 	},
// });
//   }

//   function handleEditorDidMount(editor, monaco) {
//     // here is another way to get monaco instance
//     // you can also store it in `useRef` for further usage
    // monaco.editor.defineTheme("myCoolTheme", {
    //   base: "vs",
    //   inherit: false,
    //   rules: [
    //     { token: "custom-info", foreground: "808080" },
    //     { token: "custom-error", foreground: "ff0000", fontStyle: "bold" },
    //     { token: "custom-notice", foreground: "FFA500" },
    //     { token: "custom-date", foreground: "008800" },
    //     {token: "keyword", foreground: "008800", fontStyle: "bold"}
    
    //   ],
    //   colors: {
    //     "editor.foreground": "#000000",
    //   },
    // });
    // monaco.languages.registerHoverProvider("mySpecialLanguage", {
    //   provideHover: (model, position) => {
    //     const word = model.getWordAtPosition(position);
    //     if (word && word.word === "IF") {
    //       return {
    //         contents: [
    //           { value: "**IF Statement**" },
    //           { value: "Specifies a logical test to perform." },
    //           { value: "Syntax: IF(logical_expression, value_if_true, value_if_false)" }
    //         ]
    //       };
    //     }
    //     return null;
    //   }
    // });
    // monaco.languages.registerCompletionItemProvider("mySpecialLanguage", {
    //   provideCompletionItems: (model, position) => {
    //     var word = model.getWordUntilPosition(position);
    //     var range = {
    //       startLineNumber: position.lineNumber,
    //       endLineNumber: position.lineNumber,
    //       startColumn: word.startColumn,
    //       endColumn: word.endColumn,
    //     };
    //     var suggestions = [
    //       {
    //         label: "simpleText",
    //         kind: monaco.languages.CompletionItemKind.Text,
    //         insertText: "simpleText",
    //         range: range,
    //       },
    //       {
    //         label: "testing",
    //         kind: monaco.languages.CompletionItemKind.Keyword,
    //         insertText: "testing(${1:condition})",
    //         insertTextRules:
    //           monaco.languages.CompletionItemInsertTextRule
    //             .InsertAsSnippet,
    //         range: range,
    //       },
    //       {
    //         label: "ifelse",
    //         kind: monaco.languages.CompletionItemKind.Snippet,
    //         insertText: [
    //           "if (${1:condition}) {",
    //           "\t$0",
    //           "} else {",
    //           "\t",
    //           "}",
    //         ].join("\n"),
    //         insertTextRules:
    //           monaco.languages.CompletionItemInsertTextRule
    //             .InsertAsSnippet,
    //         documentation: "If-Else Statement",
    //         range: range,
    //       },
    //       {
    //         label: "IFERROR",
    //         kind: monaco.languages.CompletionItemKind.Snippet,
    //         insertText: 
    //           "IFERROR  (${1:value}, ${2:value_if_error})"
    //         ,
    //         insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    //         documentation: "IF Statement",
    //         range: range,
    //       },
    //       {label: 'IF',
    //        kind: monaco.languages.CompletionItemKind.Snippet,
    //        insertText: 'IF (${1:logical_test}, ${2:value_if_true}, ${3:value_if_false})', 
    //        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    //        documentation: 'IF STATEMENT', 
    //        range: range,
    //        }
          
    //     ];
    //     return { suggestions: suggestions };
    //   },
    // });
//     monacoRef.current = monaco;
//   }

//   return (
//     <Editor
//       height="90vh"
//       language='mySpecialLanguage'
//       theme="myCoolTheme"
//       defaultValue="// some comment"
//       beforeMount={handleEditorWillMount}
//       onMount={handleEditorDidMount}
//     />
//   );
// }

// export default App;

import React, { useEffect } from 'react';
import CustomEditor from './components/custom';
import Evaluator from './components/evaluator';


// import Editor, { useMonaco } from '@monaco-editor/react';

// function App() {
//   const monaco = useMonaco();

//   useEffect(() => {
//     // do conditional chaining
//     monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
//     let keywords = ['maurya', 'tanmay', 'class', 'new', 'IF', 'arsh'];
//     // or make sure that it exists by other ways
//     if (monaco) {
//       console.log('here is the monaco instance:', monaco);
//       monaco.languages.register({ id: "mySpecialLanguage" });

//       monaco.languages.setMonarchTokensProvider("mySpecialLanguage", {
//         keywords,
//         tokenizer: {
//           root: [
//             [/\[error.*/, "custom-error"],
//             [/\[notice.*/, "custom-notice"],
//             [/\[info.*/, "custom-info"],
//             [/\[[a-zA-Z 0-9:]+\]/, "custom-date"],
//             [/@?[a-zA-Z][\w$]*/, {
//               cases :{
//                 '@keywords': 'keyword',
//                 '@default': 'variable',
//               }
//             }],
//             [/".*?"/, 'string'],
//             [/\/\//, 'comment'],
//           ]
//         },
//       });

//       monaco.editor.defineTheme("myCoolTheme", {
//         base: "vs",
//         inherit: false,
//         rules: [
//           { token: "custom-info", foreground: "808080" },
//           { token: "custom-error", foreground: "ff0000", fontStyle: "bold" },
//           { token: "custom-notice", foreground: "FFA500" },
//           { token: "custom-date", foreground: "008800" },
//           {token: "keyword", foreground: "008800", fontStyle: "bold"}
      
//         ],
//         colors: {
//           "editor.foreground": "#000000",
//         },
//       });
//       monaco.languages.registerHoverProvider("mySpecialLanguage", {
//         provideHover: (model, position) => {
//           const word = model.getWordAtPosition(position);
//           if (word && word.word === "IF") {
//             return {
//               contents: [
//                 { value: "**IF Statement**" },
//                 { value: "Specifies a logical test to perform." },
//                 { value: "Syntax: IF(logical_expression, value_if_true, value_if_false)" }
//               ]
//             };
//           }
//           return null;
//         }
//       });
//       monaco.languages.registerCompletionItemProvider("mySpecialLanguage", {
//         provideCompletionItems: (model, position) => {
//           var word = model.getWordUntilPosition(position);
//           var range = {
//             startLineNumber: position.lineNumber,
//             endLineNumber: position.lineNumber,
//             startColumn: word.startColumn,
//             endColumn: word.endColumn,
//           };
//           var suggestions = [
//             {
//               label: "simpleText",
//               kind: monaco.languages.CompletionItemKind.Text,
//               insertText: "simpleText",
//               range: range,
//             },
//             {
//               label: "testing",
//               kind: monaco.languages.CompletionItemKind.Keyword,
//               insertText: "testing(${1:condition})",
//               insertTextRules:
//                 monaco.languages.CompletionItemInsertTextRule
//                   .InsertAsSnippet,
//               range: range,
//             },
//             {
//               label: "ifelse",
//               kind: monaco.languages.CompletionItemKind.Snippet,
//               insertText: [
//                 "if (${1:condition}) {",
//                 "\t$0",
//                 "} else {",
//                 "\t",
//                 "}",
//               ].join("\n"),
//               insertTextRules:
//                 monaco.languages.CompletionItemInsertTextRule
//                   .InsertAsSnippet,
//               documentation: "If-Else Statement",
//               range: range,
//             },
//             {
//               label: "IFERROR",
//               kind: monaco.languages.CompletionItemKind.Snippet,
//               insertText: 
//                 "IFERROR  (${1:value}, ${2:value_if_error})"
//               ,
//               insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//               documentation: "IF Statement",
//               range: range,
//             },
//             {label: 'IF',
//              kind: monaco.languages.CompletionItemKind.Snippet,
//              insertText: 'IF (${1:logical_test}, ${2:value_if_true}, ${3:value_if_false})', 
//              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
//              documentation: 'IF STATEMENT', 
//              range: range,
//              }
            
//           ];
//           return { suggestions: suggestions };
//         },
//       });



//     }
//   }, [monaco]);

//   return <Editor height="90vh" defaultValue="// some comment" language="mySpecialLanguage" theme='myCoolTheme'/>;
// }

function App(){
  let variables = ['maurya', 'tanmay', 'class', 'new', 'arsh'];
  let functions = ['IF', 'DATEDIF']
  return (
    <>
     <CustomEditor variables={variables}/>
      {/* <Evaluator keywords={variables}/> */}
    </>
   
  )
}
export default App;
