import React, { Component } from "react";
import axios from "axios";
import { currencies } from "./codes";
import M from "materialize-css";

export default class AddCurrency extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: "",
      rateToEuro: "",
    };
    this.onChangeCurrency = this.onChangeCurrency.bind(this);
    this.onChangeRateToEuro = this.onChangeRateToEuro.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChangeCurrency(e) {
    this.setState({
      currency: e.target.value,
    });
  }

  onChangeRateToEuro(e) {
    this.setState({
      rateToEuro: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();

    let currencySplited = this.state.currency.split(",");
    const newCurrency = {
      currencyCode: currencySplited[0],
      currencyName: currencySplited[1],
      rateToEuro: this.state.rateToEuro,
    };
    axios
      .post("http://localhost:5000/currency", newCurrency)
      .then((res) => M.toast({ html: "Success", classes: "green rounded" }))
      .catch((err) =>
        M.toast({
          html: "Error with the client request: the currency is already added",
          classes: "red rounded",
        })
      );

    this.setState({
      currency: "",
      rateToEuro: "",
    });
  }
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Add new currency</h3>
        <form onSubmit={this.onSubmit} className="col s12">
          <div className="row">
            <div className="input-field col s4">
              <select
                className="browser-default"
                required
                value={this.state.currency}
                onChange={this.onChangeCurrency}
              >
                <option value="" disabled selected>
                  Choose your option
                </option>
                {currencies.map(function (currency) {
                  return (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input
                id="input_number"
                type="number"
                data-length="10"
                step="0.001"
                value={this.state.rateToEuro}
                onChange={this.onChangeRateToEuro}
              />
              <label for="input_text">Rate to Euro</label>
            </div>
          </div>
          <button
            class="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Submit
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    );
  }
}
