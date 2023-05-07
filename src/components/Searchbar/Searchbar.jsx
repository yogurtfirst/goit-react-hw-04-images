import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
import style from './Searchbar.module.scss';

const Searchbar = ({ onSubmit }) => {
    const [value, setValue] = useState('');

    const handleChange = ({ target: { value } }) => {
        setValue(value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit(value);
    };

    return (
        <header className={style.searchbar}>
            <form className={style.searchForm} onSubmit={handleSubmit}>
                <button type="submit" className={style.searchFormButton}>
                    <FiSearch size={30} />
                </button>

                <input
                    className={style.searchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={handleChange}
                    value={value}
                />
            </form>
        </header>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;