import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const ProgressBar = (props: { width: number }) => {
    let shared = "rounded-full border-2 border-grey-100 p-1 ";

    const turnOn = (width: number, compareTo: number): string => {
        return width >= compareTo
            ? "bg-primary-200"
            : "bg-white cursor-not-allowed";
    };

    const progress = useRef<HTMLDivElement>(null!);
    useEffect(() => {
        progress.current.style.width = `${props.width}%`;
    }, [props.width]);

    return (
        <div className={`h-3 relative ${shared} w-[460px] m-auto`}>
            <div
                ref={progress}
                className="absolute rounded-full h-2 bg-primary-200 top-0 transition-all"></div>
            <ProgressPoint
                className={`${shared} -left-1 bg-primary-200 `}
                to="/choose-ocb"
                disabled={false}
            />
            <ProgressPoint
                className={`${shared} left-1/3 ${turnOn(props.width, 100 / 3)}`}
                to="/pos"
                disabled={props.width < 100 / 3}
            />
            <ProgressPoint
                className={`${shared} right-1/3 ${turnOn(
                    props.width,
                    200 / 3
                )}`}
                to="/which-pos"
                disabled={props.width < 200 / 3}
            />
            <ProgressPoint
                className={`${shared} -right-1 ${turnOn(props.width, 100)}`}
                to="/which-pos"
                disabled={true}
            />
        </div>
    );
};

type PropsType = {
    className: string;
    to: string;
    disabled: boolean;
};

export const ProgressPoint = (props: PropsType) => {
    return (
        <Link
            role="ProgressPoint"
            to={!props.disabled ? props.to : "#"}
            className={`pr-test transition-all absolute h-5 w-5 -top-[6px] hover:bg-primary-300 hover:scale-125bg-white cursor-pointer ${props.className}`}></Link>
    );
};

export default ProgressBar;
