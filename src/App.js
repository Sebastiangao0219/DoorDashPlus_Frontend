import React, {useState} from "react";
import {Layout, Typography} from "antd";
import LoginForm from "./components/LoginForm";
import FoodList from "./components/FoodList";
import MyCart from "./components/MyCart";

const {Header, Content} = Layout;
const {Title} = Typography;

function App() {
    const [authed, setAuthed] = useState(false);
    return (
        <Layout style={{height: '100vh'}}>
            <Header>
                <div className="header" style={{display: "flex", justifyContent: "space-between"}}>
                    <Title level={2}
                           style={{color: 'white', lineHeight: "inherit", marginBottom: 0}}>
                        Sebastian's Yummy Land~!
                    </Title>
                    {authed && (
                        <div>
                            <MyCart />
                        </div>
                    )}
                </div>
            </Header>
            <Content style={{
                padding: "50px",
                //  页面减去header的高度变成maxHeight的高度
                maxHeight: "calc(100% - 64px)",
                overflowY: "auto"
            }}>
                {   // 已登陆？
                    authed
                        ?
                        (<FoodList/>)
                        :
                        <LoginForm onSuccess={() => setAuthed(true)}/>
                }

            </Content>
        </Layout>
    );
}

export default App;
