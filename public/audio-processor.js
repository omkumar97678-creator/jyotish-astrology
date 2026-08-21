class AudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bufferSize = 2048;
    this.buffer = new Float32Array(this.bufferSize);
    this.bytesWritten = 0;
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (!input || !input[0]) return true;

    const channelData = input[0];
    for (let i = 0; i < channelData.length; i++) {
      this.buffer[this.bytesWritten++] = channelData[i];
      if (this.bytesWritten >= this.bufferSize) {
        this.flush();
      }
    }
    return true;
  }

  flush() {
    const sendBuffer = new Float32Array(this.buffer);
    this.port.postMessage(sendBuffer);
    this.bytesWritten = 0;
  }
}

registerProcessor('audio-processor', AudioProcessor);
