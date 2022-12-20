import { useEffect, useRef, useState } from "react";
import ButtonInstance from "../../components/Button/ButtonInstance";
import DropDown, { Item } from "../../components/dropDown";
import PopUp from "../../components/PopUp";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

const Stream = () => {
    if (localStorage.getItem("device")) {
        navigator.mediaDevices
            .enumerateDevices()
            .then(function (Devices) {
                let device = Devices.find(
                    (d) => d.label == localStorage.getItem("device")
                );
                if (device && device.deviceId) {
                    navigate("/video-stream/" + device.deviceId);
                }
            })
            .catch(function (err) {
                console.log(err.name + ": " + err.message);
            });
    }
    const [posSelected, setPosSelected] = useState(false);
    const dd = useRef<HTMLSelectElement>(null!);
    const [errMsg, setErrMsg] = useState(false);

    const handleSelection = () => {
        if (posSelected) {
            localStorage.setItem(
                "device",
                dd.current.selectedOptions[0].innerText
            );
            navigate("/video-stream/" + dd.current.value);
        } else {
            setErrMsg(true);
            setTimeout(() => {
                setErrMsg(false);
            }, 2000);
        }
    };

    const navigate = useNavigate();

    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    useEffect(() => {
        scanDevices();
        navigator.mediaDevices.getUserMedia({ video: true });
    }, []);

    const scanDevices = () => {
        dd.current.selectedIndex = 1;
        setTimeout(() => {
            dd.current.selectedIndex = 0;
        }, 1000);
        console.log(window.isSecureContext);
        navigator.mediaDevices
            .enumerateDevices()
            .then(function (Devices) {
                setDevices(Devices);
                Devices.forEach(function (device) {
                    console.log(device);
                });
            })
            .catch(function (err) {
                console.log(err.name + ": " + err.message);
            });
    };

    const handleChange = () => {
        if (dd.current.value == "scan") {
            setPosSelected(false);
            scanDevices();
        } else {
            setPosSelected(true);
        }
    };
    return (
        <div className="flex flex-col gap-8 m-auto">
            <Link
                to={"/choose-ocb"}
                className="absolute top-10 left-10 flex gap-3 items-center">
                <IoChevronBack size={24} />
                <p>Go back</p>
            </Link>
            <h1 className="text-6xl text-center">Choose a usb device</h1>
            <DropDown ref={dd} onChange={() => handleChange()}>
                <Item value="" name="-- Select POS --" hidden />
                <Item name="...scanning" hidden />
                <Item
                    value="scan"
                    name="🔎 Scan your computer if you can't see your device"
                />
                {devices &&
                    devices.map((d, i) => (
                        /* d.kind == "videoinput" && */ <Item
                            value={d.deviceId}
                            name={d.label}
                            key={i}
                        />
                    ))}
            </DropDown>
            <ButtonInstance
                text="START STREAMING"
                style="w-fit m-auto"
                onClick={handleSelection}
            />
            <PopUp text="Please select an option" visibile={errMsg} />
        </div>
    );
};

export default Stream;
