import css from "./styles.module.css";
import { useLazyGetOrdersByUserQuery } from "../../redux/ordersAPI";
//Components
import { Container } from "../../components/container/Container";
import { SearchForm } from "../../components/searchForm/SearchForm";
import { useState } from "react";
import { OrdersList } from "../../components/ordersList/OrdersList";

export const History = () => {
  const [getOrders, { data }] = useLazyGetOrdersByUserQuery();
  const initialValue = { email: "", phone: "" };
  const [searchData, setSearchData] = useState(initialValue);
  const [isFormValid, setIsFormValid] = useState(true);

  const hadleSearchOrders = () => {
    if (searchData.email.trim() !== "" && searchData.phone.trim() !== "") {
      setIsFormValid(true);
      getOrders(searchData);
      setSearchData(initialValue);
    } else {
      setIsFormValid(false);
    }
  };

  return (
    <Container>
      <div className={css.pageContent}>
        <div className={css.inputWrap}>
          <SearchForm
            setSearchData={setSearchData}
            searchData={searchData}
            onSearch={hadleSearchOrders}
            isFormValid={isFormValid}
          />
        </div>
        <div className={css.historyWrap}>
          {data && <OrdersList orders={data} />}
        </div>
      </div>
    </Container>
  );
};
