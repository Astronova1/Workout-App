const Filter = ({currentSort,setSort}) => {
    return (
        <label>
            Sort by:
            <select value={currentSort}
             onChange={e => setSort(e.target.value)}
            >
                <option value={-1}>ascending</option>
                <option value={1}>descending</option>
                {/*<option value={"rescent"}>Rescently added</option>*/}
            </select>
        </label>
    )
}

export default Filter