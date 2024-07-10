"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"





export default function Home() {
  const [product, setProduct]= useState({name:"",issuance:"", serialnumber:"", usage:"", reason:""})
  const [allProducts, setAllProducts] =  useState([]);
  const [error, setError] = useState({nameError:"",issuanceError:"", serialnumberError:"", usageError:"", reasonError:""})

  const checkValidation = () => {
    if(!product.name) {
      setError((prev) => ({...prev, nameError: "name is required"}))
      return false;
    }
    if(!product.issuance) {
      setError((prev) => ({...prev, issuanceError: "issuance is required"}))
      return false;

    }
    if(!product.serialnumber) {
      setError((prev) => ({...prev, serialnumberError: "serialnumber is required"}))
      return false;

    }
    if(!product.usage) {
      setError((prev) => ({...prev, usageError: "usage is required"}))
      return false;

    }
    if(!product.reason) {
      setError((prev) => ({...prev, reasonError: "reason is required"}))
      return false;

    }
    return true;
  }

  const handleProductChange = (e) => {
    setProduct((prev) => ({...prev, [e.target.name]: e.target.value}));
    console.log("product:", product)
    setError({nameError:"",issuanceError:"", serialnumberError:"", usageError:"", reasonError:""})
  }

   const handleProductSelectChange = (value) => {
    setProduct((prev) => ({...prev, name: value}));
    setError((prev) => ({...prev, nameError: ""}));
  }


  const handleAddProduct = (e) => {
    e.preventDefault();
    console.log("adding")

    if(checkValidation()) {
      setAllProducts((prevProducts) => [...allProducts, product]);
      setProduct({name:"",issuance:"", serialnumber:"", usage:"", reason:""})
    }
  }

  useEffect(() => {
    console.log("allProducts", allProducts);
  },[allProducts,product]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Dialog >
        <DialogTrigger className="border-[1px] border-gray-500 rounded-xl p-2">Manage Inventory</DialogTrigger>
        <DialogContent className="bg-white overflow-y-auto max-h-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl lg:text-3xl">Check In/Check Out</DialogTitle>

            <form onSubmit={handleAddProduct} className="w-full flex flex-col gap-2">

            <div className="flex gap-2 justify-between items-center">

                <Select className="w-[40%] rounded-xl" onValueChange={handleProductSelectChange}>
                  <SelectTrigger className="w-[180px] rounded-xl">
                    <SelectValue placeholder="product" className="text-[12px] lg:text-normal" />
                  </SelectTrigger>
                  <SelectContent name="name" value={product.name} className="bg-white text-[12px] lg:text-normal" >
                    <SelectItem value="product1">Product 1</SelectItem>
                    <SelectItem value="product2">Product 2</SelectItem>
                    <SelectItem value="product3">Product 3</SelectItem>
                  </SelectContent>
                </Select>

                <Input placeholder="issuance" name="issuance" value={product.issuance} className="w-[40%] rounded-xl text-[12px] lg:text-sm text-gray-500" onChange={(e) => handleProductChange(e)}/>

                <Input placeholder="sr." type="number" name="serialnumber" value={product.serialnumber} className="w-[20%] rounded-xl text-[12px] lg:text-sm text-gray-500" onChange={(e) => handleProductChange(e)}/>
            </div>
                {error.nameError && <p className="text-red-500">{error.nameError}</p>}
                {error.serialnumberError && <p className="text-red-500">{error.serialnumberError}</p>}
                {error.issuanceError && <p className="text-red-500">{error.issuanceError}</p>}



            <div className="w-full flex flex-col gap-1">
              <Textarea placeholder="Type the usage of product" name="usage" value={product.usage}  className="rounded-xl text-[12px] lg:text-sm text-gray-500" onChange={(e) => handleProductChange(e)}/>
              {error.usageError && <p className="text-red-500">{error.usageError}</p>}
            </div>

            <div className="w-full flex flex-col gap-1">
              <Textarea placeholder="Type the reason for the request" name="reason" value={product.reason} className="rounded-xl text-[12px] lg:text-sm text-gray-500" onChange={(e) => handleProductChange(e)}/>
              {error.reasonError && <p className="text-red-500">{error.reasonError}</p>}
            </div>


            <div className="w-full flex gap-2">
              <Button variant="primary" className="bg-blue-500 w-1/2 text-white rounded-xl hover:text-blue-400" type="submit">Submit</Button>
              <Button variant="destructive" className="bg-red-500 w-1/2 text-white rounded-xl hover:text-red-400">Cancel</Button>
            </div>
            </form>
            {allProducts && allProducts?.map((p) => (
              <div className="w-full flex flex-col gap-2 justify-between items-center border-[1px] border-gray-500 rounded-xl p-2">

                <div className="w-full gap-2 flex justify-between items-center">
                  <div className="productname flex flex-col w-[40%]">
                    <label className="text-start font-bold text-[8px]  lg:text-sm">Product name</label>
                    <p className="text-start text-gray-500 text-[12px] lg:text-xl">{p.name}</p>
                  </div>
                  <div className="productissuance flex flex-col w-[40%]">
                    <label className="text-start font-bold text-[8px]  lg:text-sm">Product issuance</label>
                    <p className="text-start text-gray-500 text-[12px] lg:text-xl">{p.issuance}</p>
                  </div>
                  <div className="productserialnumber flex flex-col  w-[20%]">
                    <label className="text-start font-bold text-[8px]  lg:text-sm">Sr. No.</label>
                    <p className="text-start text-gray-500 text-[12px] lg:text-xl">{p.serialnumber}</p>
                  </div>
                </div>

                <div className="productuasge flex flex-col  w-full">
                  <label className="text-start font-bold text-[8px]  lg:text-sm">Usage</label>
                  <p className="text-start text-gray-500 text-[12px] lg:text-xl">{p.usage}</p>
                </div>

                <div className="productreason flex flex-col w-full">
                  <label className="text-start font-bold text-[8px]  lg:text-sm">Reason</label>
                  <p className="text-start text-gray-500 text-[12px] lg:text-xl">{p.reason}</p>
                </div>

              </div>
            ))}

            
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>

  );
}
