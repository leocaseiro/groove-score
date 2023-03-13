import { WebMidi } from "webmidi";

// Function triggered when WEBMIDI.js is ready
function onEnabled() {
  // Display available MIDI input devices
  if (WebMidi?.inputs.length < 1) {
    console.log("No device detected.");
  } else {
    WebMidi?.inputs.forEach((device, index) => {
        console.log(`${index}: ${device.name}`);
    });
  }
}

function getUSBinputs() {
  console.log('>>>', WebMidi.inputs);
}

// Enable WEBMIDI.js and trigger the onEnabled() function when ready
export async function loadWebmidi(node: HTMLElement) {
    await WebMidi.enable();
    WebMidi.addListener("portschanged", getUSBinputs);
  
  // console.log('loadWebmidi', node);
  //   WebMidi
  //   .enable()
  //   .then(onEnabled)
  //   .catch((err) => alert(err));
}