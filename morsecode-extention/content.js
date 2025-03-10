if (!document.getElementById("morse-sidebar")) {
    let sidebar = document.createElement("div");
    sidebar.id = "morse-sidebar";
    sidebar.innerHTML = `
        <div id="morse-header">
            <span>Morse Code Generator</span>
            <button id="morse-close">X</button>
        </div>
        <textarea id="morse-input" placeholder="Type your message..."></textarea>
        <button id="morse-encode">Encode</button>
        <button id="morse-decode">Decode</button>
        <button id="morse-copy">Copy</button>
        <p id="morse-output"></p>
    `;

    document.body.appendChild(sidebar);

    // Close button event
    document.getElementById("morse-close").addEventListener("click", () => {
        sidebar.style.display = "none";
    });

    // Encode button event
    document.getElementById("morse-encode").addEventListener("click", () => {
        let message = document.getElementById("morse-input").value;
        fetch(`http://localhost:8080/api/morse/encode`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("morse-output").innerText = data.encoded;
        });
    });

    // Decode button event
    document.getElementById("morse-decode").addEventListener("click", () => {
        let morseCode = document.getElementById("morse-input").value;
        fetch(`http://localhost:8080/api/morse/decode`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: morseCode })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("morse-output").innerText = data.decoded;
        });
    });

    // Copy button event
    document.getElementById("morse-copy").addEventListener("click", () => {
        let outputText = document.getElementById("morse-output").innerText;
        navigator.clipboard.writeText(outputText);
    });
}
