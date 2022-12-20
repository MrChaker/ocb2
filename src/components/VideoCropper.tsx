import React, { DragEvent, useEffect, useRef, useState } from "react";

type CropProps = {
    x: number;
    y: number;
    width: number;
    height: number;
};

type VideoCropperProps = {
    video: HTMLVideoElement;
    setIsCropping: React.Dispatch<React.SetStateAction<boolean>>;
};
const VideoCropper = ({ video, setIsCropping }: VideoCropperProps) => {
    const cropper = useRef<HTMLDivElement>(null!);
    const initialProps: CropProps = {
        x: 0,
        y: 0,
        width: document.body.offsetWidth * 0.8,
        height: document.body.offsetHeight * 0.8,
    };
    const [cropProps, setCropProps] = useState<CropProps>(initialProps);

    const heightRef = useRef<HTMLInputElement>(null!);
    const widthRef = useRef<HTMLInputElement>(null!);

    const pos = useRef<{ x: number; y: number } | null>(null);

    function handleDragStart(e: DragEvent<HTMLDivElement>) {
        cropper.current.style.opacity = "0";
        pos.current = {
            x: e.clientX,
            y: e.clientY,
        };
    }
    const handleDrag = (e: DragEvent<HTMLDivElement>) => {
        const _cropper = e.target as HTMLDivElement;

        document.getElementById("willBeRemoved")?.remove();
        const dragged: HTMLDivElement = document.createElement("div");
        dragged.id = "willBeRemoved";
        dragged.setAttribute(
            "style",
            `
            width: ${_cropper.offsetWidth}px;
            height: ${_cropper.offsetHeight}px;
            background-color: rgb(96 165 250);
            top: ${
                e.clientY -
                (pos?.current?.y! - pxValueToNumber(cropper.current.style.top))
            }px;
            left: ${
                e.clientX -
                (pos?.current?.x! - pxValueToNumber(cropper.current.style.left))
            }px;
            position: absolute;
            border: 2px solid white;
            opacity: 0.6
        `
        );
        document.getElementById("cropper")?.append(dragged);
    };

    const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
        cropper.current.style.opacity = "0.6";
        cropper.current.style.top = `${
            e.clientY -
            (pos?.current?.y! - pxValueToNumber(cropper.current.style.top))
        }px`;
        cropper.current.style.left = `${
            e.clientX -
            (pos?.current?.x! - pxValueToNumber(cropper.current.style.left))
        }px`;
        document.getElementById("willBeRemoved")?.remove();
        checkBoundries();
    };

    const pxValueToNumber = (px: string) => {
        if (!px) return 0;
        let i = 0;
        while (px.charAt(i) !== "p") i++;
        return parseInt(px.slice(0, i));
    };

    const handleSave = () => {
        setIsCropping(false);
        let cropperProps = {
            top: cropper.current.offsetTop,
            left: cropper.current.offsetLeft,
            bottom:
                video.offsetHeight -
                cropper.current.offsetTop -
                cropper.current.offsetHeight,
            right:
                video.offsetWidth -
                cropper.current.offsetLeft -
                cropper.current.offsetWidth,
        };

        // find  scaling percentage
        let scaleX = video.offsetWidth / cropper.current.offsetWidth;
        let scaleY = video.offsetHeight / cropper.current.offsetHeight;
        video.setAttribute(
            "style",
            `
            -webkit-clip-path: inset(${cropperProps.top}px ${
                cropperProps.right
            }px ${cropperProps.bottom}px ${cropperProps.left}px);
            transform: translate(${-cropperProps.left * scaleX}px, ${
                -cropperProps.top * scaleY
            }px) scale(${scaleX}, ${scaleY});
            transform-origin: left top
            `
        );
        localStorage.setItem("videoCrop", video.getAttribute("style") || "");
    };

    const checkBoundries = () => {
        // top
        if (cropper.current.offsetTop <= 0) {
            cropper.current.style.top = `0px`;
        }
        // left
        if (cropper.current.offsetLeft <= 0) {
            cropper.current.style.left = `0px`;
        }
        //bottom
        if (
            video.offsetHeight -
                cropper.current.offsetTop -
                cropper.current.offsetHeight <
            0
        ) {
            cropper.current.style.top = `${
                video.offsetHeight - cropper.current.offsetHeight
            }px`;
        }
        //right
        if (
            video.offsetWidth -
                cropper.current.offsetLeft -
                cropper.current.offsetWidth <
            0
        ) {
            cropper.current.style.left = `${
                video.offsetWidth - cropper.current.offsetWidth
            }px`;
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case "Enter":
                handleSave();
                break;
            case "ArrowUp":
                setCropProps((prev) => {
                    return {
                        ...prev,
                        y: prev.y - 10 <= 0 ? 0 : prev.y - 10,
                    };
                });
                break;
            case "ArrowDown":
                setCropProps((prev) => {
                    return {
                        ...prev,
                        y:
                            prev.y + 10 + prev.height >= video.offsetHeight
                                ? video.offsetHeight - prev.height
                                : prev.y + 10,
                    };
                });
                break;
            case "ArrowLeft":
                setCropProps((prev) => {
                    return {
                        ...prev,
                        x: prev.x - 10 <= 0 ? 0 : prev.x - 10,
                    };
                });
                break;
            case "ArrowRight":
                setCropProps((prev) => {
                    return {
                        ...prev,
                        x:
                            prev.x + 10 + prev.width >= video.offsetWidth
                                ? video.offsetWidth - prev.width
                                : prev.x + 10,
                    };
                });
                break;
            case "d":
                if (cropper.current.offsetWidth < video.offsetWidth) {
                    setCropProps((prev) => {
                        widthRef.current.value = `${prev.width + 10}`;
                        return {
                            ...prev,
                            width: prev.width + 10,
                        };
                    });
                }
                checkBoundries();
                break;
            case "a":
                setCropProps((prev) => {
                    widthRef.current.value = `${prev.width - 10}`;
                    return {
                        ...prev,
                        width: prev.width - 10,
                    };
                });
                checkBoundries();
                break;
            case "w":
                setCropProps((prev) => {
                    heightRef.current.value = `${prev.height - 10}`;
                    return {
                        ...prev,
                        height: prev.height - 10,
                    };
                });
                checkBoundries();
                break;
            case "s":
                if (cropper.current.offsetHeight < video.offsetHeight) {
                    setCropProps((prev) => {
                        heightRef.current.value = `${prev.height + 10}`;
                        return {
                            ...prev,
                            height: prev.height + 10,
                        };
                    });
                }
                checkBoundries();
                break;
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    return (
        <div
            id="cropper"
            className="bg-black absolute top-0 left-0 opacity-60 w-full h-full">
            <div
                ref={cropper}
                className="border-2 border-white bg-blue-400 bg-opacity-60 absolute w-4/5 h-4/5 resize overflow-auto"
                style={{
                    top: cropProps.y,
                    left: cropProps.x,
                    width: cropProps.width,
                    height: cropProps.height,
                    maxWidth: video.offsetWidth,
                    maxHeight: video.offsetHeight,
                }}
                draggable
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}></div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-10">
                <input
                    type="range"
                    ref={heightRef}
                    className="block mb-5 w-96"
                    name="height"
                    defaultValue={cropProps.height}
                    min="0"
                    max={document.body.offsetHeight}
                    onChange={(e) => {
                        setCropProps({
                            ...cropProps,
                            height: parseInt(e.target.value),
                        });
                        checkBoundries();
                    }}
                />
                <input
                    ref={widthRef}
                    type="range"
                    className="block w-96"
                    name="width"
                    defaultValue={cropProps.width}
                    min="0"
                    max={document.body.offsetWidth}
                    onChange={(e) => {
                        setCropProps({
                            ...cropProps,
                            width: parseInt(e.target.value),
                        });
                        checkBoundries();
                    }}
                />
            </div>
        </div>
    );
};

export default VideoCropper;
