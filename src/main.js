

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore ,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';



import App from './js/components/App.jsx';

const securityMiddleware = function securityMiddleware(store) {
    return function (next) {
      return function (action) {
        // alert dismissal things here...
        console.log("im securityMiddleware");
        if(typeof action == 'function'){
            console.log("security voilation happend..but executing next action", action);
            return next(action);
        }
        return next(action);
      };
    };
};

function mainReducer(state , action){

    console.log('in main reducer');
    if(typeof state === 'undefined'){
        return {
            isLoading : false ,
            isSuccess : false ,
            contacts : [] , 
            errorMessage : 'Loading...',
            view :'list'
        };
    }
    switch(action.type){
        case 'DISPLAY_CONTACTSLIST' :
        return {
            isLoading : false ,
            isSuccess : true ,
            contacts : action.payload , 
            errorMessage : '',
            view :'list'
        };
        case 'CONTACTS_LOADING':
            return {
                isLoading: true,
                isSuccess: false,
                contacts:[{'id':''}],
                errorMessage:"",
                view :''
            };
            case 'CONTACTS_FAIL':
            return {
                isLoading: false,
                isSuccess: false,
                errorMessage:action.payload,
                contacts:[],
                view :''
            };
            case 'SHOW_LOGIN' : 
            return {
                isLoading :false,
                isSuccess : false , 
                contacts : [] ,
                errorMessage : '',
                view : 'login'
            }
            case 'DISPLAY_FORM':
            console.log('in display form case - reducer')
            const newState4 = JSON.parse(JSON.stringify(state));
            newState4.isLoading =false;
            newState4.view ='form';
            newState4.contacts = action.payload;
            // newState4.contacts = [{"fname":"","lname":"","email":"","phone":"","wphone":"","addr1":"","addr2":"","city":"","id":"","state":"","gender":"","zip":"","textArea":"","lang":""}];
            return newState4;
            
            case 'ALL_CONTACTS' : 
            console.log('all contacts after clicking cancel')
            const newState5 =  Object.assign({}, state);
            newState5.view = 'list';
            newState5.contacts = {};
            console.log('after state is changed : '+JSON.stringify(store.getState()))
            return newState5;
            
        default :  return state;
    }
   
}

const initialState = {
    isLoading : false ,
    isSuccess : true ,
    contacts : [{'id':''}], 
    errorMessage : '',
    view :'list'
};

const store = createStore(mainReducer , initialState , applyMiddleware(logger,thunk));
store.dispatch(function(){return true});

function render(){

    console.log(JSON.stringify(store.getState()));
    ReactDOM.render(
        <Provider store={store}>
        <App />
        </Provider> , document.getElementById('main')
    );
}

render();


console.log('Hello world ... now webpack');
