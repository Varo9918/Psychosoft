var CLIENT_ID="914885265165-vpiajsisucrudse5sovrcbc10nfo77sc.apps.googleusercontent.com",API_KEY="AIzaSyClp9LDTu2nxYnkbTO6P-e1879KCx3ylCY",DISCOVERY_DOCS=["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],SCOPES="https://www.googleapis.com/auth/calendar",EVENT_ID="este es el mensaje",authorizeButton=document.getElementById("authorize_button"),signoutButton=document.getElementById("signout_button"),addEvent=document.getElementById("addToCalendar");function handleClientLoad(){gapi.load("client:auth2",initClient)}function initClient(){gapi.client.init({apiKey:API_KEY,clientId:CLIENT_ID,discoveryDocs:DISCOVERY_DOCS,scope:SCOPES}).then(function(){gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus),authorizeButton.onclick=handleAuthClick,signoutButton.onclick=handleSignoutClick,updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())},function(e){appendPre(JSON.stringify(e,null,2))})}function updateSigninStatus(e){e?(authorizeButton.style.display="none",signoutButton.style.display="none",addEvent.style.display="none"):(authorizeButton.click(),signoutButton.style.display="none")}function handleAuthClick(e){gapi.auth2.getAuthInstance().signIn()}function handleSignoutClick(e){gapi.auth2.getAuthInstance().signOut()}function appendPre(e){console.log(e)}function getMonth(e){return e.toString().length<2?"0"+e:e}function getDayOrTime(e){return e.toString().length<2?"0"+e:e}function cleanFields(){$("#txtID").val(""),$("#txtTitulo").val(""),$("#txtDescripcion").val(""),$("#txtColor").val("#000000"),$("#fechaInicio").val(""),$("#fechaFin").val(""),$("#horaInicio").val(""),$("#horaFin").val(""),$("#btnModificar").show(),$("#btnEliminar").show(),$("#btnAgregar").show()}function getValuesGUI(e,t){let n=$("#fechaInicio").val()+" "+$("#horaInicio").val(),a=$("#fechaFin").val()+" "+$("#horaFin").val(),i={};return Date.parse(n)<Date.parse(a)&&"DELETE"!==e?i={id:$("#txtID").val(),titulo:$("#txtTitulo").val(),descripcion:$("#txtDescripcion").val(),color:$("#txtColor").val(),textColor:"#FFFFFF",inicio:$("#fechaInicio").val()+" "+$("#horaInicio").val(),fin:$("#fechaFin").val()+" "+$("#horaFin").val(),idEventGoogle:t,_token:$("meta[name='csrf-token']").attr("content"),_method:e}:"DELETE"===e?i={id:$("#txtID").val(),titulo:$("#txtTitulo").val(),descripcion:$("#txtDescripcion").val(),color:$("#txtColor").val(),textColor:"#FFFFFF",inicio:$("#fechaInicio").val()+" "+$("#horaInicio").val(),fin:$("#fechaFin").val()+" "+$("#horaFin").val(),idEventGoogle:t,_token:$("meta[name='csrf-token']").attr("content"),_method:e}:(Swal.fire("Error","Formato de fecha no válido","error"),null)}function getUserInput(){var e=document.querySelector("#fechaInicio").value,t=document.querySelector("#horaInicio").value,n=document.querySelector("#fechaFin").value,a=document.querySelector("#horaFin").value,i=document.querySelector("#txtTitulo").value,o=document.querySelector("#txtDescripcion").value;if(""===e||""===n||""===t||""===a||""===i||""===o)return Swal.fire("Error","Asegurese de llenar todos los campos","error"),null;var l=e+" "+t,c=n+" "+a;return Date.parse(l)<Date.parse(c)?{dateStart:e,dateEnd:n,startTime:t,endTime:a,eventTitle:i,description:o}:(Swal.fire("Error","Asegurese de escribir un formato de fecha válido","error"),null)}function createEvent(e){var t={summary:e.eventTitle,description:e.description,start:{dateTime:new Date(e.dateStart+" "+e.startTime).toISOString()},end:{dateTime:new Date(e.dateEnd+" "+e.endTime).toISOString()}};gapi.client.calendar.events.insert({calendarId:"primary",resource:t}).execute(function(e){$("#txtIdEventGoogle").val(e.id);var t=document.getElementById("txtIdEventGoogle").value;object=getValuesGUI("POST",t),null!=object&&sendEvent("",object)})}function updateEvent(e){if(e){var t=gapi.client.calendar.events.get({calendarId:"primary",eventId:e});t.summary=$("#txtTitulo").val(),t.description=$("#txtDescripcion").val(),t.start={dateTime:new Date($("#fechaInicio").val()+" "+$("#horaInicio").val()).toISOString()},t.end={dateTime:new Date($("#fechaFin").val()+" "+$("#horaFin").val()).toISOString()},gapi.client.calendar.events.patch({calendarId:"primary",eventId:e,resource:t}).execute(function(e){})}}function deleteEvent(e){if(e){var t=gapi.client.calendar.events.get({calendarId:"primary",eventId:e});t.summary="Cita Cancelada",t.description="Sin Descripcion Adicional",gapi.client.calendar.events.patch({calendarId:"primary",eventId:e,resource:t}).execute(function(e){})}}$("#btnAgregar").click(function(){var e=getUserInput();null!==e&&createEvent(e)}),$("#btnEliminar").click(function(){object=getValuesGUI("DELETE",""),deleteEvent($("#txtIdEventGoogle").val()),sendEvent("/"+$("#txtID").val(),object)}),$("#btnModificar").click(function(){object=getValuesGUI("PATCH",""),null!==object&&(sendEvent("/"+$("#txtID").val(),object),updateEvent($("#txtIdEventGoogle").val()))});
