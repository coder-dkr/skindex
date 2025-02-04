import ProductGallery from "../components/ProductGallery"
import useSearch from "../hooks/useSearch"


const Search = () => {

    const {Query} = useSearch()

  return (
    <section className="bg-white py-10 pt-4 px-24 mb-[16.3rem]">
        <h1 className="text-xl text-[#A4A4A4] font-medium px-8">Search Results for: {Query}</h1>
        <div className="mt-8">
            <ProductGallery  isSearchResults/>
        </div>
    </section>
  )
}

export default Search
