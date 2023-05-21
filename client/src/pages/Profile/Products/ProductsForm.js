import { Col, Form, Input, Modal, Row, Tabs, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../redux/loaderSlice";
import { AddProduct, EditProduct } from "../../../apicalls/products";
import { GetCurrentUser } from "../../../apicalls/users";
import Images from "./images";

const additionalThings = [
  {
    label: "Delivery",
    name: "delivery",
  },
];

const rules = [
  {
    required: true,
    message: "Required",
  },
];

function ProductsForm({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  getData,
}) {
    const [ selectedTab = "1", setSelectedTab ] = React.useState("1")
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onFinish = async (value) => {
    try {
      let response = null;
      dispatch(setLoader(true));
      if (selectedProduct) {
        response = await EditProduct(selectedProduct._id, value);
      } else {
        value.seller = user._id;
        value.status = "pending";
        response = await AddProduct(value);
      }
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
        setShowProductForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  const formRef = React.useRef(null);

  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);
  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      okText="Save"
      okButtonProps={{ color: "#000000" }}
      onOk={() => {
        formRef.current.submit();
      }}
      {...(selectedTab==="2" && {footer: false})}
      width={1000}>
      <div>
        <h1 className="text-primary text-2xl text-center font-semibold uppercase">
          {selectedProduct ? "Edit Products" : "Add products"}
        </h1>
        <Tabs 
        defaultActiveKey="1"
        activeKey={selectedTab}
        onChange={key=>setSelectedTab(key)}
        >
          <Tabs.TabPane tab="General" key="1">
            <Form
              layout="vertical"
              ref={formRef}
              onFinish={(val) => {
                onFinish(val);
              }}>
              <Form.Item label="Name" rules={rules} name="name">
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Description" rules={rules} name="description">
                <TextArea type="number" />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Price" name="price" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Catagory" name="category" rules={rules}>
                    <select>
                      <option value="select">Select</option>
                      <option value="shoe">Shoe</option>
                      <option value="shirt">Shirt</option>
                      <option value="full">Full</option>
                      <option value="trouser">Trouser</option>
                    </select>
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex gap-10">
                {additionalThings.map((item) => {
                  return (
                    <Form.Item
                      label={item.label}
                      name={item.name}
                      valuePropName="checked">
                      <Input
                        type="checkbox"
                        value={item.name}
                        onChange={(e) => {
                          formRef.current.setFieldsValue({
                            [item.name]: e.target.checked,
                          });
                        }}
                        checked={formRef.current?.getFieldValue(item.name)}
                      />
                    </Form.Item>
                  );
                })}
              </div>
              <Form.Item
                      label="Show Bids on Product Page"
                      name="showBidsOnProductPage"
                      valuePropName="checked">
                      <Input
                        type="checkbox"
                        onChange={(e) => {
                          formRef.current.setFieldsValue({
                            showBidsOnProductPage: e.target.checked,
                          });
                        }}
                        checked={formRef.current?.getFieldValue('showBidsOnProductPage')}
                        style={{width: 50, marginLeft: 5}}
                      />
                    </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane disabled = {!selectedProduct} tab="Image" key="2">
            <Images 
            selectedProduct={selectedProduct} 
            setShowProductForm={setShowProductForm}
            getData={getData}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}

export default ProductsForm;
