
import SearchIcon from 'assets/icon/SearchIcon';
import TextInput from 'components/CommonInput/TextInput';
import { useState, memo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchBar= memo(
    ({ keySearch }) => {
        const [searchParams, setSearchParams] = useSearchParams();
        const [value, setValue] = useState('');
        useEffect(() => {
            const tempString = searchParams.get('search');
            tempString && setValue(tempString);
        }, [searchParams]);

        const handleChange = useCallback((e) => {
            setValue(e);
        }, []);

        const handleSearch = useCallback(() => {
            if (!value) {
                searchParams.delete('search');
                setSearchParams(searchParams);
                return;
            }

            searchParams.delete('page');
            if (keySearch) {
                searchParams.set(keySearch, value);
            } else {
                searchParams.set('search', value);
            }
            setSearchParams(searchParams);
        }, [value, searchParams, setSearchParams, keySearch]);

        const handleEnter = useCallback(
            (e) => {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            },
            [handleSearch]
        );

        return (
            <>
                <TextInput
                    value={value}
                    onChange={handleChange}
                    className="search-input"
                    placeholder="Tìm kiếm"
                    onKeyDown={handleEnter}
                    prefix={
                        <div className="search-button" onClick={handleSearch}>
                            <SearchIcon />
                        </div>
                    }
                ></TextInput>
            </>
        );
    }
);

export default SearchBar;