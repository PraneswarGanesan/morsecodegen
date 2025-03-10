document.getElementById("encodeBtn").addEventListener("click", function () {
    processMorse("encode");
});

document.getElementById("decodeBtn").addEventListener("click", function () {
    processMorse("decode");
});

document.getElementById("copyBtn").addEventListener("click", function () {
    let outputText = document.getElementById("outputBox").value;
    navigator.clipboard.writeText(outputText);
    alert("Copied to clipboard!");
});

// Function to send request to the Spring Boot API
function processMorse(type) {
    let inputText = document.getElementById("textInput").value;
    let endpoint = type === "encode" ? "/api/morse/encode" : "/api/morse/decode";

    fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: inputText })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("outputBox").value = type === "encode" ? data.encoded : data.decoded;
    })
    .catch(error => console.error("Error:", error));
}
