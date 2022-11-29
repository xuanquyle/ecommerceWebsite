import { useForm } from "react-hook-form"
import { searchData } from "../../api";


const Search = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        try {
            // let newData = ['_search', { columns: 'name', content: data.content }]
            let newData = `_search&column=name&content=${data.content}`
            console.log(newData);
            let res = await searchData(newData)
            console.log(res);
        } catch (error) {

        }

    }
    return (
        <div className="header-search header-search-extended header-search-visible d-none d-lg-block">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="header-search-wrapper search-wrapper-wide">
                    <input type="search" className="form-control" placeholder="Tìm kiếm ..."
                        required
                        {...register("content", {
                            // required: true,
                            // minLength: 6
                        })}
                    />
                    <button className="btn btn-primary" type="submit"><i className="icon-search"></i></button>
                </div>
            </form>
        </div>
    );
}
export default Search;