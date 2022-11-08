
const Search = () => {
    return (
        <div className="header-search header-search-extended header-search-visible d-none d-lg-block">
            <form action="/" method="get">
                <div className="header-search-wrapper search-wrapper-wide">
                    <input type="search" className="form-control" name="q" id="q" placeholder="Tìm kiếm ..." required />
                    <button className="btn btn-primary" type="submit"><i className="icon-search"></i></button>
                </div>
            </form>
        </div>
    );
}
export default Search;