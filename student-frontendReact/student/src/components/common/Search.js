import React from "react";
import "./Search.css";

const Search = ({ search, setSearch }) => {
    return (
        <div className="col-sm-6 mb-4">
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    className="form-control search-bar"
                    type="search"
                    role="searchbox"
                    placeholder="Search students..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        </div>
    );
};

export default Search;
