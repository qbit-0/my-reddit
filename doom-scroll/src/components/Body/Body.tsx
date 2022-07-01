import React from "react";
import { FC } from "react";

import ImagePreview from "components/ImagePreview/ImagePreview";
import SanitizeHTML from "components/SanitizeHTML/SanitizeHTML";

type Props = {
    post: any;
};

const Body: FC<Props> = ({ post }) => {
    if (post.data["selftext_html"]) {
        return (
            <div className="flex max-h-[8rem] px-4 my-4">
                <div className="overflow-y-auto overflow-ellipsis">
                    <SanitizeHTML dirty={post.data["selftext_html"]} />
                </div>
            </div>
        );
    }

    if (post.data?.["media"]?.["oembed"]?.["html"]) {
        return (
            <div className="overflow-auto max-h-[25rem] px-4">
                <SanitizeHTML dirty={post.data["media"]["oembed"]["html"]} />
            </div>
        );
    }

    if (post.data?.["media"]?.["reddit_video"]?.["dash_url"]) {
        return (
            <div className="flex overflow-auto max-h-[25rem]">
                <video muted loop preload="auto" controls className="mx-auto">
                    <source
                        src={post.data["media"]["reddit_video"]["dash_url"]}
                    />
                    <source
                        src={post.data["media"]["reddit_video"]["fallback_url"]}
                    />
                    <source
                        src={post.data["media"]["reddit_video"]["hls_url"]}
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    }

    if (post.data?.["preview"]?.["images"]?.["0"]?.["source"]?.["url"]) {
        return (
            <ImagePreview
                src={post.data["preview"]["images"]["0"]["source"]["url"]}
                href={post.data["url_overridden_by_dest"]}
            />
        );
    }

    if (post.data["post_hint"] === "image") {
        return (
            <ImagePreview
                src={post.data["url_overridden_by_dest"]}
                href={post.data["url_overridden_by_dest"]}
            />
        );
    }

    if (post.data?.["gallery_data"]?.["items"]) {
        return (
            <div className="flex flex-wrap overflow-auto max-h-[25rem] gap-2">
                {Object.values(post.data["gallery_data"]["items"]).map(
                    ({ media_id }: any, index) => {
                        return (
                            <ImagePreview
                                src={
                                    post.data["media_metadata"][media_id]["s"][
                                        "u"
                                    ]
                                }
                                href={post.data["url_overridden_by_dest"]}
                                key={index}
                            />
                        );
                    }
                )}
            </div>
        );
    }

    if (
        post.data?.["thumbnail"] !== "default" &&
        post.data?.["thumbnail"] !== "self"
    ) {
        return (
            <ImagePreview
                src={post.data["thumbnail"]}
                href={post.data["url_overridden_by_dest"]}
            />
        );
    }

    return null;
};

export default Body;
