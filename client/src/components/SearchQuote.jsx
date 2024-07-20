import { useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { searchQuotes } from "../redux/quote/quoteSlice";

// eslint-disable-next-line react/prop-types
const SearchQuote = ({ setExtraQuery }) => {
  const dispatch = useDispatch();
  const [createdBy, setCreatedBy] = useState("");
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [quotationNo, setQuotationNo] = useState("EPPL/ATT/QTN/");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { initials } = useSelector((state) => state.user);
  const [selectedFilters, setSelectedFilters] = useState({
    createdBy: false,
    projectName: false,
    clientName: false,
    fromDate: false,
    toDate: false,
    quotationNo: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    let query = "";

    if (selectedFilters.createdBy) {
      query += `&createdBy=${createdBy}`;
    }

    if (selectedFilters.projectName) {
      query += `&projectName=${projectName}`;
    }
    if (selectedFilters.clientName) {
      query += `&clientName=${clientName}`;
    }

    if (selectedFilters.fromDate) {
      query += `&fromDate=${fromDate}`;
    }
    if (selectedFilters.toDate) {
      query += `&toDate=${toDate}`;
    }

    if (selectedFilters.quotationNo) {
      query += `&quotationNo=${quotationNo}`;
    }

    try {
      setLoading(true);
      const resultAction = await dispatch(searchQuotes(query.slice(1)));
      setExtraQuery(query.slice(1));
      // eslint-disable-next-line no-unused-vars
      const result = unwrapResult(resultAction);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching tickets:", error);
    }
  };
  return (
    <div className=" max-w-7xl mx-auto">
      <div className="flex items-center  sm:justify-evenly  pr-6 flex-wrap">
        <div>
          <Label htmlFor="quotationNo" className="font-bold text-blue-600">
            Quotation No
          </Label>
          <div className="flex items-center justify-center">
            <TextInput
              type="text"
              name="quotationNo"
              id="quotationNo"
              value={quotationNo}
              onChange={(e) => setQuotationNo(e.target.value)}
            />
            <Checkbox
              type="checkbox"
              className=" ml-1"
              name="quotationNo"
              checked={selectedFilters.quotationNo}
              onChange={(e) =>
                setSelectedFilters({
                  ...selectedFilters,
                  quotationNo: e.target.checked,
                })
              }
            />
          </div>
        </div>
        <div className="">
          <Label htmlFor="createdBy" className="font-bold text-blue-600">
            Created By
          </Label>
          <div className="flex items-center justify-center">
            <Select
              name="createdBy"
              id="createdBy"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
            >
              <option></option>
              {initials.length > 0 &&
                initials.map((initial) => (
                  <option value={initial._id} key={initial._id}>
                    {initial.initials} {initial.username}
                  </option>
                ))}
            </Select>
            <Checkbox
              name="createdBy"
              checked={selectedFilters.createdBy}
              className=" ml-1"
              onChange={(e) =>
                setSelectedFilters({
                  ...selectedFilters,
                  createdBy: e.target.checked,
                })
              }
            />
          </div>
        </div>
        <div>
          <Label htmlFor="projectName" className=" font-bold text-blue-600">
            Project Name
          </Label>
          <div className="flex items-center justify-center">
            <TextInput
              type="text"
              value={projectName}
              name="projectName"
              id="projectName"
              onChange={(e) => setProjectName(e.target.value)}
            />
            <Checkbox
              type="checkbox"
              checked={selectedFilters.projectName}
              className=" ml-1"
              name="projectName"
              onChange={(e) =>
                setSelectedFilters({
                  ...selectedFilters,
                  projectName: e.target.checked,
                })
              }
            />
          </div>
        </div>
        <div>
          <Label htmlFor="projectName" className=" font-bold text-blue-600">
            Client Name
          </Label>
          <div className="flex items-center justify-center">
            <TextInput
              type="text"
              value={clientName}
              name="clientName"
              id="clientName"
              onChange={(e) => setClientName(e.target.value)}
            />
            <Checkbox
              type="checkbox"
              checked={selectedFilters.clientName}
              className=" ml-1"
              name="clientName"
              onChange={(e) =>
                setSelectedFilters({
                  ...selectedFilters,
                  clientName: e.target.checked,
                })
              }
            />
          </div>
        </div>
        <div>
          <Label htmlFor="" className="font-bold text-blue-600">
            Quotation Date/From
          </Label>
          <div className="flex items-center justify-center">
            <input
              type="date"
              value={fromDate}
              name="fromDate"
              id="fromDate"
              className="w-full px-3 py-2 border rounded-md"
              onChange={(e) => setFromDate(e.target.value)}
            ></input>
            <Checkbox
              type="checkbox"
              checked={selectedFilters.fromDate}
              className=" ml-1"
              name="fromDate"
              onChange={(e) =>
                setSelectedFilters({
                  ...selectedFilters,
                  fromDate: e.target.checked,
                })
              }
            />
          </div>
        </div>
        <div>
          <Label htmlFor="" className="font-bold text-blue-600">
            Quotation Date/To
          </Label>
          <div className="flex items-center justify-center">
            <input
              type="date"
              value={toDate}
              name="toDate"
              id="toDate"
              className="w-full px-3 py-2 border rounded-md"
              onChange={(e) => setToDate(e.target.value)}
            ></input>
            <Checkbox
              type="checkbox"
              checked={selectedFilters.toDate}
              className=" ml-1"
              name="toDate"
              onChange={(e) =>
                setSelectedFilters({
                  ...selectedFilters,
                  toDate: e.target.checked,
                })
              }
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-2">
        <Button gradientDuoTone="redToYellow" onClick={handleSearch}>
          {loading ? (
            <div className="flex items-center justify-center">
              <span className=" pr-3">Searching...</span>
              <Spinner size="sm" />
            </div>
          ) : (
            "Search"
          )}
        </Button>
      </div>
    </div>
  );
};

export default SearchQuote;
