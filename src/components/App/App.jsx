import { useState } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import style from './App.module.scss';

const App = () => {
    const [query, setQuery] = useState('');

    const onSubmit = query => {
        setQuery(query);
    };

    return (
        <div className={style.app}>
            <Searchbar onSubmit={onSubmit} />
            <ImageGallery query={query} />
        </div>
    );
};

export default App;