const inquirer = require('inquirer');

// This function returns a string.
const askUserFor = function( request ) {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'response',
                message: `Please provide ${request}.`,
                validate: response => {
                if (response) {
                    return true;
                } else {
                    console.log('Please enter a valid response.');
                    return false;
                }}
            },
        ])
        .then( function( result ){
            return result.response;
        })
    }  

// This function returns a string that is error-checked for email formatting.
const askUserForEmail = function( request ) {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'response',
                message: `Please provide ${request}.`,
                validate: function (email) {  
                    valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        
                    if (valid) {
                        return true;
                    } else {
                        console.log(".  Please enter a valid email")
                        return false;
                    }
                }
            },
        ])
        .then( function( result ){
            return result.response;
        })
    }  
        
// This function returns one of the choices provided in an array of strings.
const askUserToSelect = function( request, choices ) {
    return inquirer
        .prompt([
            {
                type: 'list',
                message: `Please select ${request}.`,
                name: 'selection',
                choices: choices,
            },
        ])
        .then( function( result ){
            return result.selection;
        })
    }  

// This function returns the index of one of the choices provided in an array of strings.
const askUserToSelectAndGetIndex = function( request, choices ) {
    return inquirer
        .prompt([
            {
                type: 'list',
                message: `Please select ${request}.`,
                name: 'selection',
                choices: choices,
            },
        ])
        .then( function( result ){
            // throw error if choices array has duplicates that match choice
            let indexMatch = choices.reduce( function( a, e, i ) {
                if ( e === result.selection )
                    a.push( i );
                return a;
            }, []);
            if ( indexMatch.length !== 1 ) { throw err };
            // return index
            return indexMatch[ 0 ];
        })
    }  


// This function returns a boolean value.  Default is Y (i.e., true).    
const askUserToDecide = function( request ) {
    return inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'confirmation',
                message: request,
            }
        ])
        .then( function( result ) {
            return result.confirmation;
        })
    }    

module.exports = {
    askUserFor,
    askUserForEmail,
    askUserToSelect,
    askUserToSelectAndGetIndex,
    askUserToDecide,
}