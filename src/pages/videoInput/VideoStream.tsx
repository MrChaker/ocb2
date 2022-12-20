import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import VideoCropper from "../../components/VideoCropper";

const VideoStream = () => {
    const videoSrc = useRef<HTMLVideoElement>(null!);

    const { deviceID } = useParams();
    const navigate = useNavigate();

    const [isCropping, setIsCropping] = useState(false);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key == "Escape") navigate("/choose-ocb");
        else if (e.key == "C" || e.key == "c") {
            console.log(isCropping);
            setIsCropping((prev) => {
                if (!prev) videoSrc.current.setAttribute("style", "");
                // reset to normal
                else
                    videoSrc.current.setAttribute(
                        "style",
                        localStorage.getItem("videoCrop") || ""
                    );
                return !prev;
            });
        }
    };

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: { deviceId: deviceID }, audio: false })
            .then((stream) => {
                videoSrc.current.srcObject = stream;
                videoSrc.current.setAttribute(
                    "style",
                    localStorage.getItem("videoCrop") || ""
                );
            });
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div
            className="absolute top-0 left-0 overflow-hidden h-full"
            style={{ width: document.body.clientWidth }}>
            <video
                id="video"
                ref={videoSrc}
                autoPlay
                className="w-full max-w-none object-cover h-full"
            />

            {isCropping && (
                <VideoCropper
                    video={videoSrc.current}
                    setIsCropping={setIsCropping}
                />
            )}
        </div>
    );
};

export default VideoStream;
