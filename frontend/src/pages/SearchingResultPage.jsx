import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SummaryApi from '../../common'
import VerticalCardProduct from '../components/VerticalCardProduct'
import VerticalCard from '../components/VerticalCard'

const SearchingResultPage = () => {
  const [searchResult,setSearchResult]=useState([])
  const [loading,setLoading] = useState(false)
  const query=useLocation()

  console.log(query.search)
  const fetchProduct=async()=>{
    setLoading(true)
    const response=await fetch(SummaryApi.serachFunctionality.url+query.search)
    const responseData=await response.json()
    setSearchResult(responseData.data);
    setLoading(false)
    // console.log("responseDataSearch",responseData.data.length)
  }
  // console.log("Searcg",searchResult)
  useEffect(()=>{
    fetchProduct()
  },[query])
  return (
    <div className='container mx-auto p-4'>
    {
      loading && (
        <p className='text-lg text-center'>Loading ...</p>
      )
    }

    <p className='text-lg font-semibold my-3'>Search Results : {searchResult?.length}</p>

    {
      searchResult?.length === 0 && !loading && (
         <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
      )
    }


    {
      searchResult?.length !==0 && !loading && (
        <VerticalCard loading={ loading} data={searchResult}/>
      )
    }

  </div>
  
  )
}

export default SearchingResultPage