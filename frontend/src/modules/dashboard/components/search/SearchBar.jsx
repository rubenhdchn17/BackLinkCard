import styles from "./SearchBar.module.css";

const SearchBar = () => {
    return (
        <div className={styles.searchBar}>
            <input type="text" placeholder="Search" />
            <i className="bi bi-search"></i>
        </div>
    );
};

export default SearchBar;
