import axios from 'axios';

const FormActions = {};

//Session management
FormActions.checkIfLoggedIn = function checkIfLoggedIn(){
    console.log('Checking if the user is logged in or not ......');
    return function(dispatch,state){
        dispatch({type:'CONTACTS_LOADING'});
        var self = this;
        axios.get('/login')
        .then(function(response){
            console.log('displaying login.html =' );
            dispatch({type:'SHOW_LOGIN'});
        })
    
    .catch(function(err){
        dispatch({type:'CONTACTS_FAIL',payload: 'Some error happend'});
    });
    
};
};





FormActions.getAllContacts = function getAllContacts(){
    console.log('in getAllPro');
    return function(dispatch,state){
        dispatch({type:'CONTACTS_LOADING'});
        var self = this;
        axios.get('/contactsList')
        .then(function(response){
            console.log('response =' + JSON.stringify(response));
            dispatch({type:'DISPLAY_CONTACTSLIST',payload : response.data.contactList});
        })
    
    .catch(function(err){
        dispatch({type:'CONTACTS_FAIL',payload: 'Some error happend'});
    });
    
};
};
FormActions.getOneContact = function (id) {
    return function (dispatch, state) {
        console.log('getOneContact id : '+id);
        dispatch({type: 'CONTACT_LOADING'});
        axios.get('/getContact?id=' + id)
            .then(function (response) {
                console.log("response=", response);
                dispatch({type: 'DISPLAY_FORM', payload: response.data});
            })
            .catch(function (err) {
                dispatch({type: 'CONTACT_FAIL', payload: "Some error has happened"});
            });
    }
}

FormActions.updateContact = function(formData){
    console.log('in action creators update');
    return function(dispatch,state){
            dispatch({type : 'CONTACTS_LOADING'});
            axios.post('/updateContact',formData)
            .then(function(response){
                console.log('res',response);
                dispatch({type : 'DISPLAY_CONTACTSLIST' , payload : response.data.contactList});
            })
            .catch(function(err){
                dispatch({type:'CONTACTS_FAIL',errorMessage : 'Some error'});
            });
    }
};
FormActions.addContact = function(newFormData) {
    console.log("from actions.js Adding Contact---", newFormData);
    return function (dispatch, state) {
        dispatch({type: 'CONTACTS_LOADING'});
        axios.post('/addContact', newFormData)
            .then(function (response) {
                console.log("response=", response);
                dispatch({type: 'DISPLAY_CONTACTSLIST', payload: response.data.contactList});
                //dispatch({type: 'ALL_CONTACTS'});
            })
            .catch(function (err) {
                dispatch({type: 'CONTACTS_FAIL', payload: "Some error has happened. We are Working on it."});
            });
    }
};

FormActions.deleteContact = function (id) {
    console.log("id in the deleteContact action in contact actions", id);
    return function (dispatch, state) {
        console.log("dispatch in ContactActions", dispatch);
        dispatch({type: 'CONTACTS_LOADING'});
        axios.post('/deleteContact', {id: id})
            .then(function (response) {
                console.log("response=", response);
                dispatch({type: 'DISPLAY_CONTACTSLIST', payload: response.data.contactList});
            })
            .catch(function (err) {
                dispatch({type: 'CONTACTS_FAIL', payload: "Some error has happened. We are Working on it."});
            });
    }
};


export default FormActions;