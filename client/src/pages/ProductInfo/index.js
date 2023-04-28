import React from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import { GetProductById } from "../../apicalls/products";
import { Divider, message } from "antd";
import { useParams } from "react-router-dom";
import moment from "moment";

function ProductInfo() {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [product, setProduct] = React.useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProductById(id);
      dispatch(setLoader(false));
      if (response.success) {
        setProduct(response.data);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    product && (
      <div>
        <div className="grid grid-cols-2 gap-5">
            {/*images*/}
            <div className="flex flex-col gap-5">
            <img
            src={product.images[selectedImageIndex]}
            alt=""
            className="w-full h-96 object-cover rounded-md"
          />
              <div className="flex gap-5">
                {product.images.map((image, index) => {
                    return(
                        <img 
                        className={
                            "w-20 h-20 object-cover rounded-md cursor-pointer" + 
                        (selectedImageIndex===index
                            ?"border-2 border-green-700 border-dashed p-2":
                            ""
                            )}
                            onClick={() => setSelectedImageIndex(index)}
                        alt=""
                        src={image }
                        />
                    )
                })}
          </div>
          <div>
            <h1>Added On</h1>
          </div>
          <span>
            {moment(product.createdAt).format("MM D YYYY hh:mm A")}
          </span>

                </div>    
            {/*detail*/}
            <div className="flex flex-col gap-3">
                <div>
                    <h1 className="text-2xl font-semi-bold text-orange-900">
                        {product.name}
                    </h1>
                    <span>{product.description}</span>
                </div>
                <Divider />
                <div className="flex flex-col">
                <h1 className="text-2xl font-semi-bold text-orange-900">
                        Product Details
                    </h1>
                    <div className="flex justify-between mt-2">
                        <span>Price</span>
                        <span>$ {product.price}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span>Delivery</span>
                        <span>{product.billAvailable? "Yes":"No"}</span>
                    </div>
                </div>
                <Divider />
                <div className="flex flex-col">
                <h1 className="text-2xl font-semi-bold text-orange-900">
                        Seller Details
                    </h1>
                    <div className="flex justify-between mt-2">
                        <span>Name</span>
                        <span>{product.seller.name}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span>Delivery</span>
                        <span>{product.seller.email}</span>
                    </div>
                </div>
            </div>
            </div>
      </div>
    )
  );
}

export default ProductInfo;
