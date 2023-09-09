import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from '../redux/actions/actionFetchData';
import { updateSelectedCategory } from '../redux/actions/actionSelectCategory';
import { connect } from 'react-redux';
import { updateSorting } from '../redux/actions/actionSorting';

const selectData = (state:any) => state.search.input;
const selectCategories = (state:any) => state.search.allCategories;
const selectedCategory = (state:any) => state.search.selectedCategory;
const selectedSorting = (state:any) => state.search.sortedBy;

function SearchBar({ fetchBooks } : { fetchBooks: any}){
    const input = useSelector(selectData);
    const allCategories = useSelector(selectCategories);
    const category = useSelector(selectedCategory);
    const dispatch = useDispatch();
    const sortedBy = useSelector(selectedSorting);
    
    const handleChange = (event:any) => {
        dispatch({type: "INPUT_CHANGE", payload: event.target.value});
    }
    const handleClick = (event:any) => {
        event.preventDefault();
        fetchBooks(input);
    }
    const handleKeyPress = (event:any) => {
        if(event.key === 'Enter'){
            fetchBooks(input);
        }
    }
    const handleCategoryChange = (event:any) => {
        dispatch(updateSelectedCategory(event.target.value));
    }
    const handleSortChange = (event:any) => {
        dispatch(updateSorting(event.target.value));
    }
    return (
        <div className="search-wrapper">
            <h1 className="search-title">Search for books</h1>
            <div className="input-wrapper">
                <input type="text" value={input} onChange={handleChange} onKeyDown={handleKeyPress}/>
                <button onClick={handleClick}>Search</button>
            </div>
            <div className="filters-wrapper">
                <h3 className="filters">Categories</h3>
                <select value={category} className="categories-select" onChange={handleCategoryChange} name="" id="">
                    {allCategories.map((category:string, id:string) => {
                        return <option value={category} key={id}>{category}</option>
                    })}
                </select>
                <h3 className="filters">Sorting by</h3>
                <select value={sortedBy} className="categories-select" onChange={handleSortChange} name="" id="">
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                    <option value="HighestPageCount">Highest page count</option>
                    <option value="LowestPageCount">Lowest page count</option>
                </select>
            </div>
        </div>
    )
}

export default connect(null, { fetchBooks }) (SearchBar);