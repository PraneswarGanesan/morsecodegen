document.getElementById("encode").addEventListener("click", async () => {
    let text = document.getElementById("message").value;
    let response = await fetch("http://localhost:8080/api/morse/encode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
    });
    let data = await response.json();
    document.getElementById("result").value = data.encoded;
});

document.getElementById("decode").addEventListener("click", async () => {
    let text = document.getElementById("message").value;
    let response = await fetch("http://localhost:8080/api/morse/decode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
    });
    let data = await response.json();
    document.getElementById("result").value = data.decoded;
});

document.getElementById("copy").addEventListener("click", () => {
    let resultField = document.getElementById("result");
    resultField.select();
    document.execCommand("copy");
});
