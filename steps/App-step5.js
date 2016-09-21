import React from 'react'


const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
]


const App = React.createClass({
  render() {
    return (
      <div className="row" style={{padding: "20px"}}>
        <div className="col-xs-6">
          <FilterableProductTable products={PRODUCTS} />
        </div>
      </div>
    )
  },
})


const FilterableProductTable = React.createClass({
  getInitialState() {
    return {filterText: '', inStockOnly: false}
  },

  handleUserInput(filterText, inStockOnly) {
    this.setState({ filterText, inStockOnly })
  },

  render() {
    return (
      <div>
        <SearchBar {...this.state} onUserInput={this.handleUserInput} />
        <ProductTable {...this.state} products={this.props.products} />
      </div>
    )
  }
})


const SearchBar = React.createClass({
  handleChange() {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked
    )
  },

  render() {
    return (
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            ref="filterTextInput"
            onChange={this.handleChange}
          />
        </div>
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              ref="inStockOnlyInput"
              onChange={this.handleChange}
            />
            Only show products in stock
          </label>
        </div>
      </form>
    )
  },
})


const ProductTable = props => {

  const rows = []
  let lastCategory = null
  for ( const [index, product] of props.products.entries() ) {
    if ( !product.name.includes(props.filterText) || (!product.stocked && props.inStockOnly) ) {
      continue
    }
    if ( product.category !== lastCategory ) {
      rows.push(<ProductCategoryRow category={product.category} key={product.category + index} />)
    }
    rows.push(<ProductRow product={product} key={product.name} />)
    lastCategory = product.category
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}


const ProductCategoryRow = props => (
  <tr className="info">
    <td colSpan="2" style={{fontWeight: "bold"}}>{props.category}</td>
  </tr>
)


const ProductRow = props => (
  <tr>
    <td style={props.product.stocked ? {} : {color: "red"}}>
      {props.product.name}
    </td>
    <td>{props.product.price}</td>
  </tr>
)


export default App
