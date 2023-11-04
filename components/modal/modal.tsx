import {cva, VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";
import * as React from "react";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof modalVariants> {
    modalstate: boolean;
    modalstatechange: () => void;
}

const modalVariants = cva(
    "opacity-100 bg-primary-foreground fixed z-50 border duration-300 ease-in-out transition-transform",
    {
        variants: {
            variant: {
                center:
                    "translate-y-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
                right: "translate-x-full right-0 top-0",
                left: "-translate-x-full left-0 top-0",
                all: "translate-x-full inset-0",
                bottom: "translate-y-full right-0 inset-x-0 bottom-0",
            },
        },
        defaultVariants: {
            variant: "center",
        },
    }
);

function Modal({className, variant, modalstate, modalstatechange, ...props}: ModalProps) {
    return (
        <>
            {modalstate && (
                <div
                    onClick={modalstatechange}
                    className="bg-black z-40 inset-0 w-screen h-screen fixed opacity-50 transition-all delay-300 duration-100"
                ></div>
            )}
            <div className={cn(modalVariants({variant}), className, !modalstate && "hidden")} {...props} />
        </>
    );
}

export {Modal, modalVariants};
