console.log(faceapi);

const run = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  const videoFeedEl = document.getElementById("video-feed");
  videoFeedEl.srcObject = stream;

  // Load the required models
  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./models"), // REQUIRED!
  ]);

  const knownFaces = [
    {
      label: "Tshego",
      imageUrl:
        "http://127.0.0.1:5500/testing-face-id/face-api-webcam-final/public/images/blue-profile.jpg",
    },
    {
      label: "Jordan",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Michael_Jordan_in_2014.jpg/220px-Michael_Jordan_in_2014.jpg",
    },
    {
      label: "Steph",
      imageUrl:
        "http://127.0.0.1:5500/testing-face-id/face-api-webcam-final/public/images/steph.png",
    },
    // add name and photo/selfie url so it can detect to
    // {
    //   label: "Your Name",
    //   imageUrl: "your-selfie-url",
    // },
  ];

  const labeledDescriptors = [];

  for (const face of knownFaces) {
    const img = await faceapi.fetchImage(face.imageUrl);
    const detection = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks() // ✅ MUST include this
      .withFaceDescriptor();

    if (detection) {
      labeledDescriptors.push(
        new faceapi.LabeledFaceDescriptors(face.label, [detection.descriptor])
      );
    }
  }

  const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);

  const checkLogin = async () => {
    const detections = await faceapi
      .detectSingleFace(videoFeedEl)
      .withFaceLandmarks() // ✅ MUST include this
      .withFaceDescriptor();

    if (detections) {
      const bestMatch = faceMatcher.findBestMatch(detections.descriptor);
      console.log("Match result:", bestMatch.toString());

      if (bestMatch.label !== "unknown") {
        alert(`✅ Welcome, ${bestMatch.label}`);

        // ✅ Stop the webcam
        videoFeedEl.srcObject.getTracks().forEach((t) => t.stop());

        // ✅ Remove video and canvas from DOM
        videoFeedEl.remove();
        const canvas = document.getElementById("canvas");
        if (canvas) canvas.remove();

        // ✅ Show success message
        const successDiv = document.getElementById("success-message");
        if (successDiv) {
          successDiv.style.display = "block";
        }

        return;
      }
    }

    setTimeout(checkLogin, 1000);
  };

  checkLogin();
};

run();
