import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import "./bootstrap";
import NotFound from "./components/notFound/notFound";
import Index from "./components/Index";
import Home from "./components/Home";
import AddCustomer from "./components/AddCustomer";

import AddCustomerType from "./components/AddCustomerType";

import AddTruck from "./components/AddTruck";
import AddPersonnel from "./components/AddPersonnel";
import AddDriver from "./components/AddDriver";
// import AddGoodsAndServices from "./components/AddGoodsAndServices";
import AddCurrentCosts from "./components/AddCurrentCosts";
import NavigateCustmoerContract from './components/customerContract/NavigateCustomerContract';
import CustomerContract from "./components/customerContract/CustmoerContract";
import AddPersonnelContract from "./components/customerContract/AddPersonnelContract";
import AddBuyerContract from "./components/customerContract/AddBuyerContract";
import AddSellerContract from "./components/customerContract/AddSellerContract";
import AddPumpOperator from "./components/AddPumpOperator";
import AddConcrete from "./components/AddConcrete";

// import ReactDOM from "react-dom/client";
// import Index from "./components/Index";

function App() {
    // const userData = useUserContext();

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Index />} errorElement={<NotFound />}>
                <Route index element={<Home />} />

                <Route path="addCustomer/:customerId?" element={<AddCustomer />} />

                <Route path="addCustomerType/" element={<AddCustomerType />} />

                <Route path="addTruck" element={<AddTruck />} />
                <Route path="addPersonnel" element={<AddPersonnel />} />
                <Route path="addDriver" element={<AddDriver />} />

                <Route path="addConcrete" element={<AddConcrete />} />
                
                <Route path="addCurrentCosts" element={<AddCurrentCosts />} />
                <Route path="addPumpOperator" element={<AddPumpOperator />} />

                <Route path="customerContract" element={<CustomerContract />} >
                    <Route index element={<NavigateCustmoerContract />} />
                    <Route path="addPersonnelContract" element={<AddPersonnelContract />} />
                    <Route path="addBuyerContract" element={<AddBuyerContract />} />
                    <Route path="addSellerContract" element={<AddSellerContract />} />

                </Route>
            </Route>
            // <Route path="/" element={<Root />} errorElement={<NotFound />}>
            //   <Route index element={<Home />} />

            //   <Route path="aboutUs" element={<AboutUs />} />

            //   <Route path="contactUs" element={<ContactUs />} />

            //   <Route
            //     element={
            //       <UserGuardRoute
            //         backPath="profile"
            //         isEffect={userData.isEffect}
            //         isLogin={userData.user.login}
            //         requiresLogin={false}
            //       />
            //     }
            //   >
            //     <Route path="signIn" exact element={<SignIn />} />
            //     <Route path="signUp" exact element={<SignUp />} />
            //   </Route>

            //   {/* گارد روت، بعضی از روتها در صورتی که کار خاصی انجام گرفته باشد را در دست قرار می دهد،
            //    * مانند دسترسی به پروفایل فقط در صورت لاگین بودن
            //    */}
            //   <Route
            //     element={
            //       <UserGuardRoute
            //         backPath="signIn"
            //         isEffect={userData.isEffect}
            //         isLogin={userData.user.login}
            //       />
            //     }
            //   >
            //     <Route path="dashboard" element={<Dashboard />}>
            //       <Route path="orderInProcess" element={<OrderInProcess />} />
            //       <Route path="purchasesReceived" element={<PurchasesReceived />} />
            //       <Route path="returnPurchases" element={<ReturnPurchases />} />
            //       <Route path="myComments" element={<MyComments />} />
            //       <Route path="shopMessages" element={<ShopMessages />} />
            //       <Route path="shopWarnings" element={<ShopWarnings />} />
            //       <Route path="usersMessages" element={<UsersMessages />} />
            //       <Route path="myVisits" element={<MyVisits />} />
            //       <Route path="myFavorites" element={<MyFavorites />} />
            //       <Route path="MyScores" element={<MyScores />} />
            //       {/* <Route path="" element={< />} /> */}
            //       {/* <Route path="" element={< />} /> */}
            //     </Route>
            //   </Route>

            //   {/* روت زیر بصورت موقت ساخته شده است */}
            //   <Route
            //     path="addProduct"
            //     element={<AddProduct />}
            //     action={addProductAction}
            //   />

            //   {/* روت زیر بصورت موقت ساخته شده است */}
            //   <Route
            //     path="showProductsM"
            //     element={<ShowProductsM />}
            //     loader={showProductsMLoader}
            //   />

            //   {/* روت زیر بصورت موقت ساخته شده است */}
            //   <Route
            //     path="editProductM/:productId"
            //     element={<EditProductM />}
            //     loader={productMLoader}
            //     action={editProductMAction}
            //   />

            //   {/* روت زیر بصورت موقت ساخته شده است */}
            //   <Route path="destroyProductM/:productId" action={destroyProductM} />

            //   {/* روت زیر بصورت موقت ساخته شده است */}
            //   <Route
            //     path="addProSliderM"
            //     element={<AddProSliderM />}
            //     loader={showProductsMSliderLoader}
            //     action={addProSliderMAction}
            //   />
            // </Route>
        )
    );

    return <RouterProvider router={router} />;
}

export default App;
