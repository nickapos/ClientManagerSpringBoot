
parent.BASE_URL = document.location.origin.match(/3000/) ? 'http://localhost:8181' : document.location.origin;
parent.request1 = {};
parent.rowDescription = {};
export const getStudentClasses = () => fetch(
        parent.BASE_URL + '/api/studentClasses', {
            method: 'get',
            mode: 'cors',
            cache: 'default',
            headers: {
                'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                'Content-Type': 'application/json' //,
                    //"Content-Length": content.length.toString(),
                    //"X-Custom-Header": "ProcessThisImmediately"
            }
        })
    .then(res => res.json())
    .then(res => {
        console.log("classes from server: ", res);
        const classes = res._embedded.studentClasses;
        return classes;
    });

export const getStudents = () => fetch(
        parent.BASE_URL + '/api/students', {
            method: 'get',
            mode: 'cors',
            cache: 'default',
            headers: {
                'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                'Content-Type': 'application/json' //,
                    //"Content-Length": content.length.toString(),
                    //"X-Custom-Header": "ProcessThisImmediately"
            }
        })
    .then(res => res.json())
    .then(res => {
        console.log("students from server: ", res);
        const students = res._embedded.students;
        return students;
    });

export const getRegisters = () => fetch(
        parent.BASE_URL + '/api/registers', {
            method: 'get',
            mode: 'cors',
            cache: 'default',
            headers: {
                'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                'Content-Type': 'application/json' //,
                    //"Content-Length": content.length.toString(),
                    //"X-Custom-Header": "ProcessThisImmediately"
            }
        })
    .then(res => res.json())
    .then(res => {
        console.log("registers from server: ", res);
        const registers = res._embedded.registers;
        return registers;
    });

export const getPayeds = () => fetch(
        parent.BASE_URL + '/api/payeds', {
            method: 'get',
            mode: 'cors',
            cache: 'default',
            headers: {
                'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                'Content-Type': 'application/json' //,
                    //"Content-Length": content.length.toString(),
                    //"X-Custom-Header": "ProcessThisImmediately"
            }
        })
    .then(res => res.json())
    .then(res => {
        console.log("payeds from server: ", res);
        const payeds = res._embedded.payeds;
        return payeds;
    });

// Create the XHR object.
function createCORSRequest1(method, url, data) {
    let xhr1 = new XMLHttpRequest();
    if ("withCredentials" in xhr1) {
        xhr1.open(method, url);
        xhr1.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
        xhr1.setRequestHeader("Content-type", "application/json");
        xhr1.contentType = "application/json";
        //xhr1.send(body);
    } else if (typeof XDomainRequest != "undefined") {
        xhr1 = new XDomainRequest();
        xhr1.open(method, url);
        //xhr.setRequestHeader("Authorization", 'Basic '+btoa('myapos:Apostolakis1981'));
    } else {
        xhr1 = null;
    }
    return xhr1;
};

export const saveNewClass = (row) => {
    //debugger;
    var request1 = createCORSRequest1("post", parent.BASE_URL + "/api/studentClasses");
    if (request1) {
        request1.onload = function() {
            //debugger;
            //do something with request.responseText
            if (request1.status == 201) {
                alert("A new record has been created in database. Page is reloading");
                console.log("responseText:", request1.responseText);
                window.location.reload(true);
            }

        };

        request1.open("post", parent.BASE_URL + "/api/studentClasses");
        request1.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
        request1.setRequestHeader("Content-type", "application/json");
        request1.contentType = "application/json";

        /*this has to be fixed* sets subclass*/
        //find subclass by row.subClassdescription
        const fetch2 = fetch(parent.BASE_URL + "/api/studentClasses/search/findBydescription" +
            "?description=" + row.subClassDescription, {
                method: 'get',
                mode: 'cors',
                cache: 'default',
                headers: {
                    'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                    'Content-Type': 'application/json'
                }
            })
        .then(res => res.json())
        .then(res => { 
            //debugger;
            console.log("data from server studentclass with select: ", res);
            let body = JSON.stringify({
                "description": parent.rowDescription,
                "studentClass": res._links.studentClass[0].href
            });//res._links.studentClass[0].href
            parent.request1.send(body);
        });

        // let body = JSON.stringify({
        //     "description": row.description,
        //     "studentClass": "http://localhost:8181/api/studentClasses/1"
        // });
        parent.rowDescription = row.description;
        parent.request1 = request1;
    }
}

/*deletes selected class from table -- classId parameter is the id in front end table not in the database*/

export const deleteStudentClass = (classId) => {


    //debugger;
    console.log("hey from api.deleteStudentClass. Preparing to delete class with id:", classId);
    let x = document.getElementById("studentClasses");
    let rowByClassId = x.querySelectorAll('tr')[classId];
    let description = rowByClassId.childNodes[2].innerHTML;

    const fetch1 = fetch(parent.BASE_URL + "/api/studentClasses/search/findBydescription" +
            "?description=" + description, {
                method: 'get',
                mode: 'cors',
                cache: 'default',
                headers: {
                    'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                    'Content-Type': 'application/json'
                }
            })
        .then(res => res.json())
        .then(res => {
            //debugger;
            console.log("data from server: ", res);
            //parent.classesPair[parentDesc] = res;
            let ar = res._links.self.href.split("/");
            let s = ar.length;
            let id = ar[s - 1];

            //delete record student class with id

            fetch(parent.BASE_URL + "/api/studentClasses/"+id, {
                method: 'delete',
                mode: 'cors',
                cache: 'default',
                headers: {
                    'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                    'Content-Type': 'application/json'
                }
            })
        	.then(res => { 
        		//debugger;
        		console.log(res);
        		if(res.status == 204){
        			alert("Student class is deleted succesfully");
        			window.location.reload(true);
        		}
                else{
                    alert("The class you are trying to delete is subclass to another class. Please try to delete the parent class first");
                }
        		//res.json()
        	})
        });
}

/*update selected class from table -- desc parameter is the description in front end table not in the database*/

export const updateStudentClass = (newdesc, descBefore, rowUpdate) => {
    //debugger;
    console.log("hey from api.updateStudentClass. Preparing to update class",rowUpdate," with new desc:", newdesc);

    //fetch call for update
    //curl -v -u myapos:Apostolakis1981 -X PATCH -H "Content-Type:application/json" -d '{ "description": "TEST_UPDATE", "studentClass":"http://localhost:8181/api/studentClasses/74" }' http://localhost:8181/api/studentClasses/74



    // let rowByClassId = document.querySelectorAll('tr')[classId];
    // let description = rowByClassId.childNodes[2].innerHTML;
    let bodyData = JSON.stringify({
        "description": newdesc,
        "studentClass": rowUpdate._links.self.href
    });
    //debugger;
    const fetch1 = fetch(rowUpdate._links.self.href , {
                method: 'PATCH',
                mode: 'cors',
                cache: 'default',
                body: bodyData,
                headers: {
                    'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                    'Content-Type': 'application/json'
                }
            })
        .then(res => {
            if(res.status == 200){

            //debugger;
            alert("Class is updated succsesfully. Prepare for reloading");
            window.location.reload(true);

        }
            //res.json()

        })

}



export const saveNewStudent = (row) => {

    //debugger;
    //check email type

    let str = row.email;
    let n = str.includes("@");
    //debugger;

    if(n) {
        let date = new Date(row.dateOfBirth);

        let bodyData = JSON.stringify({
            "fname": row.fname,
            "lname": row.lname,
            "email": row.email,
            "dateOfBirth": date,
            "facebook": row.facebook,
            "phone": row.phone,
            "manager": "http://localhost:8181/api/managers/17",
        });

        const fetch1 = fetch(parent.BASE_URL + "/api/students" , {
                    method: 'post',
                    mode: 'cors',
                    cache: 'default',
                    body: bodyData,
                    headers: {
                        'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                        'Content-Type': 'application/json'
                    }
                })
            .then(res => {
                //debugger;
                if(res.status == 201){

                //debugger;
                alert("New student saved succsesfully. Prepare for reloading");
                window.location.reload(true);
                }
                else {
                    alert("something bad happened.Please check your input data.");    
                }
                //res.json()

        })
    } 
    else {
         alert("Please check email input and try again. It has to be of email type. Example test@test.com");   
    }

}


/*deletes selected student from table -- studentId parameter is the id in front end table not in the database*/

export const deleteStudent = (studentId) => {


    //debugger;
    console.log("hey from api.deleteStudentClass. Preparing to delete student with id:", studentId);
    let x = document.getElementById("students");
    let rowByClassId = x.querySelectorAll('tr')[studentId];
    let fname = rowByClassId.childNodes[2].innerHTML;

    const fetch1 = fetch(parent.BASE_URL + "/api/students/search/findByFname" +
            "?fname=" + fname, {
                method: 'get',
                mode: 'cors',
                cache: 'default',
                headers: {
                    'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                    'Content-Type': 'application/json'
                }
            })
        .then(res => res.json())
        .then(res => {
            //debugger;
            console.log("data from server: ", res);
            try{
            
            //parent.classesPair[parentDesc] = res;
            let ar = res._links.self.href.split("/");
            let s = ar.length;
            let id = ar[s - 1];
            //delete record student class with id

            fetch(parent.BASE_URL + "/api/students/"+id, {
                method: 'delete',
                mode: 'cors',
                cache: 'default',
                headers: {
                    'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                    'Content-Type': 'application/json'
                }
            })
            .then(res => { 
                //debugger;
                console.log(res.status);
                if(res.status == 204){
                    alert("Student is deleted succesfully.Prepare to reload");
                    window.location.reload(true);
                }
                else if(res.status == 500){
                    alert("Something bad happened.Are there two users with the same name?");
                }
                else {
                    alert("Something bad happened. Please try again");
                }
                //res.json()
            })
            }
            catch (e){
                alert("Something bad happened. Error: "+e.message+". Please try again");
                window.location.reload(true);
            }

        });
}


export const updateStudent = (/*newdesc, descBefore, */rowUpdate) => {

    //console.log("hey from api.updateStudent. Preparing to update student",rowUpdate," with new desc:", newdesc);
    console.log("hey from api.updateStudent. Preparing to update student",rowUpdate);

    //fetch call for update
    //curl -v -u myapos:Apostolakis1981 -X PATCH -H "Content-Type:application/json" -d '{ "description": "TEST_UPDATE", "studentClass":"http://localhost:8181/api/studentClasses/74" }' http://localhost:8181/api/students/74


    //debugger;
    // let rowByClassId = document.querySelectorAll('tr')[classId];
    // let description = rowByClassId.childNodes[2].innerHTML;
    let str = rowUpdate.email;
    let n = str.includes("@");
    //debugger;

    if(n) {
    let date = new Date(rowUpdate.dateOfBirth);
    let bodyData = JSON.stringify({
            "fname": rowUpdate.fname,
            "lname": rowUpdate.lname,
            "email": rowUpdate.email,
            "dateOfBirth": date,
            "facebook": rowUpdate.facebook,
            "phone": rowUpdate.phone,
            "manager": "http://localhost:8181/api/managers/17",
        });
    const fetch1 = fetch(rowUpdate._links.self.href , {
                method: 'PATCH',
                mode: 'cors',
                cache: 'default',
                body: bodyData,
                headers: {
                    'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                    'Content-Type': 'application/json'
                }
            })
        .then(res => {
            //debugger;
            if(res.status == 200){

            //debugger;
            alert("Class is updated succsesfully. Prepare for reloading");
            window.location.reload(true);
        }

        })
    } else {
         alert("Please check email input and try again. It has to be of email type. Example test@test.com"); 
         window.location.reload(true);  
    }
}


export const addPaymentRegisters = (row) => {
debugger;



}

export const updatePaymentRegisters = (updateMode , row) => {
//debugger;

if (updateMode == "paymentUpdate" || updateMode == "paymentNotesUpdate" ||
    updateMode == "updateDateOfPayment"){

    //sync requests

    //step 1 find student by student fname and lname

    //http://localhost:8181/api/students/search/findByFnameAndLname?fname=myros&lname=myroslname
    let url = parent.BASE_URL+"/api/students/search/findByFnameAndLname?fname="+row.fname+"&lname="+row.lname;
    let request = new XMLHttpRequest();
    request.open('GET', url, false);  // `false` makes the request synchronous
    request.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
    request.setRequestHeader("Content-type", "application/json");
    request.contentType = "application/json"
    request.send(null);

    if (request.status === 200) {

            let resObj = JSON.parse(request.responseText);
            console.log("sync call 1:", resObj);
            let student = resObj._links.self.href;
            //debugger;
            //step 2 find register by student

            let url2 = parent.BASE_URL+"/api/registers/search/findByStudent?student="+student;
            let request2 = new XMLHttpRequest();
            request2.open('GET', url2, false);  // `false` makes the request synchronous
            request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
            request2.setRequestHeader("Content-type", "application/json");
            request2.contentType = "application/json"
            request2.send(null);

            if (request2.status === 200) {

                let resObj2 = JSON.parse(request2.responseText);
                console.log("sync call 2:", resObj2);
                for(let x=0; x<resObj2._embedded.registers.length; x++){    //for 1
                let register = resObj2._embedded.registers[x]._links.self.href; //has to be fixed for many

                //step 3 update payments

                //step 3.1 find payment id to update

                let ar = register.split("/");
                let s = ar.length;
                let registerId = ar[s - 1];

                let url3 = parent.BASE_URL+"/api/payeds/search/findByRegister?register="+register;
                let request3 = new XMLHttpRequest();
                request3.open('GET', url3, false);  // `false` makes the request synchronous
                request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                request3.setRequestHeader("Content-type", "application/json");
                request3.contentType = "application/json"
                request3.send(null);

                if (request3.status === 200) {
                    
                    let resObj3 = JSON.parse(request3.responseText);
                    console.log("sync call 3:", resObj3);
                    //let payment3 = resObj3._links.self.href;
                    for(let s=0; s<resObj3._embedded.payeds.length; s++){ // for 2
                    let payment = resObj3._embedded.payeds[s]._links.payed.href; //has to be fixed for many
                    //debugger;

                    //step 3.2 update payments
                    let date = new Date(row.dateOfPayment.substr(0, 10));
                    //debugger;
                    let bodyData = JSON.stringify({
                            "payment" : row.payment,
                            "dateOfPayment": date,
                            "notes": row.notes,
                            "register": register
                    });

                    let request4 = new XMLHttpRequest();
                    request4.open('PATCH', payment, false);  // `false` makes the request synchronous
                    request4.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                    request4.setRequestHeader("Content-type", "application/json");
                    request4.contentType = "application/json"
                    request4.send(bodyData);

                    if (request4.status === 200) {

                        let resObj4 = JSON.parse(request4.responseText);

                        console.log("sync call 4:", resObj4);
                        //debugger;
                         if (s == resObj3._embedded.payeds.length -1){
                            alert("Payment has been updated in database. Page is reloading");
                            window.location.reload(true);
                        }


                    }
                    else {

                        alert("Something bad has happened. Please try again");

                    }
                }//end of for 2
                }

            }
    } //end of for 1
    }

} 

else if (updateMode == "classUpdate"){

    //sync calls
    //prepei na kanw update tin eggrafi register ara na allaksw to class id mesa ston pinaka register

    //step 1 find student by fname and lname

    let url = parent.BASE_URL+"/api/students/search/findByFnameAndLname?fname="+row.fname+"&lname="+row.lname;
    let request = new XMLHttpRequest();
    request.open('GET', url, false);  // `false` makes the request synchronous
    request.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
    request.setRequestHeader("Content-type", "application/json");
    request.contentType = "application/json"
    request.send(null);

    if (request.status === 200) {

            let resObj = JSON.parse(request.responseText);
            console.log("sync call 1:", resObj);
            let student = resObj._links.self.href;
            //debugger;

            //step2 find register id by student 
            let url2 = parent.BASE_URL+"/api/registers/search/findByStudent?student="+student;
            //debugger;
            let request2 = new XMLHttpRequest();
            request2.open('GET', url2, false);  // `false` makes the request synchronous
            request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
            request2.setRequestHeader("Content-type", "application/json");
            request2.contentType = "application/json"
            request2.send(null);

            if (request2.status === 200) {

                let resObj2 = JSON.parse(request2.responseText);
                console.log("sync call 2:", resObj2);
            //   let register = resObj2._embedded.registers[0]._links.register.href; //this has to be fixed for many registrations
            //debugger;

            //step 3 find classes by description
            let url3 = parent.BASE_URL+"/api/studentClasses/search/findBydescription?description="+row.class;
            let request3 = new XMLHttpRequest();
            request3.open('GET', url3, false);  // `false` makes the request synchronous
            request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
            request3.setRequestHeader("Content-type", "application/json");
            request3.contentType = "application/json"
            request3.send(null);

            if (request3.status === 200) {
                //debugger;
                let resObj3 = JSON.parse(request3.responseText);
                console.log("sync call 3:", resObj3); 

                //step 4 make the patch request
                let date = new Date(row.dateOfPayment.substr(0, 10));
                let bodyData = JSON.stringify({
                            "dateOfRegistration" : date,
                            "student": student,
                            "studentClass": resObj3._links.self.href//"http://localhost:8181/api/studentClasses/1"
                    });

                    let request4 = new XMLHttpRequest();
                    let registrations = resObj2._embedded.registers;
                    for (let j=0; j<registrations.length;j++) {
                    let url4 = resObj2._embedded.registers[j]._links.register.href;//"http://localhost:8181/api/registers/2"; //send request to register element http://localhost:8181/api/registers/2
                    debugger;
                    request4.open('PATCH', url4, false);  // `false` makes the request synchronous
                    request4.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                    request4.setRequestHeader("Content-type", "application/json");
                    request4.contentType = "application/json"
                    request4.send(bodyData);

                    if (request4.status === 200) {

                        let resObj4 = JSON.parse(request4.responseText);

                        console.log("sync call 4:", resObj4);
                        //debugger;
                        if (j == registrations.length -1){
                            alert("Payment has been updated in database. Page is reloading");
                            window.location.reload(true);
                        }

                    }
                    else {

                        alert("Something bad has happened. Please try again");

                    }

                }

            }


            
            }

    }



} 


}

export const deletePaymentRegisters = (row) => {
//debugger;



}



export const createRegisters = (row) => {

//create call -- we need student id, studentClass id, dateOfRegistration


//find studentClass id

//http://localhost:8181/api/studentClasses/search/findBydescription?description=row.class


    let url = parent.BASE_URL+"/api/studentClasses/search/findBydescription?description="+row.class;
    let request = new XMLHttpRequest();
    request.open('GET', url, false);  // `false` makes the request synchronous
    request.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
    request.setRequestHeader("Content-type", "application/json");
    request.contentType = "application/json"
    request.send(null);

    if (request.status === 200) {

        let resObj = JSON.parse(request.responseText);
        console.log("sync call 1:", resObj);

        let classLink = resObj._links.self.href; //has to be fixed for many

        //step 1 find class id to update

        // let ar = classLink.split("/");
        // let s = ar.length;
        // let classId = ar[s - 1];
        //debugger;

        let url2 = parent.BASE_URL+"/api/students/search/findByFnameAndLname?fname="+row.fname+"&lname="+row.lname;
        let request2 = new XMLHttpRequest();
        request2.open('GET', url2, false);  // `false` makes the request synchronous
        request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
        request2.setRequestHeader("Content-type", "application/json");
        request2.contentType = "application/json"
        request2.send(null);

        if (request2.status === 200) {
            //step 2 find student id to update
            let resObj2 = JSON.parse(request2.responseText);
            console.log("sync call 2:", resObj2);
            //debugger;
            let studentLink = resObj2._links.self.href; //has to be fixed for many

            // let ar2 = studentLink.split("/");
            // let s2 = ar2.length;
            // let studentId = ar2[s - 1];

            //new registration call


            let date = new Date(row.dateOfRegistration.substr(0, 10));
            //debugger;
            let bodyData = JSON.stringify({
                    "studentClass" : classLink,
                    "dateOfRegistration": date,
                    "student": studentLink
            });



            let url3 = parent.BASE_URL+"/api/registers/";
            let request3 = new XMLHttpRequest();
            request3.open('POST', url3, false);  // `false` makes the request synchronous
            request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
            request3.setRequestHeader("Content-type", "application/json");
            request3.contentType = "application/json"
            request3.send(bodyData);
            
            if (request3.status === 201) {
                //debugger;
                let resObj3 = JSON.parse(request2.responseText);
                console.log("sync call 3:", resObj3);
                alert("Registration has been created in database. Page is reloading");
                window.location.reload(true);

            } else {
                
                alert("Something bad has happened. Please try again");

            }

        }


    }

}


export const updateRegisters = (row) => {


//create call -- we need student id, studentClass id, dateOfRegistration


//find studentClass id

//http://localhost:8181/api/studentClasses/search/findBydescription?description=row.class


    let url = parent.BASE_URL+"/api/studentClasses/search/findBydescription?description="+row.class;
    let request = new XMLHttpRequest();
    request.open('GET', url, false);  // `false` makes the request synchronous
    request.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
    request.setRequestHeader("Content-type", "application/json");
    request.contentType = "application/json"
    request.send(null);

    if (request.status === 200) {

        let resObj = JSON.parse(request.responseText);
        console.log("sync call 1:", resObj);

        let classLink = resObj._links.self.href; //has to be fixed for many????

        //step 1 find class id to update

        // let ar = classLink.split("/");
        // let s = ar.length;
        // let classId = ar[s - 1];
        //debugger;

        let url2 = parent.BASE_URL+"/api/students/search/findByFnameAndLname?fname="+row.fname+"&lname="+row.lname;
        let request2 = new XMLHttpRequest();
        request2.open('GET', url2, false);  // `false` makes the request synchronous
        request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
        request2.setRequestHeader("Content-type", "application/json");
        request2.contentType = "application/json"
        request2.send(null);

        if (request2.status === 200) {
            
            //step 2 find student id to update
            let resObj2 = JSON.parse(request2.responseText);
            console.log("sync call 2:", resObj2);
            //debugger;
            let studentLink = resObj2._links.self.href; //has to be fixed for many

            // let ar2 = studentLink.split("/");
            // let s2 = ar2.length;
            // let studentId = ar2[s - 1];

            //new registration call

            let url3 = parent.BASE_URL+"/api/registers/search/findByStudent?student="+studentLink;
            let request3 = new XMLHttpRequest();
            request3.open('GET', url3, false);  // `false` makes the request synchronous
            request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
            request3.setRequestHeader("Content-type", "application/json");
            request3.contentType = "application/json"
            request3.send(null);

            if (request3.status === 200) {
                
                let resObj3 = JSON.parse(request3.responseText);
                console.log("sync call 3:", resObj3);
                //debugger;

                let date = new Date(row.dateOfRegistration.substr(0, 10));
                //debugger;
                let bodyData = JSON.stringify({
                        "studentClass" : classLink,
                        "dateOfRegistration": date,
                        "student": studentLink
                });

                //update registration for student
                let url4 = resObj3._embedded.registers[0]._links.self.href;
                let request4 = new XMLHttpRequest();
                request4.open('PATCH', url4, false);  // `false` makes the request synchronous
                request4.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                request4.setRequestHeader("Content-type", "application/json");
                request4.contentType = "application/json"
                request4.send(bodyData);

                if (request4.status === 200) {
                    
                    //debugger;
                    let resObj4 = JSON.parse(request4.responseText);
                    console.log("sync call 4:", resObj4);
                    alert("Registration has been updated in database. Page is reloading");
                    window.location.reload(true);

                } else {
                
                    alert("Something bad has happened. Please try again");

                }   

            }

        }


    }

}


export const deleteRegisters = (registerId) => {

    //debugger;
    console.log("hey from api.deleteRegisters. Preparing to delete register with id:", registerId);
    let x = document.getElementById("registers");
    let rowByClassId = x.querySelectorAll('tr')[registerId];
    let fname = rowByClassId.childNodes[2].innerHTML;
    let lname = rowByClassId.childNodes[3].innerHTML;
    //debugger;
    //step 1 find student 
    const fetch1 = fetch(parent.BASE_URL + "/api/students/search/findByFnameAndLname?fname="+fname+"&lname="+lname,
                {
                    method: 'get',
                    mode: 'cors',
                    cache: 'default',
                    headers: {
                        'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                        'Content-Type': 'application/json'
                    }
            })
        .then(res => res.json())
        .then(res => {
            //debugger;
            console.log("data from server: ", res);
            try{
            
                //get studentLink
                let studentLink = res._links.self.href;

                //find registrations of studentLink

                 const fetch2 = fetch(parent.BASE_URL + "/api/registers/search/findByStudent?student="+studentLink,
                        {
                            method: 'get',
                            mode: 'cors',
                            cache: 'default',
                            headers: {
                                'Authorization': 'Basic ' + btoa('myapos:Apostolakis1981'),
                                'Content-Type': 'application/json'
                            }
                        })
                .then(res => res.json())
                .then(res => {

                    debugger;
                    console.log("data from server: ", res);
                    if(res._embedded.registers.length>0) {
                        debugger;
                        let registerLink = res._embedded.registers[0]._links.self.href;


                        //delete corresponding payment of register

                        // let register = resObj2._embedded.registers[x]._links.self.href; //has to be fixed for many
                        //get payments

                        let url = parent.BASE_URL+"/api/payeds/search/findByRegister?register="+registerLink;
                        let request = new XMLHttpRequest();
                        request.open('GET', url, false);  // `false` makes the request synchronous
                        request.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                        request.setRequestHeader("Content-type", "application/json");
                        request.contentType = "application/json"
                        request.send(null);

                        if (request.status === 200) {

                            let resObj = JSON.parse(request.responseText);
                            console.log("sync call 1:", resObj);
                            debugger;
                            let paymentLinks = resObj._embedded.payeds; //has to be fixed for many????
                            //delete all payments first
                                let url2=""; 
                                let request2 ="";

                                for(let ww=0; ww<paymentLinks.length; ww++){
                                    url2 = paymentLinks[ww]._links.payed.href;
                                    request2 = new XMLHttpRequest();
                                    request2.open('delete', url2, false);  // `false` makes the request synchronous
                                    request2.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                                    request2.setRequestHeader("Content-type", "application/json");
                                    request2.contentType = "application/json"
                                    request2.send(null);
                                    
                                    if (request2.status === 204) {
                                        console.log("deleted payment:"+paymentLinks[ww]);
                                    }
                                }

                                //delete registration after deleted payments

                                let url3 = registerLink;
                                let request3 = new XMLHttpRequest();
                                request3.open('delete', url3, false);  // `false` makes the request synchronous
                                request3.setRequestHeader("Authorization", 'Basic ' + btoa('myapos:Apostolakis1981'));
                                request3.setRequestHeader("Content-type", "application/json");
                                request3.contentType = "application/json"
                                request3.send(null); 
                                if (request3.status === 204) {
                                    alert("Register is deleted succesfully");
                                    window.location.reload(true);
                                }  else {
                                alert("Something bad happened.Please try again!");
                            }

                        }

                    } else {

                        alert("Student has no registrations to delete");
                        window.location.reload(true);
                    }

                });
           
            }
            catch (e){
                alert("Something bad happened. Error: "+e.message+". Please try again");
                window.location.reload(true);
            }

        });


}