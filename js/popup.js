document.addEventListener("DOMContentLoaded", ()=>{
    // GET THE SELECTORS OF THE BUTTONS
    const startVideoButton = document.querySelector("button#start_video")
    const stopVideoButton = document.querySelector("button#stop_video")
    const errmsg = document.querySelector(".error")

    // Get the popup container element
const popupContainer = document.querySelector(".content");

let isDragging = false;
let offsetX, offsetY;

// Add mousedown event listener to start dragging
popupContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - popupContainer.getBoundingClientRect().left;
    offsetY = e.clientY - popupContainer.getBoundingClientRect().top;
});

// Add mousemove event listener to move the popup when dragging
document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        popupContainer.style.left = `${x}px`;
        popupContainer.style.top = `${y}px`;
    }
});

// Add mouseup event listener to stop dragging
document.addEventListener("mouseup", () => {
    isDragging = false;
});

// Prevent text selection while dragging
popupContainer.addEventListener("selectstart", (e) => {
    e.preventDefault();
});

    // adding event listeners

    startVideoButton.addEventListener("click", ()=>{
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "request_recording"},  function(response){
                if(!chrome.runtime.lastError){
                    console.log(response)
                } else{
                    errmsg.style.display = "block"
                    console.log(chrome.runtime.lastError, 'error line 14')
                }
            })
        } )
    })


    stopVideoButton.addEventListener("click", ()=>{
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "stopvideo"},  function(response){
                if(!chrome.runtime.lastError){
                    console.log(response)
                } else{
                    console.log(chrome.runtime.lastError, 'error line 27')
                }
            })
        } )
    })
})