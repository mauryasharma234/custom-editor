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
import { AVEDEV } from '@formulajs/formulajs';
import { AVERAGE } from '@formulajs/formulajs';
import { AVERAGEA } from '@formulajs/formulajs';
import { AVERAGEIF } from '@formulajs/formulajs';
import { AVERAGEIFS } from '@formulajs/formulajs';
import { CORREL } from '@formulajs/formulajs';
import { COUNT } from '@formulajs/formulajs';
import { COUNTA } from '@formulajs/formulajs';
import { COUNTBLANK } from '@formulajs/formulajs';
import { COUNTIF } from '@formulajs/formulajs';
import { COUNTIFS } from '@formulajs/formulajs';
import { DEVSQ } from '@formulajs/formulajs';
import { FISHER } from '@formulajs/formulajs';
import { FISHERINV } from '@formulajs/formulajs';
import { FORECAST } from '@formulajs/formulajs';
import { FREQUENCY } from '@formulajs/formulajs';
import { GAMMA } from '@formulajs/formulajs';
import { GAMMALN } from '@formulajs/formulajs';
import { GAUSS } from '@formulajs/formulajs';
import { GEOMEAN } from '@formulajs/formulajs';
import { GROWTH } from '@formulajs/formulajs';
import { HARMEAN } from '@formulajs/formulajs';
import { INTERCEPT } from '@formulajs/formulajs';
import { KURT } from '@formulajs/formulajs';
import { LARGE } from '@formulajs/formulajs';
import { LINEST } from '@formulajs/formulajs';
import { LOGEST } from '@formulajs/formulajs';
import { MAX } from '@formulajs/formulajs';
import { MAXA } from '@formulajs/formulajs';
import { MAXIFS } from '@formulajs/formulajs';
import { MEDIAN } from '@formulajs/formulajs';
import { MIN } from '@formulajs/formulajs';
import { MINA } from '@formulajs/formulajs';
import { MINIFS } from '@formulajs/formulajs';
import { PEARSON } from '@formulajs/formulajs';
import { PERMUT } from '@formulajs/formulajs';
import { PERMUTATIONA } from '@formulajs/formulajs';
import { PHI } from '@formulajs/formulajs';
import { PROB } from '@formulajs/formulajs';
import { ROW } from '@formulajs/formulajs';
import { RSQ } from '@formulajs/formulajs';
import { SKEW } from '@formulajs/formulajs';
import { SLOPE } from '@formulajs/formulajs';
import { SMALL } from '@formulajs/formulajs';
import { STANDARDIZE } from '@formulajs/formulajs';
import { STDEVA } from '@formulajs/formulajs';
import { STDEVPA } from '@formulajs/formulajs';
import { STEYX } from '@formulajs/formulajs';
import { TREND } from '@formulajs/formulajs';
import { TRIMMEAN } from '@formulajs/formulajs';
import { VARA } from '@formulajs/formulajs';
import { VARPA } from '@formulajs/formulajs';
import { ABS } from '@formulajs/formulajs';
import { ACOS } from '@formulajs/formulajs';
import { ACOSH } from '@formulajs/formulajs';
import { ACOT } from '@formulajs/formulajs';
import { ACOTH } from '@formulajs/formulajs';
import { AGGREGATE } from '@formulajs/formulajs';
import { ARABIC } from '@formulajs/formulajs';
import { ASIN } from '@formulajs/formulajs';
import { ASINH } from '@formulajs/formulajs';
import { ATAN } from '@formulajs/formulajs';
import { ATAN2 } from '@formulajs/formulajs';
import { ATANH } from '@formulajs/formulajs';
import { BASE } from '@formulajs/formulajs';
import { CEILING } from '@formulajs/formulajs';
import { COMBIN } from '@formulajs/formulajs';
import { COMBINA } from '@formulajs/formulajs';
import { COS } from '@formulajs/formulajs';
import { COSH } from '@formulajs/formulajs';
import { COT } from '@formulajs/formulajs';
import { COTH } from '@formulajs/formulajs';
import { CSC } from '@formulajs/formulajs';
import { CSCH } from '@formulajs/formulajs';
import { DECIMAL } from '@formulajs/formulajs';
import { DEGREES } from '@formulajs/formulajs';
import { EVEN } from '@formulajs/formulajs';
import { EXP } from '@formulajs/formulajs';
import { FACT } from '@formulajs/formulajs';
import { FACTDOUBLE } from '@formulajs/formulajs';
import { FLOOR } from '@formulajs/formulajs';
import { GCD } from '@formulajs/formulajs';
import { INT } from '@formulajs/formulajs';
import { LCM } from '@formulajs/formulajs';
import { LN } from '@formulajs/formulajs';
import { LOG } from '@formulajs/formulajs';
import { LOG10 } from '@formulajs/formulajs';
import { MMULT } from '@formulajs/formulajs';
import { MOD } from '@formulajs/formulajs';
import { MROUND } from '@formulajs/formulajs';
import { MULTINOMIAL } from '@formulajs/formulajs';
import { MUNIT } from '@formulajs/formulajs';
import { ODD } from '@formulajs/formulajs';
import { PI } from '@formulajs/formulajs';
import { POWER } from '@formulajs/formulajs';
import { PRODUCT } from '@formulajs/formulajs';
import { QUOTIENT } from '@formulajs/formulajs';
import { RADIANS } from '@formulajs/formulajs';
import { RAND } from '@formulajs/formulajs';
import { RANDBETWEEN } from '@formulajs/formulajs';
import { ROMAN } from '@formulajs/formulajs';
import { ROUND } from '@formulajs/formulajs';
import { ROUNDDOWN } from '@formulajs/formulajs';
import { ROUNDUP } from '@formulajs/formulajs';
import { SEC } from '@formulajs/formulajs';
import { SECH } from '@formulajs/formulajs';
import { SERIESSUM } from '@formulajs/formulajs';
import { SIGN } from '@formulajs/formulajs';
import { SIN } from '@formulajs/formulajs';
import { SINH } from '@formulajs/formulajs';
import { SQRT } from '@formulajs/formulajs';
import { SQRTPI } from '@formulajs/formulajs';
import { SUBTOTAL } from '@formulajs/formulajs';
import { SUM } from '@formulajs/formulajs';
import { SUMIF } from '@formulajs/formulajs';
import { SUMIFS } from '@formulajs/formulajs';
import { SUMPRODUCT } from '@formulajs/formulajs';
import { SUMSQ } from '@formulajs/formulajs';
import { SUMX2MY2 } from '@formulajs/formulajs';
import { SUMX2PY2 } from '@formulajs/formulajs';
import { SUMXMY2 } from '@formulajs/formulajs';
import { TAN } from '@formulajs/formulajs';
import { TANH } from '@formulajs/formulajs';
import { TRUNC } from '@formulajs/formulajs';

import { Button, Typography, Checkbox, Form, Input } from 'antd';
// import { Button, Checkbox, Form, Input } from 'antd';






export default function Evaluator({ keywords, formulaProp }) {
    // State to store the values of keyword inputs
    console.log("getting the formula", formulaProp)
    const [keywordValues, setKeywordValues] = useState({});
    const [result, setResult] = useState();

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
        console.log("after updateing", updatedFormula)
        console.log(eval(updatedFormula));
        setResult(eval(updatedFormula));
        // return eval(updatedFormula);

    };

    return (
        <div>
            {/* <h1>Enter values for the fields</h1> */}
            <Typography.Title level={3}>Enter values for the fields</Typography.Title>
            {/* Input for entering the formula */}
            {keywords.map(keyword => (
                <div key={keyword}>
                    {/* Display keyword label */}
                    {/* <label style = {{marginRight: "5px"}}htmlFor={keyword}>{keyword}:</label> */}
                    {/* Input for keyword value */}
                    {/* <input
                        type="text"
                        id={keyword}
                        value={keywordValues[keyword] || ''}
                        onChange={(e) => handleKeywordValueChange(keyword, e.target.value)}
                        style={{marginBottom: '10px'}}
                    /> */}
                    <Form.Item
                        label={keyword}
                        name={keyword}
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'Please input your username!',
                        //     },
                        // ]}
                    >
                        <Input 
                            id = {keyword}
                            value = {keywordValues[keyword] || ''}
                            onChange={(e) => handleKeywordValueChange(keyword, e.target.value)}
                            type='text'
                        />
                    </Form.Item>
                </div>
            ))}
            {/* Button to evaluate the formula */}
            {/* <button style = {{marginTop: '10px'}} onClick={evaluateFormula} >Evaluate Formula</button> */}
            <Button onClick={evaluateFormula} type='primary'>Evaluate Rule</Button>
            <div style={{ marginTop: '20px' }}>
                {result !== undefined ? (
                    <Typography.Title level={4}>Result: {result}</Typography.Title>
                ) : null}
            </div>

        </div>

    );
}
