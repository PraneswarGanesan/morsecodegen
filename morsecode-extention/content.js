if (!document.getElementById("morse-sidebar")) {
    // Create Sidebar
    let sidebar = document.createElement("div");
    sidebar.id = "morse-sidebar";
    sidebar.style.position = "fixed";
    sidebar.style.top = "0";
    sidebar.style.right = "-320px"; // Fully hidden initially
    sidebar.style.width = "300px";
    sidebar.style.height = "100%";
    sidebar.style.background = "#f9f9f9";
    sidebar.style.borderLeft = "2px solid #007bff";
    sidebar.style.boxShadow = "-2px 0px 10px rgba(0,0,0,0.3)";
    sidebar.style.padding = "15px";
    sidebar.style.zIndex = "10000";
    sidebar.style.transition = "right 0.3s ease-in-out";
    sidebar.style.display = "flex";
    sidebar.style.flexDirection = "column";
    sidebar.style.fontFamily = "Arial, sans-serif";

    sidebar.innerHTML = `
        <div id="morse-header" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #007bff; color: white; font-weight: bold;">
            <span>Morse Code Generator</span>
        </div>
        <textarea id="morse-input" placeholder="Type your message..." style="width: 100%; height: 80px; padding: 10px; margin-top: 10px; border: 1px solid #ddd; border-radius: 5px;"></textarea>
        <button id="morse-encode" style="margin-top: 10px; background: #007bff; color: white; padding: 10px; border: none; cursor: pointer; border-radius: 5px;">Encode</button>
        <button id="morse-decode" style="margin-top: 5px; background: #28a745; color: white; padding: 10px; border: none; cursor: pointer; border-radius: 5px;">Decode</button>
        <button id="morse-copy" style="margin-top: 5px; background: #ffc107; color: black; padding: 10px; border: none; cursor: pointer; border-radius: 5px;">Copy</button>
        <p id="morse-output" style="margin-top: 10px; font-weight: bold; color: #333;"></p>
    `;

    document.body.appendChild(sidebar);

    // Function to toggle the sidebar
    function toggleSidebar() {
        if (sidebar.style.right === "0px") {
            sidebar.style.right = "-320px"; // Fully hide
            sidePeekBtn.innerText = "☰"; // Open icon
        } else {
            sidebar.style.right = "0px"; // Show
            sidePeekBtn.innerText = "✖"; // Close icon
        }
    }

    // Create Side Peek Button
    let sidePeekBtn = document.createElement("button");
    sidePeekBtn.id = "morse-side-peek";
    sidePeekBtn.innerText = "☰";
    sidePeekBtn.style.position = "fixed";
    sidePeekBtn.style.right = "0";
    sidePeekBtn.style.top = "50%";
    sidePeekBtn.style.transform = "translateY(-50%)";
    sidePeekBtn.style.zIndex = "10000";
    sidePeekBtn.style.border = "none";
    sidePeekBtn.style.background = "#007bff";
    sidePeekBtn.style.color = "#fff";
    sidePeekBtn.style.width = "40px";  // Reduced width
    sidePeekBtn.style.height = "60px"; // Reduced height
    sidePeekBtn.style.borderRadius = "10px 0 0 10px"; // Rounded edges
    sidePeekBtn.style.cursor = "pointer";
    sidePeekBtn.style.fontSize = "20px";
    sidePeekBtn.style.boxShadow = "0px 0px 5px rgba(0, 0, 0, 0.3)";

    document.body.appendChild(sidePeekBtn);

    // Event Listeners
    sidePeekBtn.addEventListener("click", toggleSidebar);

    // Encode Morse Code
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

    // Decode Morse Code
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

    // Copy Morse Code
    document.getElementById("morse-copy").addEventListener("click", () => {
        let outputText = document.getElementById("morse-output").innerText;
        navigator.clipboard.writeText(outputText);
    });
}
