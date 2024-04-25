import React, { useState } from 'react';
import * as formulajs from '@formulajs/formulajs' // import entire package

import { DATE } from '@formulajs/formulajs';
import { DATEDIF } from '@formulajs/formulajs';
import { DATEVALUE } from '@formulajs/formulajs';
import { DAY } from '@formulajs/formulajs';
import { DAYS } from '@formulajs/formulajs';
import { DAYS360 } from '@formulajs/formulajs';
import { EDATE } from '@formulajs/formulajs';
import { EOMONTH } from '@formulajs/formulajs';
import { HOUR } from '@formulajs/formulajs';
import { ISOWEEKNUM } from '@formulajs/formulajs';
import { MINUTE } from '@formulajs/formulajs';
import { MONTH } from '@formulajs/formulajs';
import { NETWORKDAYS } from '@formulajs/formulajs';
import { NOW } from '@formulajs/formulajs';
import { SECOND } from '@formulajs/formulajs';
import { TIME } from '@formulajs/formulajs';
import { TIMEVALUE } from '@formulajs/formulajs';
import { TODAY } from '@formulajs/formulajs';
import { WEEKDAY } from '@formulajs/formulajs';
import { WEEKNUM } from '@formulajs/formulajs';
import { WORKDAY } from '@formulajs/formulajs';
import { YEAR } from '@formulajs/formulajs';
import { YEARFRAC } from '@formulajs/formulajs';
import { AND } from '@formulajs/formulajs';
import { FALSE } from '@formulajs/formulajs';
import { IF } from '@formulajs/formulajs';
import { IFERROR } from '@formulajs/formulajs';
import { IFNA } from '@formulajs/formulajs';
import { IFS } from '@formulajs/formulajs';
import { NOT } from '@formulajs/formulajs';
import { OR } from '@formulajs/formulajs';
import { SWITCH } from '@formulajs/formulajs';
import { TRUE } from '@formulajs/formulajs';
import { XOR } from '@formulajs/formulajs';
import { ASC } from '@formulajs/formulajs';
import { BAHTTEXT } from '@formulajs/formulajs';
import { CHAR } from '@formulajs/formulajs';
import { CLEAN } from '@formulajs/formulajs';
import { CODE } from '@formulajs/formulajs';
import { CONCATENATE } from '@formulajs/formulajs';
import { DBCS } from '@formulajs/formulajs';
import { DOLLAR } from '@formulajs/formulajs';
import { EXACT } from '@formulajs/formulajs';
import { FIND } from '@formulajs/formulajs';
import { FIXED } from '@formulajs/formulajs';
import { LEFT } from '@formulajs/formulajs';
import { LEN } from '@formulajs/formulajs';
import { LOWER } from '@formulajs/formulajs';
import { MID } from '@formulajs/formulajs';
import { NUMBERVALUE } from '@formulajs/formulajs';
import { PRONETIC } from '@formulajs/formulajs';
import { PROPER } from '@formulajs/formulajs';
import { REPLACE } from '@formulajs/formulajs';
import { REPT } from '@formulajs/formulajs';
import { RIGHT } from '@formulajs/formulajs';
import { SEARCH } from '@formulajs/formulajs';
import { SUBSTITUTE } from '@formulajs/formulajs';
import { T } from '@formulajs/formulajs';
import { TEXT } from '@formulajs/formulajs';
import { TEXTJOIN } from '@formulajs/formulajs';
import { TRIM } from '@formulajs/formulajs';
import { UPPER } from '@formulajs/formulajs';
import { VALUE } from '@formulajs/formulajs';






export default function Evaluator({ keywords, formulaProp }) {
    // State to store the values of keyword inputs
    console.log("getting the formula",formulaProp)
    const [keywordValues, setKeywordValues] = useState({});

    // Function to handle changes in keyword input values
    const handleKeywordValueChange = (keyword, value) => {
        setKeywordValues(prevState => ({
            ...prevState,
            [keyword]: value
        }));
    };

    // Function to handle changes in the formula input


    // Function to replace keyword placeholders with their values in the formula
    const replaceKeywordsInFormula = () => {
        let updatedFormula = formulaProp;
        // Replace each keyword placeholder with its value
        Object.entries(keywordValues).forEach(([keyword, value]) => {
            const regex = new RegExp(`\\$${keyword}`, 'g');
            updatedFormula = updatedFormula.replace(regex, value);
        });
        return updatedFormula;
    };

    // Function to evaluate the formula
    const evaluateFormula = () => {
        // Replace keyword placeholders with their values in the formula
        const updatedFormula = replaceKeywordsInFormula();

        // Evaluate the updated formula
        // You can implement your own evaluation logic here
        
        // console.log('Updated Formula:', updatedFormula);
        console.log(eval(updatedFormula));
    };

    return (
        <div>
            {/* Input for entering the formula */}

            {keywords.map(keyword => (
                <div key={keyword}>
                    {/* Display keyword label */}
                    <label htmlFor={keyword}>{keyword}:</label>
                    {/* Input for keyword value */}
                    <input
                        type="text"
                        id={keyword}
                        value={keywordValues[keyword] || ''}
                        onChange={(e) => handleKeywordValueChange(keyword, e.target.value)}
                    />
                </div>
            ))}
            {/* Button to evaluate the formula */}
            <button onClick={evaluateFormula}>Evaluate Formula</button>
        </div>
    );
}
