if (!document.getElementById("morse-sidebar")) {
    // Create and inject advanced CSS styling
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        :root {
            --primary-color: #3a2fd0;
            --primary-dark: #211c84;
            --primary-light: #6355f5;
            --accent-color: #ff7b54;
            --text-light: #ffffff;
            --text-dark: #1c1c1c;
            --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.15);
            --shadow-lg: 0 5px 20px rgba(0, 0, 0, 0.25);
            --border-radius: 12px;
            --transition-normal: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            --font-main: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        #morse-sidebar {
            position: fixed;
            top: 20px;
            right: -400px;
            width: 380px;
            height: calc(100vh - 40px);
            max-height: calc(100vh - 40px);
            background: linear-gradient(145deg, var(--primary-color), var(--primary-dark));
            border-radius: var(--border-radius) 0 0 var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            display: flex;
            flex-direction: column;
            font-family: var(--font-main);
            transition: var(--transition-normal);
            overflow: hidden;
            backdrop-filter: blur(10px);
            border-left: 1px solid rgba(255, 255, 255, 0.1);
            box-sizing: border-box;
        }
        
        #morse-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 25px;
            background: rgba(255, 255, 255, 0.07);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            flex-shrink: 0;
            box-sizing: border-box;
        }
        
        #morse-header .title {
            font-size: 1.3rem;
            font-weight: 600;
            color: var(--text-light);
            display: flex;
            align-items: center;
            gap: 10px;
            white-space: nowrap;
        }
        
        #morse-header .title svg {
            height: 24px;
            width: 24px;
            flex-shrink: 0;
        }
        
        #morse-content {
            padding: 20px 25px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            gap: 15px;
            overflow-y: auto;
            box-sizing: border-box;
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        }
        
        #morse-content::-webkit-scrollbar {
            width: 6px;
        }
        
        #morse-content::-webkit-scrollbar-track {
            background: transparent;
        }
        
        #morse-content::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
        }
        
        .input-group {
            position: relative;
            width: 100%;
            box-sizing: border-box;
        }
        
        .input-group label {
            display: block;
            margin-bottom: 8px;
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.9rem;
            font-weight: 500;
        }
        
        #morse-input {
            width: 100%;
            min-height: 100px;
            max-height: 150px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: var(--border-radius);
            color: var(--text-light);
            font-size: 1rem;
            font-family: var(--font-main);
            resize: vertical;
            outline: none;
            transition: var(--transition-normal);
            backdrop-filter: blur(5px);
            box-sizing: border-box;
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        }
        
        #morse-input::-webkit-scrollbar {
            width: 6px;
        }
        
        #morse-input::-webkit-scrollbar-track {
            background: transparent;
        }
        
        #morse-input::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
        }
        
        #morse-input:focus {
            border-color: var(--accent-color);
            box-shadow: 0 0 0 2px rgba(255, 123, 84, 0.3);
        }
        
        #morse-input::placeholder {
            color: rgba(255, 255, 255, 0.4);
        }
        
        .btn-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin: 10px 0;
            width: 100%;
            box-sizing: border-box;
        }
        
        .btn-group.full {
            grid-template-columns: 1fr;
        }
        
        .morse-button {
            padding: 12px 15px;
            border: none;
            outline: none;
            border-radius: var(--border-radius);
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: var(--transition-normal);
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: var(--shadow-sm);
            box-sizing: border-box;
            width: 100%;
        }
        
        .morse-button svg {
            width: 18px;
            height: 18px;
            flex-shrink: 0;
        }
        
        .morse-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0));
            opacity: 0;
            transition: var(--transition-normal);
        }
        
        .morse-button:hover::before {
            opacity: 1;
        }
        
        .morse-button:active {
            transform: translateY(1px);
        }
        
        .btn-primary {
            background: var(--accent-color);
            color: var(--text-light);
        }
        
        .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: var(--text-light);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .output-container {
            margin-top: 10px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            width: 100%;
            min-height: 100px;
            box-sizing: border-box;
        }
        
        .output-container label {
            display: block;
            margin-bottom: 8px;
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.9rem;
            font-weight: 500;
        }
        
        #morse-output {
            flex-grow: 1;
            min-height: 80px;
            max-height: 150px;
            padding: 15px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: var(--border-radius);
            color: var(--text-light);
            font-family: 'Courier New', monospace;
            font-size: 1rem;
            white-space: pre-wrap;
            word-wrap: break-word;
            overflow-wrap: break-word;
            overflow-y: auto;
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-sizing: border-box;
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        }
        
        #morse-output::-webkit-scrollbar {
            width: 6px;
        }
        
        #morse-output::-webkit-scrollbar-track {
            background: transparent;
        }
        
        #morse-output::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
        }
        
        .empty-output {
            color: rgba(255, 255, 255, 0.4);
            font-style: italic;
        }
        
        #morse-side-peek {
            position: fixed;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            z-index: 9999;
            border: none;
            background: var(--primary-color);
            color: var(--text-light);
            width: 48px;
            height: 70px;
            border-radius: var(--border-radius) 0 0 var(--border-radius);
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition-normal);
        }
        
        #morse-side-peek:hover {
            background: var(--primary-light);
            width: 52px;
        }
        
        #morse-side-peek svg {
            width: 24px;
            height: 24px;
            fill: var(--text-light);
            transition: var(--transition-normal);
        }
        
        .toast-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--accent-color);
            color: var(--text-light);
            padding: 12px 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 10px;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease-out;
            z-index: 10001;
            pointer-events: none;
        }
        
        .toast-notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .toast-notification svg {
            width: 20px;
            height: 20px;
            flex-shrink: 0;
        }
        
        .morse-footer {
            padding: 15px 25px;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.5);
            text-align: center;
            flex-shrink: 0;
            box-sizing: border-box;
        }
        
        /* Keyboard shortcut hints */
        .keyboard-hint {
            position: absolute;
            right: 10px;
            top: 10px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 4px;
            padding: 3px 6px;
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.7);
            pointer-events: none;
        }
        
        /* Loading indicator */
        .loading-indicator {
            display: none;
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid var(--text-light);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 8px;
            flex-shrink: 0;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Shortcut Info */
        .shortcut-info {
            position: absolute;
            bottom: 15px;
            right: 15px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 4px;
            padding: 3px 6px;
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.7);
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .shortcut-info span {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            padding: 1px 5px;
            font-family: monospace;
        }
        
        /* Responsive styles */
        @media (max-width: 600px) {
            #morse-sidebar {
                width: 320px;
                right: -330px;
                top: 10px;
                height: calc(100vh - 20px);
            }
            
            #morse-header {
                padding: 15px 20px;
            }
            
            #morse-content {
                padding: 15px 20px;
            }
            
            .btn-group {
                grid-template-columns: 1fr;
            }
        }
        
        /* Fix for small screens and mobile */
        @media (max-height: 600px) {
            #morse-sidebar {
                top: 10px;
                height: calc(100vh - 20px);
            }
            
            #morse-input, #morse-output {
                min-height: 60px;
                max-height: 100px;
            }
            
            .morse-footer {
                padding: 10px;
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // Create the sidebar
    let sidebar = document.createElement("div");
    sidebar.id = "morse-sidebar";

    // SVG icons for buttons and UI elements
    const icons = {
        morse: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 10h3v4H4v-4zm6 0h6v4h-6v-4zm9 0h1v4h-1v-4z" fill="currentColor"/></svg>',
        encode: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10 2L2 9l8 7v-4h4v3l8-7-8-7v4h-4V2z" fill="currentColor"/></svg>',
        decode: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 2l8 7-8 7v-4h-4v3L2 9l8-7v4h4V2z" fill="currentColor"/></svg>',
        copy: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"/></svg>',
        check: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/></svg>',
        menu: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor"/></svg>',
        close: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/></svg>',
        keyboard: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z" fill="currentColor"/></svg>'
    };

    // HTML structure
    sidebar.innerHTML = `
        <div id="morse-header">
            <div class="title">${icons.morse} Morse Code Converter</div>
        </div>
        <div id="morse-content">
            <div class="input-group">
                <label for="morse-input">Message</label>
                <textarea id="morse-input" placeholder="Type text to encode or Morse code to decode..." rows="4"></textarea>
                <div class="keyboard-hint">Ctrl+Enter</div>
            </div>
            
            <div class="btn-group">
                <button id="morse-encode" class="morse-button btn-primary">
                    ${icons.encode} Encode
                    <div class="loading-indicator" id="encode-loader"></div>
                </button>
                <button id="morse-decode" class="morse-button btn-primary">
                    ${icons.decode} Decode
                    <div class="loading-indicator" id="decode-loader"></div>
                </button>
            </div>
            
            <div class="output-container">
                <label>Result</label>
                <div id="morse-output"><span class="empty-output">Your result will appear here</span></div>
            </div>
            
            <div class="btn-group full">
                <button id="morse-copy" class="morse-button btn-secondary">
                    ${icons.copy} Copy to Clipboard
                </button>
            </div>
        </div>
        <div class="morse-footer">
            Morse Code Reference: · = dot, − = dash
            <div class="shortcut-info">${icons.keyboard} <span>Alt+B</span> to toggle</div>
        </div>
    `;

    document.body.appendChild(sidebar);

    // Create toggle button
    let sideToggleBtn = document.createElement("button");
    sideToggleBtn.id = "morse-side-peek";
    sideToggleBtn.innerHTML = icons.menu;
    document.body.appendChild(sideToggleBtn);

    // Create toast notification element
    let toastNotification = document.createElement("div");
    toastNotification.className = "toast-notification";
    toastNotification.innerHTML = `${icons.check} <span>Copied to clipboard</span>`;
    document.body.appendChild(toastNotification);

    // Function to toggle sidebar visibility
    // Function to toggle sidebar visibility
    function toggleSidebar() {
        const isMobile = window.innerWidth <= 600;
        const rightValue = isMobile ? "-330px" : "-400px";

        if (sidebar.style.right === "0px") {
            sidebar.style.right = rightValue;
            sideToggleBtn.innerHTML = icons.menu;
        } else {
            sidebar.style.right = "0px";
            sideToggleBtn.innerHTML = icons.close;

            // Get selected text from the document
            const selectedText = window.getSelection().toString().trim();

            // If text is selected, paste it into the input field
            if (selectedText) {
                document.getElementById("morse-input").value = selectedText;
            }

            // Focus on input box when opening sidebar
            document.getElementById("morse-input").focus();
        }
    }

    // Function to show toast notification
    function showToast(message) {
        const toastText = toastNotification.querySelector('span');
        toastText.textContent = message;
        toastNotification.classList.add('show');

        setTimeout(() => {
            toastNotification.classList.remove('show');
        }, 3000);
    }

    // Toggle sidebar event
    sideToggleBtn.addEventListener("click", toggleSidebar);

    // Set up event listeners for buttons
    document.getElementById("morse-encode").addEventListener("click", () => {
        const message = document.getElementById("morse-input").value;
        if (!message.trim()) {
            document.getElementById("morse-output").innerHTML = '<span class="empty-output">Please enter a message to encode</span>';
            return;
        }

        // Show loading indicator
        const loader = document.getElementById("encode-loader");
        loader.style.display = "inline-block";

        fetch(`http://localhost:8080/api/morse/encode`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                document.getElementById("morse-output").textContent = data.encoded;
            })
            .catch(error => {
                document.getElementById("morse-output").textContent = "Error: Could not connect to server";
                console.error('Error:', error);
            })
            .finally(() => {
                // Hide loading indicator
                loader.style.display = "none";
            });
    });

    document.getElementById("morse-decode").addEventListener("click", () => {
        const morseCode = document.getElementById("morse-input").value;
        if (!morseCode.trim()) {
            document.getElementById("morse-output").innerHTML = '<span class="empty-output">Please enter Morse code to decode</span>';
            return;
        }

        // Show loading indicator
        const loader = document.getElementById("decode-loader");
        loader.style.display = "inline-block";

        fetch(`http://localhost:8080/api/morse/decode`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: morseCode })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                document.getElementById("morse-output").textContent = data.decoded;
            })
            .catch(error => {
                document.getElementById("morse-output").textContent = "Error: Could not connect to server";
                console.error('Error:', error);
            })
            .finally(() => {
                // Hide loading indicator
                loader.style.display = "none";
            });
    });

    document.getElementById("morse-copy").addEventListener("click", () => {
        const output = document.getElementById("morse-output");
        const outputText = output.textContent;

        if (!outputText || output.innerHTML.includes("empty-output")) {
            showToast("Nothing to copy");
            return;
        }

        navigator.clipboard.writeText(outputText)
            .then(() => {
                showToast("Copied to clipboard");
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
                showToast("Failed to copy");
            });
    });

    // Add keyboard shortcuts
    document.getElementById("morse-input").addEventListener("keydown", (e) => {
        // Ctrl+Enter to encode
        if (e.key === "Enter" && e.ctrlKey) {
            document.getElementById("morse-encode").click();
            e.preventDefault();
        }
        // Alt+Enter to decode
        else if (e.key === "Enter" && e.altKey) {
            document.getElementById("morse-decode").click();
            e.preventDefault();
        }
    });

    // Global Alt+B shortcut to toggle sidebar
    document.addEventListener("keydown", (e) => {
        if (e.key === "b" && e.altKey) {
            e.preventDefault(); // Prevent default browser actions
            toggleSidebar();
        }
    });

    // Handle resize events to ensure proper positioning
    window.addEventListener("resize", () => {
        const isMobile = window.innerWidth <= 600;

        if (sidebar.style.right === "0px") {
            // Sidebar is open, no need to adjust
            return;
        }

        sidebar.style.right = isMobile ? "-330px" : "-400px";
    });

    // Handle initial display properties
    const isMobile = window.innerWidth <= 600;
    sidebar.style.right = isMobile ? "-330px" : "-400px";
}