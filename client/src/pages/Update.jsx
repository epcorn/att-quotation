import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleQuote, updateQuote } from "../redux/quote/quoteSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Loading } from "../components";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

// eslint-disable-next-line react/prop-types
function Update({ quoteId, onClose }) {
  const dispatch = useDispatch();
  const [quote, setQuote] = useState(null);
  const { loading } = useSelector((state) => state.quote);

  useEffect(() => {
    async function fetchQuote() {
      const actionResult = await dispatch(getSingleQuote(quoteId));
      const result = unwrapResult(actionResult);
      setQuote(result.result);
    }
    fetchQuote();
  }, [dispatch, quoteId]);

  if (loading) {
    return <Loading />;
  }

  if (!quote) {
    return <p className="text-center text-gray-500">No quote data available</p>;
  }
  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    const { id } = dataset; // Accessing data-id attribute

    if (name.startsWith("quoteInfo")) {
      const updatedQuoteInfo = quote.quoteInfo.map((info) => {
        if (info._id === id) {
          return {
            ...info,
            [name.split(".").pop()]: value,
          };
        }
        return info;
      });

      setQuote({
        ...quote,
        quoteInfo: updatedQuoteInfo,
      });
    } else {
      // Handle other fields not in quoteInfo array
      if (name.includes(".")) {
        const [parentKey, nestedKey] = name.split(".");
        setQuote({
          ...quote,
          [parentKey]: {
            ...quote[parentKey],
            [nestedKey]: value,
          },
        });
      } else {
        setQuote({
          ...quote,
          [name]: value,
        });
      }
    }
  };
  async function handleSubmit() {
    const data = { id: quoteId, quote };
    const actionResult = await dispatch(updateQuote(data));
    const result = unwrapResult(actionResult);
    console.log(result);
    onClose();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-8 gap-4 border mb-4 rounded-md">
        <div className=" p-4 col-span-4">
          <h2>Bill To Address</h2>
          <div className="max-w-full grid grid-cols-6">
            <div className="col-span-1">
              <div className="mb-2">
                <Label htmlFor="billToAddress.prefix" value="Prefix" />
              </div>
              <TextInput
                name="billToAddress.prefix"
                value={quote.billToAddress.prefix}
                onChange={handleChange}
              ></TextInput>
            </div>
            <div className=" col-span-5">
              <div className="mb-2">
                <Label htmlFor="billToAddress.name">
                  <span>Name</span>
                  <span className="text-red-500">*</span>
                </Label>
              </div>
              <TextInput
                type="text"
                name="billToAddress.name"
                value={quote.billToAddress?.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="max-w-full">
            <div className="mb-2 block">
              <Label htmlFor="a1">
                <span>A1</span>
                <span className="text-red-500">*</span>
              </Label>
            </div>
            <TextInput
              name="billToAddress.a1"
              value={quote.billToAddress?.a1}
              placeholder="Building/Office name"
              onChange={handleChange}
            />
          </div>
          <div className="max-w-full">
            <div className="mb-2 block">
              <Label htmlFor="a2">
                <span>A2</span>
                <span className="text-red-500">*</span>
              </Label>
            </div>
            <TextInput
              name="billToAddress.a2"
              value={quote.billToAddress?.a2}
              placeholder="Flat/Office No"
              onChange={handleChange}
            />
          </div>
          <div className="max-w-full">
            <div className="mb-2 block">
              <Label htmlFor="a3">
                <span>A3</span>
                <span className="text-red-500">*</span>
              </Label>
            </div>
            <TextInput
              name="billToAddress.a3"
              value={quote.billToAddress?.a3}
              placeholder="Road/Lanename"
              onChange={handleChange}
            />
          </div>
          <div className="max-w-full">
            <div className="mb-2 block">
              <Label htmlFor="a4">
                <span>A4</span>
                <span className="text-red-500">*</span>
              </Label>
            </div>
            <TextInput
              name="billToAddress.a4"
              value={quote.billToAddress?.a4}
              placeholder="Location"
              onChange={handleChange}
            />
          </div>
          <div className="max-w-full">
            <div className="mb-2 block">
              <Label htmlFor="a5">
                <span>A5</span>
                <span className="text-red-500">*</span>
              </Label>
            </div>
            <TextInput
              name="billToAddress.a5"
              value={quote.billToAddress?.a5}
              placeholder="NearBy: Landmark"
              onChange={handleChange}
            />
          </div>
          <div className="max-w-full">
            <div className="mb-2 block">
              <Label htmlFor="billToAddress.city">
                <span>City</span>
                <span className="text-red-500">*</span>
              </Label>
            </div>
            <TextInput
              name="billToAddress.city"
              value={quote.billToAddress?.city}
              onChange={handleChange}
            />
          </div>
          <div className="max-w-full">
            <div className="mb-2 block">
              <Label htmlFor="billToAddress.pincode">
                <span>Pincode: </span>
                <span className="text-red-500">*</span>
              </Label>
            </div>
            <TextInput
              name="billToAddress.pincode"
              value={quote.billToAddress?.pincode}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="p-4 col-span-4">
          <h3>Ship To Address</h3>
          <div className="max-w-full">
            <div className="mb-2 block">
              <Label htmlFor="shipToAddress.projectName">
                <span>Project Name</span>
                <span className="text-red-500">*</span>
              </Label>
            </div>
            <TextInput
              name="shipToAddress.projectName"
              value={quote.shipToAddress?.projectName}
              onChange={handleChange}
              type="text"
            />
          </div>

          <div className="max-w-full">
            <div className="mb-2 block">
              <Label htmlFor="shipToAddress.a1">
                <span>A1</span>
                <span className=" text-red-500">*</span>
              </Label>
            </div>
            <TextInput
              name="shipToAddress.a1"
              value={quote.shipToAddress?.a1}
              placeholder="Building/Office name"
              onChange={handleChange}
            />
          </div>
          <div className="max-w-full">
            <div className="mb-2 block">
              <Label htmlFor="shipToAddress.a2">
                <span>A2</span>
                <span className="text-red-500">*</span>
              </Label>
            </div>
            <TextInput
              name="shipToAddress.a2"
              value={quote.shipToAddress?.a2}
              placeholder="Flat/Office No"
              onChange={handleChange}
            />
          </div>
          <div className="max-w-full">
            <div className="mb-2 block">
              <Label htmlFor="shipToAddress.a3">
                <span>A3</span>
                <span className="text-red-500">*</span>
              </Label>
            </div>
            <TextInput
              name="shipToAddress.a3"
              value={quote.shipToAddress?.a3}
              placeholder="Road/Lanename"
              onChange={handleChange}
            />
          </div>
          <div className="max-w-full">
            <div className="mb-2 block">
              <Label htmlFor="shipToAddress.a4">
                <span>A4</span>
                <span className="text-red-500">*</span>
              </Label>
            </div>
            <TextInput
              name="shipToAddress.a4"
              value={quote.shipToAddress?.a4}
              placeholder="Location"
              onChange={handleChange}
            />
          </div>
          <div className="max-w-full">
            <div className="mb-2 block">
              <Label htmlFor="shipToAddress.a5">
                <span>A5</span>
                <span className="text-red-500">*</span>
              </Label>
            </div>
            <TextInput
              name="shipToAddress.a5"
              value={quote.shipToAddress?.a5}
              placeholder="NearBy: Landmark"
              onChange={handleChange}
            />
          </div>
          <div className="max-w-full">
            <div className="mb-2 block">
              <span>City</span>
              <span className="text-red-500">*</span>
            </div>
            <TextInput
              name="shipToAddress.city"
              value={quote.shipToAddress?.city}
              onChange={handleChange}
            />
          </div>
          <div className="max-w-full">
            <div className="mb-2 block">
              <Label htmlFor="shipToAddress.pincode">
                <span>Pincode: </span>
                <span className="text-red-500">*</span>
              </Label>
            </div>
            <TextInput
              name="shipToAddress.pincode"
              value={quote.shipToAddress?.pincode}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      {quote.quoteInfo?.length >= 1
        ? quote.quoteInfo.map((type) => (
            <div
              key={type._id}
              className="grid grid-cols-12 gap-4 mb-4  border border-blue-600 "
            >
              <div className="col-span-3 border p-1">
                <Label>Work Area Type: </Label>
                <TextInput
                  name="quoteInfo.workAreaType"
                  value={type.workAreaType}
                  onChange={handleChange}
                ></TextInput>
              </div>
              <div className="col-span-3 border grid grid-cols-4 gap-1 p-1">
                <div className="col-span-2">
                  <Label>Work Area: </Label>
                  <TextInput
                    name="quoteInfo.workArea"
                    value={type.workArea}
                    onChange={handleChange}
                    data-id={type._id}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Work Area Unit: </Label>
                  <Select
                    name="quoteInfo.workAreaUnit"
                    value={type.workAreaUnit}
                    onChange={handleChange}
                    data-id={type._id}
                  >
                    <option></option>
                    <option value="Sq.fts">Sq.fts</option>
                    <option value="Sq.mts">Sq.mts</option>
                    <option value="Rn.fts">Rn.fts</option>
                  </Select>
                </div>
              </div>
              {type.serviceRate ? (
                <div className="col-span-3 border grid grid-cols-2 gap-1 p-1">
                  <div className="col-span-1">
                    <Label>Service Charges: </Label>
                    <TextInput
                      name="quoteInfo.serviceRate"
                      value={type.serviceRate}
                      onChange={handleChange}
                      data-id={type._id}
                    />
                  </div>
                  <div className="col-span-1">
                    <Label>Unit: </Label>
                    <Select
                      name="quoteInfo.serviceRateUnit"
                      value={type.serviceRateUnit}
                      onChange={handleChange}
                      data-id={type._id}
                    >
                      <option></option>
                      <option value="Per Sq.ft">Per Sq.ft</option>
                      <option value="Per Sq.mt">Per Sq.mt</option>
                      <option value="Per Rn.ft">Per Rn.ft</option>
                    </Select>
                  </div>
                </div>
              ) : (
                <div className="col-span-3 border grid grid-cols-2 gap-1 p-1">
                  <div className="col-span-1">
                    <Label>Chemical Rate: </Label>
                    <TextInput
                      name="quoteInfo.chemicalRate"
                      value={type.chemicalRate}
                      onChange={handleChange}
                      data-id={type._id}
                    />
                  </div>
                  <div className="col-span-1">
                    <Label>Unit: </Label>
                    <Select
                      name="quoteInfo.chemicalRateUnit"
                      value={type.chemicalRateUnit}
                      onChange={handleChange}
                      data-id={type._id}
                    >
                      <option></option>
                      <option value="Per Ltr.">Per Ltr.</option>
                    </Select>
                  </div>
                </div>
              )}
              <div className="col-span-3 border grid grid-cols-8 p-1">
                <div className="col-span-6">
                  <Label>Chemical: </Label>
                  <Select
                    name="quoteInfo.chemical"
                    value={type.chemical}
                    onChange={handleChange}
                    data-id={type._id}
                  >
                    <option></option>
                    <option>Imidachloprid 30.5% SC</option>
                    <option>Chloropyriphos 20% EC</option>
                    <option>
                      Imidachloprid 30.5% SC (&quot;PREMISE&quot; - By Bayer
                      India/ENVU)
                    </option>
                  </Select>
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  <Button
                    gradientDuoTone="purpleToPink"
                    className="rounded-full"
                  >
                    <IoCheckmarkDoneCircleOutline size="20px" />
                  </Button>
                </div>
              </div>
              {type.chemicalQuantity && (
                <div className="col-span-3 border p-1">
                  <Label>Chemical Quantity: </Label>
                  <TextInput
                    name="quoteInfo.chemicalQuantity"
                    value={type.chemicalQuantity}
                    onChange={handleChange}
                    data-id={type._id}
                  ></TextInput>
                </div>
              )}
              {type.applyRate && (
                <div className="col-span-3 border grid grid-cols-4 gap-1 p-1">
                  <div className="col-span-2">
                    <Label>Apply Rate: </Label>
                    <TextInput
                      name="quoteInfo.applyRate"
                      value={type.applyRate}
                      type="text"
                      onChange={handleChange}
                      data-id={type._id}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Unit: </Label>
                    <Select
                      name="quoteInfo.quoteInfo.applyRateUnit"
                      value={type.applyRateUnit}
                      onChange={handleChange}
                      data-id={type._id}
                    >
                      <option></option>
                      <option value="Per Sq.ft">Per Sq.ft</option>
                      <option value="Per Sq.mt">Per Sq.mt</option>
                      <option value="Per Rn.ft">Per Rn.ft</option>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          ))
        : null}

      <div>
        <Button onClick={handleSubmit} gradientDuoTone="redToYellow">
          Update
        </Button>
      </div>
    </div>
  );
}

export default Update;
