import React from 'react'
type Country = string
type Item = string

type Warehouse = {
  continent: string
  name: string
  items: Item[]
}

type Shipment = {
  fromWarehouse: Warehouse
  items: Item[]
}

type CustomerOrder = {
  id: string
  destination: Country
  items: Item[]
  shipments: Shipment[]
  note: string
}

const warehouses: Warehouse[] = [
  {
    name: 'HK',
    continent: 'Asia',
    items: ['🍎', '🍎', '🍐'],
  },
  {
    name: 'JP',
    continent: 'Asia',
    items: ['🍇'],
  },
  {
    name: 'US',
    continent: 'North America',
    items: ['🍇', '🍎', '🍐'],
  },
]
// TODO: Add more test order to test your algo
const testOrders = [
  {
    id: '1',
    destination: 'HK',
    items: ['🍎', '🍎'],
    shipments: [],
    note: 'Expect 1 shipment from HK, because all requested items are available in HK.',
  },
  {
    id: '2',
    destination: 'CN',
    items: ['🍇'],
    shipments: [],
    note: 'Expect 1 shipment from JP, because it is the closest warehouse compare to US. (In the same continent.)',
  },
  {
    id: '3',
    destination: 'HK',
    items: ['🍇', '🍎'],
    shipments: [],
    note: '...', // TODO: Write your test order and explain the expected result.
  },
  // TODO: Create more test orders if needed
  {
    id: '4',
    destination: 'HK',
    items: ['🍎', '🍎', '🍇'],
    shipments: [],
    note: 'Expect 1 shipment from HK, 1 from JP, because all requested items are available in HK.',
  },
]

const locations = [
  {
    name: 'HK',
    closeRank: ['HK', 'JP', 'US'],
  },
  {
    name: 'CN',
    closeRank: ['JP', 'HK', 'US'],
  },
  {
    name: 'US',
    closeRank: ['US', 'JP', 'HK'],
  },
]

const preferedHouse = (destination: Country, item: Item): Warehouse => {
  console.log(destination, item)
  const l = locations.find((x) => x.name === destination)
  let warehouse = warehouses[0]
  if (l) {
    for (let i = 0; i < l.closeRank.length; i++) {
      const location = l.closeRank[i]
      const w = warehouses.find((x) => location === x.name)
      if (w && w.items.includes(item)) {
        warehouse = w
        break
      }
    }
  }
  return warehouse
}

const yourAlgo = function (order: CustomerOrder): Shipment[] {
  // TODO: Assign a type, create a new type if needed
  const shipments: Shipment[] = []

  // Move item from warehouse to shipment
  order.items.forEach((item) => {
    // TODO: Select the *best* warehouse
    const warehouse = preferedHouse(order.destination, item)
    const i = warehouse.items.indexOf(item)

    if (i !== -1) {
      const pickFromWarehouse = warehouse.items.splice(i, 1)[0]
      console.log(pickFromWarehouse)

      // TODO: One item per shipment is silly, fix me.
      const index = shipments.findIndex((x) => x.fromWarehouse === warehouse)
      if (index !== -1) {
        shipments[index].items.push(pickFromWarehouse)
      } else {
        shipments.push({
          fromWarehouse: warehouse,
          items: [pickFromWarehouse],
        })
      }
    }
  })

  // Return an array of shipment object
  return shipments
}

function Ship() {
  const [warehouseList, setWarehouseList] =
    React.useState<Warehouse[]>(warehouses)
  const [shipments, setShipments] = React.useState<Shipment[]>([])
  const [calculatedOrder, setCalculatedOrder] = React.useState<string>('')

  const onClickRun = (order: CustomerOrder) => {
    setCalculatedOrder(order.id)
    const ships = yourAlgo(order)
    setShipments(ships)
  }

  return (
    <div>
      <div id="the-app" className="columns is-mobile block">
        <div className="column">
          <h2 className="title is-4">Warehouses</h2>
          {warehouseList.map((warehouse: Warehouse) => (
            <div key={warehouse.name} className="card block">
              <header className="card-header">
                <div className="card-header-title">
                  Warehouse {warehouse.name}
                </div>
              </header>
              <div className="card-content">
                Continent: {warehouse.continent}
                <br />
                Inventory: {warehouse.items}
              </div>
            </div>
          ))}
        </div>
        <div className="column">
          <h2 className="title is-4">Orders</h2>

          {testOrders.map((order) => (
            <div key={order.id} className="card block">
              <div className="card-content">
                <strong>Customer Order {order.id}</strong>
                <br />
                Destination: {order.destination}
                <br />
                Items: {order.items}
                <br />
                Note: {order.note}
                {calculatedOrder === order.id && (
                  <table className="table is-bordered is-fullwidth is-narrow">
                    <thead>
                      <tr>
                        <th>Shipments</th>
                      </tr>
                      <tr>
                        <th>#</th>
                        <th>From</th>
                        <th>Items</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shipments.map((shipment: Shipment) => (
                        <tr>
                          <td>{1}</td>
                          <td>{shipment.fromWarehouse.name}</td>
                          <td>
                            {shipment.items.length > 0
                              ? shipment.items.join('')
                              : 'Something went wrong!'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="card-footer">
                <a
                  onClick={() => onClickRun(order)}
                  className="card-footer-item"
                >
                  Run Program
                </a>
              </div>
            </div>
          ))}
          <p>Add more test orders to show case your work.</p>
        </div>
      </div>
    </div>
  )
}

export default Ship
