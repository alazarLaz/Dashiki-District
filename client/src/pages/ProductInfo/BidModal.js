import { Form, Input, Modal, message } from "antd";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import { PlaceNewBid } from "../../apicalls/products";

function BidModal({ showBidModal, setShowBidModal, product, reloadData }) {
  const { user } = useSelector((state) => state.users);
  const formRef = useRef(null);
  const rules = [{ required: true, message: "Required" }];
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await PlaceNewBid({
        ...values,
        product: product._id,
        seller: product.seller._id,
        buyer: user._id,
      });
      dispatch(setLoader(false));
      if (response.success) {
        message.success("Bid added successfully");
        reloadData();
        setShowBidModal(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  return (
    <Modal
      onCancel={() => {
        setShowBidModal(false);
      }}
      open={showBidModal}
      width={800}
      onOk={() => formRef.current.submit()}
      centered>
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-2xl font-semibold text-orange-900 text-center">
          Place a Bid
        </h1>
        <Form 
        layout="vertical" 
        ref={formRef}
        onFinish={onFinish}
        >
          <Form.Item label="Bid Amount" name="bidAmount" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label="Message" name="message" rules={rules}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Mobile" name="mobile" rules={rules}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default BidModal;
