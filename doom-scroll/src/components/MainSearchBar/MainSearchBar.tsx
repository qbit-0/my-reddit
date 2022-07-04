import React, {
    ChangeEventHandler,
    KeyboardEventHandler,
    useState,
} from "react";

import SearchBar from "components/SearchBar/SearchBar";
import { generatePath, useNavigate, useSearchParams } from "react-router-dom";

type Props = {};

const MainSearchBar: React.FC<Props> = () => {
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleQueryChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setQuery(event.target.value);
    };

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (event.code === "Enter") handleSearchSubmit();
    };

    const handleSearchSubmit = () => {
        const newSearchPath = generatePath("/search");
        const newSearchParams = new URLSearchParams();
        newSearchParams.set("q", query);
        navigate(`${newSearchPath}?${newSearchParams.toString()}`);
    };

    const urlQuery = searchParams.get("q");

    return (
        <SearchBar
            highlight={urlQuery === query}
            value={query}
            onChange={handleQueryChange}
            onKeyDown={handleKeyDown}
            onSubmit={handleSearchSubmit}
        />
    );
};

export default MainSearchBar;
