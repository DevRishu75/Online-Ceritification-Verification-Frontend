const token = localStorage.getItem("token");
// not loggen in check//
if(!token){
    alert("Please Login first");
    window.location.href = "index.html";
}
function CreateCourse(){
    const title = document.getElementById("course").value;
    fetch("http://localhost:5000/api/courses",{
        method: "POST",
        headers: {
            "Content-type":"application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({title})
    })
    .then(res=>res.json())
.then(data=>{
      JSON.stringify(data);
    console.log(data)
    document.getElementById("output").innerText = `course created with ID  = ${data._id}`
})
.catch(err=>{
    console.error(err)
    alert("Error occured ");
})
}
function issueCertificate(){
    const name = document.getElementById('student-name').value;
    const CourseId = document.getElementById("Course-ID").value;

    fetch(`http://localhost:5000/api/certificates/issue/${CourseId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ name })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Server error while issuing certificate");
        }
        return res.json();
    })
    .then(data => {
        console.log("FULL RESPONSE:", data);
        const certID =  data.certificate.certificateId;
        const verifyLink = `verify.html?cid=${certID}`;
         

        document.getElementById("output").innerHTML =
            `Certificate issued successfully : Certificate Id = ${data.certificate.certificateId}
             <a href="${verifyLink}" target="_blank">
            Verify Certificate
        </a>`;
    })
    .catch(err => {
        console.error(err);
        alert("An error occurred while issuing certificate");
    });
}

