if (!document.getElementById("morse_converter_sidebar")) {
    // Create and inject advanced CSS styling with namespaced selectors and variables
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .morse_converter_root {
            --morse_converter_primary: #3a2fd0;
            --morse_converter_primary_dark: #211c84;
            --morse_converter_primary_light: #6355f5;
            --morse_converter_accent: #ff7b54;
            --morse_converter_text_light: #ffffff;
            --morse_converter_text_dark: #1c1c1c;
            --morse_converter_shadow_sm: 0 2px 8px rgba(0, 0, 0, 0.15);
            --morse_converter_shadow_lg: 0 5px 20px rgba(0, 0, 0, 0.25);
            --morse_converter_border_radius: 12px;
            --morse_converter_transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            --morse_converter_font: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        #morse_converter_sidebar {
            position: fixed;
            top: 20px;
            right: -400px;
            width: 380px;
            height: calc(100vh - 40px);
            max-height: calc(100vh - 40px);
            background: linear-gradient(145deg, var(--morse_converter_primary), var(--morse_converter_primary_dark));
            border-radius: var(--morse_converter_border_radius) 0 0 var(--morse_converter_border_radius);
            box-shadow: var(--morse_converter_shadow_lg);
            z-index: 10000;
            display: flex;
            flex-direction: column;
            font-family: var(--morse_converter_font);
            transition: var(--morse_converter_transition);
            overflow: hidden;
            backdrop-filter: blur(10px);
            border-left: 1px solid rgba(255, 255, 255, 0.1);
            box-sizing: border-box;
        }
        
        #morse_converter_header {
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
        
        #morse_converter_header .morse_converter_title {
            font-size: 1.3rem;
            font-weight: 600;
            color: var(--morse_converter_text_light);
            display: flex;
            align-items: center;
            gap: 10px;
            white-space: nowrap;
        }
        
        #morse_converter_header .morse_converter_title svg {
            height: 24px;
            width: 24px;
            flex-shrink: 0;
        }
        
        #morse_converter_content {
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
        
        #morse_converter_content::-webkit-scrollbar {
            width: 6px;
        }
        
        #morse_converter_content::-webkit-scrollbar-track {
            background: transparent;
        }
        
        #morse_converter_content::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
        }
        
        .morse_converter_input_group {
            position: relative;
            width: 100%;
            box-sizing: border-box;
        }
        
        .morse_converter_input_group label {
            display: block;
            margin-bottom: 8px;
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.9rem;
            font-weight: 500;
        }
        
        #morse_converter_input {
            width: 100%;
            min-height: 100px;
            max-height: 150px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: var(--morse_converter_border_radius);
            color: var(--morse_converter_text_light);
            font-size: 1rem;
            font-family: var(--morse_converter_font);
            resize: vertical;
            outline: none;
            transition: var(--morse_converter_transition);
            backdrop-filter: blur(5px);
            box-sizing: border-box;
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        }
        
        #morse_converter_input::-webkit-scrollbar {
            width: 6px;
        }
        
        #morse_converter_input::-webkit-scrollbar-track {
            background: transparent;
        }
        
        #morse_converter_input::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
        }
        
        #morse_converter_input:focus {
            border-color: var(--morse_converter_accent);
            box-shadow: 0 0 0 2px rgba(255, 123, 84, 0.3);
        }
        
        #morse_converter_input::placeholder {
            color: rgba(255, 255, 255, 0.4);
        }
        
        .morse_converter_btn_group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin: 10px 0;
            width: 100%;
            box-sizing: border-box;
        }
        
        .morse_converter_btn_group.morse_converter_full {
            grid-template-columns: 1fr;
        }
        
        .morse_converter_button {
            padding: 12px 15px;
            border: none;
            outline: none;
            border-radius: var(--morse_converter_border_radius);
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: var(--morse_converter_transition);
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: var(--morse_converter_shadow_sm);
            box-sizing: border-box;
            width: 100%;
        }
        
        .morse_converter_button svg {
            width: 18px;
            height: 18px;
            flex-shrink: 0;
        }
        
        .morse_converter_button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0));
            opacity: 0;
            transition: var(--morse_converter_transition);
        }
        
        .morse_converter_button:hover::before {
            opacity: 1;
        }
        
        .morse_converter_button:active {
            transform: translateY(1px);
        }
        
        .morse_converter_btn_primary {
            background: var(--morse_converter_accent);
            color: var(--morse_converter_text_light);
        }
        
        .morse_converter_btn_secondary {
            background: rgba(255, 255, 255, 0.1);
            color: var(--morse_converter_text_light);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .morse_converter_output_container {
            margin-top: 10px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            width: 100%;
            min-height: 100px;
            box-sizing: border-box;
        }
        
        .morse_converter_output_container label {
            display: block;
            margin-bottom: 8px;
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.9rem;
            font-weight: 500;
        }
        
        #morse_converter_output {
            flex-grow: 1;
            min-height: 80px;
            max-height: 150px;
            padding: 15px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: var(--morse_converter_border_radius);
            color: var(--morse_converter_text_light);
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
        
        #morse_converter_output::-webkit-scrollbar {
            width: 6px;
        }
        
        #morse_converter_output::-webkit-scrollbar-track {
            background: transparent;
        }
        
        #morse_converter_output::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
        }
        
        .morse_converter_empty_output {
            color: rgba(255, 255, 255, 0.4);
            font-style: italic;
        }
        
        #morse_converter_toggle_btn {
            position: fixed;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            z-index: 9999;
            border: none;
            background: var(--morse_converter_primary);
            color: var(--morse_converter_text_light);
            width: 48px;
            height: 70px;
            border-radius: var(--morse_converter_border_radius) 0 0 var(--morse_converter_border_radius);
            cursor: pointer;
            box-shadow: var(--morse_converter_shadow_lg);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--morse_converter_transition);
        }
        
        #morse_converter_toggle_btn:hover {
            background: var(--morse_converter_primary_light);
            width: 52px;
        }
        
        #morse_converter_toggle_btn svg {
            width: 24px;
            height: 24px;
            fill: var(--morse_converter_text_light);
            transition: var(--morse_converter_transition);
        }
        
        .morse_converter_toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--morse_converter_accent);
            color: var(--morse_converter_text_light);
            padding: 12px 20px;
            border-radius: var(--morse_converter_border_radius);
            box-shadow: var(--morse_converter_shadow_lg);
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
        
        .morse_converter_toast.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .morse_converter_toast svg {
            width: 20px;
            height: 20px;
            flex-shrink: 0;
        }
        
        .morse_converter_footer {
            padding: 15px 25px;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.5);
            text-align: center;
            flex-shrink: 0;
            box-sizing: border-box;
        }
        
        /* Keyboard shortcut hints */
      .morse_converter_keyboard_hint {
        position: absolute;
        right: 10px;
        too:-10px; /* Move it above the input instead of inside */
        background: rgba(0, 0, 0, 0.3);
        border-radius: 4px;
        padding: 3px 6px;
        font-size: 0.7rem;
        color: rgba(255, 255, 255, 0.7);
        pointer-events: none;
    }
        
        /* Loading indicator */
        .morse_converter_loading {
            display: none;
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid var(--morse_converter_text_light);
            border-radius: 50%;
            animation: morse_converter_spin 1s linear infinite;
            margin-right: 8px;
            flex-shrink: 0;
        }
        
        @keyframes morse_converter_spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Shortcut Info */
        .morse_converter_shortcut_info {
            position: relative; /* Change from absolute to relative */
            margin-top: 2px;
            margin-bottom: 1px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 4px;
            padding: 3px 6px;
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            width: fit-content;
        }
        
       .morse_converter_shortcut_info span {
            margin-top: 2px; /* Reduced margin to prevent overlap */
            padding: 1px 5px; /* Slightly increased padding for better spacing */
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            font-family: monospace;
        }

        
        /* Responsive styles */
        @media (max-width: 600px) {
            #morse_converter_sidebar {
                width: 320px;
                right: -330px;
                top: 10px;
                height: calc(100vh - 20px);
            }
            
            #morse_converter_header {
                padding: 15px 20px;
            }
            
            #morse_converter_content {
                padding: 15px 20px;
            }
            
            .morse_converter_btn_group {
                grid-template-columns: 1fr;
            }
        }
        
        /* Fix for small screens and mobile */
        @media (max-height: 600px) {
            #morse_converter_sidebar {
                top: 10px;
                height: calc(100vh - 20px);
            }
            
            #morse_converter_input, #morse_converter_output {
                min-height: 60px;
                max-height: 100px;
            }
            
            .morse_converter_footer {
                padding: 10px;
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // Create root element to contain the CSS variables
    let rootElement = document.createElement("div");
    rootElement.className = "morse_converter_root";
    document.body.appendChild(rootElement);

    // Create the sidebar
    let sidebar = document.createElement("div");
    sidebar.id = "morse_converter_sidebar";
    rootElement.appendChild(sidebar);

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
        <div id="morse_converter_header">
            <div class="morse_converter_title">${icons.morse} Morse Code Converter</div>
            <button id="morse_converter_close_btn" class="morse_converter_button morse_converter_btn_secondary" style="width: auto; padding: 8px; background: rgba(255, 255, 255, 0.05);">
                ${icons.close}
            </button>
        </div>
        <div id="morse_converter_content">
            <div class="morse_converter_input_group">
                <label for="morse_converter_input">Message</label>
                <textarea id="morse_converter_input" placeholder="Type text to encode or Morse code to decode..." rows="4"></textarea>
                <div class="morse_converter_keyboard_hint">Ctrl+Enter</div>
            </div>
            
            <div class="morse_converter_btn_group">
                <button id="morse_converter_encode" class="morse_converter_button morse_converter_btn_primary">
                    ${icons.encode} Encode
                    <div class="morse_converter_loading" id="morse_converter_encode_loader"></div>
                </button>
                <button id="morse_converter_decode" class="morse_converter_button morse_converter_btn_primary">
                    ${icons.decode} Decode
                    <div class="morse_converter_loading" id="morse_converter_decode_loader"></div>
                </button>
            </div>
            
            <div class="morse_converter_output_container">
                <label>Result</label>
                <div id="morse_converter_output"><span class="morse_converter_empty_output">Your result will appear here</span></div>
            </div>
            <div class="morse_converter_shortcut_info">${icons.keyboard} <span>Alt+M</span> to toggle</div>
            <div class="morse_converter_btn_group morse_converter_full">
                <button id="morse_converter_copy" class="morse_converter_button morse_converter_btn_secondary">
                    ${icons.copy} Copy to Clipboard
                </button>
            </div>
        </div>
        <br>
        <div class="morse_converter_footer">
            Morse Code Reference: · = dot, − = dash
               <br>
            
            all rights received ©️ - praneswar 2025
        </div>
    `;

    // Create toggle button (separate from close button)
    let toggleBtn = document.createElement("button");
    toggleBtn.id = "morse_converter_toggle_btn";
    toggleBtn.innerHTML = icons.menu;
    rootElement.appendChild(toggleBtn);

    // Create toast notification element
    let toastNotification = document.createElement("div");
    toastNotification.className = "morse_converter_toast";
    toastNotification.innerHTML = `${icons.check} <span>Copied to clipboard</span>`;
    rootElement.appendChild(toastNotification);

    // Function to open sidebar
    function openSidebar() {
        sidebar.style.right = "0px";
        toggleBtn.style.display = "none";

        // Get selected text from the document
        const selectedText = window.getSelection().toString().trim();

        // If text is selected, paste it into the input field
        if (selectedText) {
            document.getElementById("morse_converter_input").value = selectedText;
        }

        // Focus on input box when opening sidebar
        document.getElementById("morse_converter_input").focus();
    }

    // Function to close sidebar
    function closeSidebar() {
        const isMobile = window.innerWidth <= 600;
        sidebar.style.right = isMobile ? "-330px" : "-400px";
        toggleBtn.style.display = "flex";
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

    // Event listeners for sidebar toggle
    toggleBtn.addEventListener("click", openSidebar);
    document.getElementById("morse_converter_close_btn").addEventListener("click", closeSidebar);

    // Set up event listeners for buttons
    document.getElementById("morse_converter_encode").addEventListener("click", () => {
        const message = document.getElementById("morse_converter_input").value;
        if (!message.trim()) {
            document.getElementById("morse_converter_output").innerHTML = '<span class="morse_converter_empty_output">Please enter a message to encode</span>';
            return;
        }

        // Show loading indicator
        const loader = document.getElementById("morse_converter_encode_loader");
        loader.style.display = "inline-block";

        fetch(`https://morsecodegen-latest.onrender.com/api/morse/encode`, {
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
                document.getElementById("morse_converter_output").textContent = data.encoded;
            })
            .catch(error => {
                document.getElementById("morse_converter_output").textContent = "Error: Could not connect to server";
                console.error('Error:', error);
            })
            .finally(() => {
                // Hide loading indicator
                loader.style.display = "none";
            });
    });

    document.getElementById("morse_converter_decode").addEventListener("click", () => {
        const morseCode = document.getElementById("morse_converter_input").value;
        if (!morseCode.trim()) {
            document.getElementById("morse_converter_output").innerHTML = '<span class="morse_converter_empty_output">Please enter Morse code to decode</span>';
            return;
        }

        // Show loading indicator
        const loader = document.getElementById("morse_converter_decode_loader");
        loader.style.display = "inline-block";

        fetch(`https://morsecodegen-latest.onrender.com/api/morse/decode`, {
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
                document.getElementById("morse_converter_output").textContent = data.decoded;
            })
            .catch(error => {
                document.getElementById("morse_converter_output").textContent = "Error: Could not connect to server";
                console.error('Error:', error);
            })
            .finally(() => {
                // Hide loading indicator
                loader.style.display = "none";
            });
    });

    document.getElementById("morse_converter_copy").addEventListener("click", () => {
        const output = document.getElementById("morse_converter_output");
        const outputText = output.textContent;

        if (!outputText || output.innerHTML.includes("morse_converter_empty_output")) {
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
    document.getElementById("morse_converter_input").addEventListener("keydown", (e) => {
        // Ctrl+Enter to encode
        if (e.key === "Enter" && e.ctrlKey) {
            document.getElementById("morse_converter_encode").click();
            e.preventDefault();
        }
        // Alt+Enter to decode
        else if (e.key === "Enter" && e.altKey) {
            document.getElementById("morse_converter_decode").click();
            e.preventDefault();
        }
    });

    // Global Alt+M shortcut to toggle sidebar (changed from Alt+B to avoid conflicts)
    document.addEventListener("keydown", (e) => {
        if (e.key === "m" && e.altKey) {
            e.preventDefault(); // Prevent default browser actions
            if (sidebar.style.right === "0px") {
                closeSidebar();
            } else {
                openSidebar();
            }
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