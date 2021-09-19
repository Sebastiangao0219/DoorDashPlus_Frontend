import {Button, Card, List, message, Select, Tooltip} from "antd";
import {useEffect, useState} from "react";
import {addItemToCart, getMenus, getRestaurants} from "../utils";
import {PlusOutlined} from "@ant-design/icons";

const {Option} = Select;

const AddToCartButton = ({itemId}) => {
    const [loading, setLoading] = useState(false);

    const AddToCart = () => {
        // add selected menu to the cart
        // step1: set loading to true
        // step2: add menu to cart and inform the server
        setLoading(true);
        addItemToCart(itemId)
            .then(() => message.success(`Successfully add item`))
            .catch((err) => message.error(err.message))
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Tooltip title="Add to shopping cart">
            <Button
                loading={loading}
                type="primary"
                icon={<PlusOutlined/>}
                onClick={AddToCart}
            />
        </Tooltip>
    );
};

const FoodList = () => {
    const [foodData, setFoodData] = useState([]);
    const [curRest, setCurRest] = useState();
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingRest, setLoadingRest] = useState(false);

    useEffect(() => {
        // step1: set loading restaurant = true
        // step2: fetch restaurant list from the server
        setLoadingRest(true);
        getRestaurants()
            .then((data) => {
                setRestaurants(data);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setLoadingRest(false);
            });
    }, []);

    useEffect(() => {
        if (curRest) {
            setLoading(true);
            getMenus(curRest)
                .then((data) => {
                    setFoodData(data);
                })
                .catch((err) => {
                    message.error(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [curRest]);

    return (
        <>
            <Select
                value={curRest}
                onSelect={(value) => setCurRest(value)}
                placeholder="Select a restaurant"
                loading={loadingRest}
                style={{width: 300}}
                onChange={() => {
                }}
            >
                {restaurants.map((item) => {
                    return <Option value={item.id} key={item.id}>{item.name}</Option>;
                })}
            </Select>
            {curRest && (
                <List
                    style={{marginTop: 20}}
                    loading={loading}
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 3,
                        xxl: 3,
                    }}
                    dataSource={foodData}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                title={item.name}
                                extra={<AddToCartButton itemId={item.id}/>}
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    style={{height: 'auto', width: "100%", display: "block"}}
                                />
                                {`Price: ${item.price}`}
                            </Card>
                        </List.Item>
                    )}
                />
            )}
        </>
    );
};

export default FoodList;