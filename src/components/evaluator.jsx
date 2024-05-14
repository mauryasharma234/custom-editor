import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Typography } from 'antd';
const { Option } = Select;
import "../globalFunctions.js"

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
    useEffect(() => {
        console.log("Keywords", keywordValues)
    }, [keywordValues])

    // Function to handle changes in the formula input


    // Function to replace keyword placeholders with their values in the formula
    const replaceKeywordsInFormula = () => {
        let updatedFormula = formulaProp;
        // Replace each keyword placeholder with its value
        Object.entries(keywordValues).forEach(([keyword, value]) => {
            const regex = new RegExp(`\\$${keyword}`, 'g');
            console.log("field type for ", keyword, keywordValues[`${keyword}_fieldType`]   )
            if(keywordValues[`${keyword}_fieldType`] === "string" || keywordValues[`${keyword}_fieldType`] === undefined){
                value = `"${value}"`
            }
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
        console.log("after updating", updatedFormula)
        console.log(eval(updatedFormula));
        setResult(eval(updatedFormula));
        // return eval(updatedFormula);

    };
    const handleFieldTypeChange = (keyword, fieldType) => {
        setKeywordValues(prevState => ({
            ...prevState,
            [`${keyword}_fieldType`]: fieldType ? fieldType : 'string'
        }));
    };

    return (
        <div>
            {/* <h1>Enter values for the fields</h1> */}
            <Typography.Title level={3}>Enter values for the fields</Typography.Title>
            {/* Input for entering the formula */}
            {keywords.map(keyword => (
                <div key={keyword} style={{display: "flex", gap: "8px"}}>
                    <Form.Item
                        label={keyword}
                        name={keyword}
                    >
                        <Input 
                            id = {keyword}
                            value = {keywordValues[keyword] || ''}
                            onChange={(e) => handleKeywordValueChange(keyword, e.target.value)}
                            type='text'
                        />
                    </Form.Item>
                    <Form.Item>
                        <Select
                            defaultValue="string"
                            onChange={(value) => handleFieldTypeChange(keyword, value)}
                        >
                            <Option value="string">String</Option>
                            <Option value="number">Number</Option>
                            <Option value="date">Date</Option>
                        </Select>
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
