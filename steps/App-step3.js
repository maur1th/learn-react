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

  render() {
    return (
      <div>
        <SearchBar {...this.state} />
        <ProductTable {...this.state} products={this.props.products} />
      </div>
    )
  },
})


const SearchBar = React.createClass({
  render() {
    return (
      <form>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Search..." />
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" /> Only show products in stock
          </label>
        </div>
      </form>
    )
  },
})


const ProductTable = React.createClass({
  render() {

    const rows = []
    let lastCategory = null
    for ( const [index, product] of this.props.products.entries() ) {
      if ( !product.name.includes(this.props.filterText) || (!product.stocked && this.props.inStockOnly) ) {
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
  },
})


const ProductCategoryRow = React.createClass({
  render() {
    return (
      <tr className="info">
        <td colSpan="2" style={{fontWeight: "bold"}}>{this.props.category}</td>
      </tr>
    )
  },
})


const ProductRow = React.createClass({
  render() {
    const style = this.props.product.stocked ? {} : {color: "red"}
    return (
      <tr>
        <td style={style}>{this.props.product.name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    )
  },
})


export default App
