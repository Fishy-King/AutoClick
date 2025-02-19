(function(){
    let clickInterval;
    const clickDelay = 500; // Click speed in milliseconds

    function clickAtMousePosition() {
        const element = document.elementFromPoint(window.mouseX, window.mouseY);
        if (element) {
            element.click();
            console.log("Clicked:", element);
        } else {
            console.warn("No clickable element found at mouse position.");
        }
    }

    function trackMousePosition(event) {
        window.mouseX = event.clientX;
        window.mouseY = event.clientY;
    }

    document.addEventListener("mousemove", trackMousePosition);

    function createUI() {
        if (document.getElementById("autoclicker-ui")) return;

        const ui = document.createElement("div");
        ui.id = "autoclicker-ui";
        ui.innerHTML = `
            <p style="margin: 0;">Auto Clicker</p>
            <button id="start-btn" style="background: #4CAF50; color: white;">Start</button>
            <button id="stop-btn" style="background: #FF5733; color: white;">Stop</button>
        `;
        Object.assign(ui.style, {
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "150px",
            background: "#222",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            zIndex: "10000",
            cursor: "grab"
        });
        document.body.appendChild(ui);

        document.getElementById("start-btn").addEventListener("click", () => {
            if (!clickInterval) {
                clickInterval = setInterval(clickAtMousePosition, clickDelay);
                console.log("Auto-clicker started.");
            }
        });

        document.getElementById("stop-btn").addEventListener("click", () => {
            clearInterval(clickInterval);
            clickInterval = null;
            console.log("Auto-clicker stopped.");
        });

        // Make the UI draggable
        let offsetX, offsetY, isDragging = false;
        ui.addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - ui.getBoundingClientRect().left;
            offsetY = e.clientY - ui.getBoundingClientRect().top;
            ui.style.cursor = "grabbing";
        });

        document.addEventListener("mousemove", (e) => {
            if (isDragging) {
                ui.style.left = e.clientX - offsetX + "px";
                ui.style.top = e.clientY - offsetY + "px";
            }
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
            ui.style.cursor = "grab";
        });
    }

    createUI();
})();
