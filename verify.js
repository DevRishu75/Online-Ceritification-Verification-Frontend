document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const cid = params.get("cid");
        document.getElementById("verify-btn").addEventListener("click", Verify);

    if (cid) {
        document.getElementById("certificate-ID").value = cid;
        Verify();
    }
});

function Verify() {
    const CertifyID = document.getElementById("certificate-ID").value;

    if (!CertifyID) {
        document.getElementById("result").innerHTML =
            "<p>Please enter a Certificate ID</p>";
        return;
    }

    fetch(`http://localhost:5000/api/certificates/verify/${CertifyID}`)
        .then(res => {
            if (!res.ok) throw new Error("Invalid certificate");
            return res.json();
        })
        .then(data => {
            console.log("API Response:", data); // 👈 DEBUG LINE

            if (data.valid) {
                const cert = data.certificate;

                document.getElementById("result").innerHTML = `
                    <p>✅ <b>Valid Certificate</b></p>
                    <p><b>Name:</b> ${cert.user.name}</p>
                    <p><b>Email:</b> ${cert.user.email}</p>
                    <p><b>Course:</b> ${cert.course.title}</p>
                    <p><b>Issued On:</b> ${new Date(cert.issuedAt).toDateString()}</p>
                `;
            } else {
                document.getElementById("result").innerHTML =
                    "<p>❌ Invalid Certificate</p>";
            }
        })
        .catch(err => {
            console.error(err);
            document.getElementById("result").innerHTML =
                "<p>❌ Invalid Certificate</p>";
        });
}
