import React from "react";

type Props = {
    imgSrc: string;
    href: string;
};

const Preview: React.FC<Props> = ({ imgSrc, href }) => {
    return (
        <div className="my-4">
            <a
                title="post preview"
                href={href}
                target="_blank"
                rel="noreferrer"
            >
                <figure className="overflow-clip max-w-2xl max-h-[40rem] mt-4 mx-auto rounded-xl shadow-lg bg-neutral-800">
                    <img
                        alt="post preview"
                        src={imgSrc}
                        className="block object-contain mx-auto"
                    />
                </figure>
            </a>
        </div>
    );
};

export default Preview;