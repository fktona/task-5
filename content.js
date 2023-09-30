console.log("Hi, I have been injected whoopie!!!")

var recorder = null
function onAccessApproved(stream){
    recorder = new MediaRecorder(stream);

    recorder.start();

    recorder.onstop = function(){
        stream.getTracks().forEach(function(track){
            if(track.readyState === "live"){
                track.stop()
            }
        })
    }
    
 async function sendVideoToServer(blob) {
  try {
    const formData = new FormData();
    formData.append('video', blob, 'screen-recording.webm');
    
    console.log(formData);
    
    const response = await fetch('https://google-chrome-extension.onrender.com/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (response.ok) {
      console.log('Video uploaded successfully');
    } else {
      console.error('Failed to upload video');
    }
  } catch (error) {
    console.error('Error uploading video:', error);
  }
}





    recorder.ondataavailable = function(event){
        let recordedBlob  = event.data;
        let url = URL.createObjectURL(recordedBlob);
        sendVideoToServer(recordedBlob)

        let a = document.createElement("a");

        a.style.display = "none";
        a.href = url;
        a.download = "screen-recording.webm"

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    }
}


chrome.runtime.onMessage.addListener( (message, sender, sendResponse)=>{

    if(message.action === "request_recording"){
        console.log("requesting recording")

        sendResponse(`processed: ${message.action}`);

        navigator.mediaDevices.getDisplayMedia({
            audio:true,
            video: {
                width:9999999999,
                height: 9999999999
            }
        }).then((stream)=>{
            onAccessApproved(stream)
        })  
    }

    if(message.action === "stopvideo"){
        console.log("stopping video");
        sendResponse(`processed: ${message.action}`);
        if(!recorder) return console.log("no recorder")

        recorder.stop();


    }

})