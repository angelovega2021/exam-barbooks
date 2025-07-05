import SummaryPanel from './SummaryPanel'
import NewOrderForm from './NewOrder'
import Orders from './Orders'
import { useSummaryOrders } from './hooks/useSummaryOrders'


function App() {
  const { data = {
    totalRevenue: 0,
    medianOrderPrice: 0,
    topProductByQty: '',
    uniqueProductCount: 0
  }, isLoading, isError, error } = useSummaryOrders();
    

  return (
    <>
      <SummaryPanel  {...{data, isLoading, isError, error}}/>
      <NewOrderForm />
      <Orders />
    </>
  )
}

export default App
