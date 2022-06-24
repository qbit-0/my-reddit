import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import SentimentBanner from "../SentimentBanner/SentimentBanner";

const PostPlaceholder = () => {
  return (
    <section className="flex overflow-hidden h-96 mx-auto mb-8 border-t-2 border-l-2 border-gray-800 rounded-tl-2xl bg-gradient-to-r from-gray-800 to-gray-900">
      <SentimentBanner sentiment={null} />
      <div className="flex w-full h-full flex-col justify-center items-center text-gray-700">
        <FontAwesomeIcon icon={solid("frog")} size="10x" bounce />
      </div>
    </section>
  );
};

export default PostPlaceholder;