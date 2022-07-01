import { useAppDispatch } from "App/store";
import {
    setMaxRatio,
    setMaxSentiment,
    setMinRatio,
    setMinSentiment,
} from "features/nlp/nlpSlice";
import { NlpPresets } from "lib/utils/nlpPresets";
import React, { FC } from "react";
import { batch } from "react-redux";

import Button from "components/Button/Button";
import { ButtonStyle } from "components/Button/Button";

type Props = {};

const Hero: FC<Props> = () => {
    const dispatch = useAppDispatch();

    const handleWorst = () => {
        batch(() => {
            dispatch(setMinSentiment(NlpPresets.worst.minSentiment));
            dispatch(setMaxSentiment(NlpPresets.worst.maxSentiment));
            dispatch(setMinRatio(NlpPresets.worst.minRatio));
            dispatch(setMaxRatio(NlpPresets.worst.maxRatio));
        });
    };

    const handleBest = () => {
        batch(() => {
            dispatch(setMinSentiment(NlpPresets.best.minSentiment));
            dispatch(setMaxSentiment(NlpPresets.best.maxSentiment));
            dispatch(setMinRatio(NlpPresets.best.minRatio));
            dispatch(setMaxRatio(NlpPresets.best.maxRatio));
        });
    };

    return (
        <div className="h-screen bg-neutral-900">
            <header>
                <blockquote
                    cite="www.merriam-webster.com"
                    className="max-w-md pt-8 px-8 sm:pt-16 mx-auto"
                >
                    <p className="p-4 text-justify text-md sm:text-lg font-serif font-light text-amber-100">
                        Doomscrolling refers to the tendency to continue to surf
                        or scroll through bad news, even though that news is
                        saddening, disheartening, or depressing.
                    </p>
                </blockquote>
                <h1 className="mt-16 text-7xl sm:text-8xl text-center font-black">
                    <p className="inline-block text-transparent bg-clip-text bg-gradient-to-t from-rose-600 to-black drop-shadow-lg animate-shake">
                        Doom
                    </p>
                    <p className="inline-block text-transparent bg-clip-text bg-cyan-600 drop-shadow-lg">
                        Scroll
                    </p>
                </h1>
                <h2 className="mt-16 text-2xl font-light text-center text-amber-100">
                    The{" "}
                    <Button
                        bgColor="bg-cyan-700"
                        hoverBgColor="hover:bg-cyan-600"
                        onClick={handleBest}
                    >
                        Best
                    </Button>{" "}
                    and{" "}
                    <Button
                        bgColor="bg-rose-700"
                        hoverBgColor="hover:bg-rose-600"
                        onClick={handleWorst}
                    >
                        Worst
                    </Button>{" "}
                    of Reddit.
                </h2>
            </header>

            <footer className="absolute bottom-0 w-full py-4 bg-neutral-800 drop-shadow-lg text-amber-100">
                <p className="relative bottom-0 text-center font-medium">
                    Designed and Built by Duy Pham
                </p>
            </footer>
        </div>
    );
};

export default Hero;
