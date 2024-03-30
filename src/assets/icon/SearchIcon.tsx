import { FC } from 'react';

export interface IIconProps {
    onclick?: (event: Event) => void;
}
const SearchIcon: FC<IIconProps> = ({ onclick }, props) => {
    return (
        <svg
            width={16}
            height={16}
            className='search-icon'
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onclick}
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.5 7.25a6.25 6.25 0 11-12.5 0 6.25 6.25 0 0112.5 0zm-1.49 5.468a7.25 7.25 0 11.707-.707l3.137 3.135a.5.5 0 01-.708.708l-3.135-3.136z"
                fill="#686868"
            />
        </svg>
    );
};

export default SearchIcon;
