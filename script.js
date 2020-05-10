/////////////////////////////////////////////////////////////////////////////////////////
// Лабораторная работа №1 по дисциплине ЛОИС
// Костяная Юлия Хамидовна, 721701
// Вариант F: Проверить является ли формула ДНФ
// Алгоритм упрощения формулы взят у студента гр. 721702 Икбаева Егора

"use strict";

let resultFieldInputMod;
let formulaFieldInputMod;
let resultFieldTestingMod;
let formulaFieldTestingMod;
let repeatedSymbol;

const BINARY_FORMULA = "B";
const DISJUNCTION_SYMBOL = "|";
const VALID_VARIABLES_SYMBOLS = "[A-Z]";
const ATOMIC_SYMBOL_PATTERN = `(${VALID_VARIABLES_SYMBOLS}|\\(!${VALID_VARIABLES_SYMBOLS}\\))`;
const DISJUNCTION_PATTERN = `\\(${ATOMIC_SYMBOL_PATTERN}&${ATOMIC_SYMBOL_PATTERN}\\)`;
const CONJUCTION_PATTERN = `\\(${ATOMIC_SYMBOL_PATTERN}\\|${ATOMIC_SYMBOL_PATTERN}\\)`;
const SAVE_PATTERN = `\\(!${CONJUCTION_PATTERN}\\)|\\(!${DISJUNCTION_PATTERN}\\)`

const ALL_SYMBOLS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const ALL_RELATIONS = ["&", "|"];

function myMain(){
    resultFieldInputMod = document.getElementById("result");
    formulaFieldInputMod = document.getElementById("formula");
    formulaFieldTestingMod = document.getElementById("testFormula");
    let formula = formulaFieldInputMod.value;
    let result = checkFormula(formula);
    if (result){
        resultFieldInputMod.innerText = "Формула является ДНФ";
    } else {
        resultFieldInputMod.innerText = "Формула не является ДНФ";
    }
}

function checkFormula(formula){
    let formulaSave = checkValidation(formula, SAVE_PATTERN);
    if (formulaSave != formula) return false
    let singleLetter = checkValidation(formula, VALID_VARIABLES_SYMBOLS);
    if (singleLetter == BINARY_FORMULA) return true
    let simplifiedDisjunctions = checkValidation(formula, DISJUNCTION_PATTERN);
    if (simplifiedDisjunctions == BINARY_FORMULA) return true
    let simplifiedConjunctions = checkValidation(simplifiedDisjunctions, CONJUCTION_PATTERN);
    return simplifiedConjunctions == BINARY_FORMULA;
}

function testKnowledge(obj){
    resultFieldTestingMod = document.getElementById("testResult");
    formulaFieldTestingMod = document.getElementById("testFormula");
    let formula = formulaFieldTestingMod.textContent;
    let result = checkFormula(formula);
    if(result == true && obj.id == "buttonYes"){
        resultFieldTestingMod.innerText = "Правильно"
    } else if (result == false && obj.id == "buttonNo") {
        resultFieldTestingMod.innerText = "Правильно"
    } else {
        resultFieldTestingMod.innerText = "Неправильно"
    }
}

function checkValidation(formula, pattern) {
    let previousFormula;
    while (1){
        previousFormula = formula;
        formula = formula.replace(new RegExp(pattern), BINARY_FORMULA);
        if (previousFormula == formula) break;
    }
    return formula;
}

function createFormula(){
    resultFieldTestingMod.innerText = "";
    let formula = createSimpleFormula();
    createFormulaRecursion(formula);
}

function createSimpleFormula(){
    let firstSymbol = ALL_SYMBOLS[getRandomInt(ALL_SYMBOLS.length)];
    let secondSymbol = ALL_SYMBOLS[getRandomInt(ALL_SYMBOLS.length)];
    let relation = ALL_RELATIONS[getRandomInt(ALL_RELATIONS.length)];
    let formula = "(" + firstSymbol + relation + secondSymbol + ")";
    return formula;
}

function createFormulaRecursion(formula){
    let arrayAfterSplit = formula.split("");
    let arrayOfSymbols = arrayAfterSplit.filter(element => element.match(VALID_VARIABLES_SYMBOLS) != null);
    let elementToReplace = arrayOfSymbols[getRandomInt(arrayOfSymbols.length)];
    formula = formula.replace(elementToReplace, createSimpleFormula);
    if (getRandomInt(2) == 0){
        formulaFieldTestingMod.innerText = formula;
    } else {
        createFormulaRecursion(formula);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
