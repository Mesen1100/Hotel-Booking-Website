"use client";
import React, { ChangeEvent, ReactNode, Suspense, useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import useHotelSearchResponseStore from "@/components/store/useHotelListData";
import NotFound from "../not-found";
import HotelListPage from "./HotelListPage";
import { Box, Pagination, SelectChangeEvent, TablePagination } from "@mui/material";
import Header from "@/components/header";
import { FilterRequest, SearchRequest } from "@/services/SearchRequest";
import useFilterRequestStore from "@/components/store/useFilterRequestData";
import _default from "@emotion/react/_isolated-hnrs";
export interface FilterOption {
  y: string | null;
  x: string | null;
  price: number | null;
  star: number | null;
  provider: string | null;
  distanceFromSea: number | null;
  id: string;
  name: string;
  count: number | null;
}

export interface Filter {
  type: number;
  options: FilterOption[];
  from: string | null;
  to: string | null;
}

export interface Filters {
  hotel: Filter[];
}


const Home: React.FC = () => {
  const { filterRequestData } = useFilterRequestStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [FilterHotelList, setFilterHotelList] = useState<FilterRequestResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRowCount, setPageRowCount] = useState(10);
  const [price, setPrice] = useState<Filter>();
  const [facilites, setFacilites] = useState<Filter>();
  const [star, setStar] = useState<Filter>();
  const [board, setBoard] = useState<Filter>();
  const [themes, setThemes] = useState<Filter>();
  const [options, setOptions] = useState<Filters>();
  const [filterRequestTypes, setFilterRequestTypes] = useState([
    { type: 2, values: [], from: 0, to: 0 },
    { type: 4, values: [], from: 0, to: 0 },
    { type: 6, values: [], from: 0, to: 0 },
    { type: 7, values: [], from: 0, to: 0 },
    { type: 8, values: [], from: 0, to: 0 }
  ]);
  
  const filteredFilters = filterRequestTypes.filter((filter: { values: string | any[]; }) => filter.values.length > 0);
  const requestData = {
    currency: filterRequestData.currency,
    culture: "en-US",
    pagingOptions: [
      {
        currentPage: currentPage,
        pageRowCount: pageRowCount,
        productType: 2,
        getFilters: true,
        filters: filteredFilters,
        sort: 0,
        isNewPagingRequest: true
      }
    ],
    searchId: filterRequestData.searchId,
  };
  const updateFilterRequestTypes = (newData: any) => {
    setFilterRequestTypes(newData);
    fetchFilterOptions();
  };

  const fetchFilterOptions = async () => {
    try {
      const data = await FilterRequest(requestData);
      const allFilter = data.body.filters;
      setOptions(allFilter);
      const starData = allFilter.hotel.find((filter: { type: number; }) => filter.type === 2);
      setStar(starData);
      const priceData = allFilter.hotel.find((filter: { type: number; }) => filter.type === 8);
      setPrice(priceData);
      const boardData = allFilter.hotel.find((filter: { type: number; }) => filter.type === 6);
      setBoard(boardData);
      const facilitesData = allFilter.hotel.find((filter: { type: number; }) => filter.type === 7);
      setFacilites(facilitesData);
      const themesData = allFilter.hotel.find((filter: { type: number; }) => filter.type === 4);
      setThemes(themesData);
      setFilterHotelList(data);
    }
    catch (error) {
      setError(error);
      console.error('Error fetching hotel data:', error);
    }

  };
  useEffect(() => {

    fetchFilterOptions();
  }, []);
  const handleChangePage = (event: React.ChangeEvent<unknown> | null, newPage: number) => {
    setCurrentPage(newPage);
    fetchFilterOptions();
  };
  const handlePageRowCount = (event: SelectChangeEvent<number>, child: ReactNode) => {
    setPageRowCount(Number(event.target.value));
    fetchFilterOptions();
  };

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto mt-10 px-4">
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 10, py: 8, justifyContent: "center" }}>
          <Suspense fallback={<div>Loading...</div>}>
            <FilterSection board={board} facilities={facilites} price={price} star={star} themes={themes} filterRequestTypes={filterRequestTypes} updateFilterRequestTypes={updateFilterRequestTypes}  />
            <HotelListPage HotelListData={FilterHotelList} error={error} loading={loading} currentPage={currentPage} pageRowCount={pageRowCount} handleChangePage={handleChangePage} handlePageRowCount={handlePageRowCount} />
          </Suspense>
        </Box>
      </main>
    </>
  );
};
export default Home;
